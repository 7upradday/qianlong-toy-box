import * as THREE from './assets/vendor/three/three.module.js';
import { GLTFLoader } from './assets/vendor/three/GLTFLoader.js?v=2';
import { RoundedBoxGeometry } from './assets/vendor/three/RoundedBoxGeometry.js?v=2';
import { RoomEnvironment } from './assets/vendor/three/RoomEnvironment.js?v=2';

const app = window.cabinetApp;
const stage = document.querySelector('#physicalStage');
const canvas = document.querySelector('#cabinetCanvas');
const status = document.querySelector('#physicalStatus');
const openButton = document.querySelector('#physicalOpen');
const returnButton = document.querySelector('#physicalReturn');
const slotLayer = document.querySelector('#physicalSlots');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const clamp = THREE.MathUtils.clamp;
const smooth = t => t*t*(3-2*t);
const ease = t => t < .5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2;
const W=3.8, D=2.35, UNITX=W/12, UNITZ=D/7;

class Cabinet {
  constructor() {
    this.isOpen=false; this.isInspecting=false; this.moving=false; this.generation=0;
    this.zoom=.90;this.lastInteraction=performance.now();this.touchPoints=new Map();
    this.progress=0; this.slots=[]; this.items=[]; this.layout=[]; this.cache=new Map();
    this.tweens=new Set(); this.readyCount=0; this.dirty=true; this.pose=0;
    this.renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
    this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
    this.renderer.setClearColor(0x000000,0);
    this.renderer.shadowMap.enabled=true;
    this.renderer.shadowMap.type=THREE.PCFShadowMap;
    this.renderer.toneMapping=THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure=1.08;
    this.scene=new THREE.Scene();
    this.camera=new THREE.PerspectiveCamera(36,1,.05,80);
    this.target=new THREE.Vector3(0,.6,0);
    const pmrem=new THREE.PMREMGenerator(this.renderer);
    const environment=new RoomEnvironment();
    this.env=pmrem.fromScene(environment,.04);
    this.scene.environment=this.env.texture;
    this.scene.environmentIntensity=.65;
    environment.dispose(); pmrem.dispose();
    this.scene.add(new THREE.HemisphereLight(0xfff7e6,0x7c6450,1.3));
    const key=new THREE.DirectionalLight(0xffedcf,2.5);key.position.set(-3,7,5);
    key.castShadow=true;key.shadow.mapSize.set(2048,2048);
    Object.assign(key.shadow.camera,{left:-5,right:5,top:6,bottom:-5,near:.5,far:18});
    key.shadow.bias=-.0004;key.shadow.normalBias=.025;key.shadow.radius=4;
    this.scene.add(key);
    const fill=new THREE.DirectionalLight(0xe9efff,1.1);fill.position.set(4,3,-1);this.scene.add(fill);
    const ground=new THREE.Mesh(new THREE.PlaneGeometry(24,24),new THREE.ShadowMaterial({opacity:.16}));
    ground.rotation.x=-Math.PI/2; ground.position.y=-.10;ground.receiveShadow=true;this.scene.add(ground);this.ground=ground;
    this.root=new THREE.Group();this.scene.add(this.root);
    this.loader=new GLTFLoader();this.raycaster=new THREE.Raycaster();
    this.build(); this.root.children.forEach(child=>{if(child!==this.tray)child.visible=false}); this.bind(); this.setPose(0); this.resize();
    this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(stage);
    this.frame=this.frame.bind(this);requestAnimationFrame(this.frame);
  }
  texture(region) {
    const t=new THREE.TextureLoader().load('./assets/ui/cabinet-atlas.jpg',()=>this.invalidate());
    t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.ClampToEdgeWrapping;
    t.repeat.set(region[2],region[3]);t.offset.set(region[0],1-region[1]-region[3]);
    t.anisotropy=Math.min(8,this.renderer.capabilities.getMaxAnisotropy());return t;
  }
  build() {
    const woodMap=this.texture([.80,.015,.19,.28]);
    this.wood=new THREE.MeshStandardMaterial({map:woodMap,color:0xbcb0a3,roughness:.53,metalness:0,bumpMap:woodMap,bumpScale:.014});
    this.innerWood=this.wood.clone();this.innerWood.color.set(0xdcc2a0);this.innerWood.roughness=.68;
    this.bronze=new THREE.MeshStandardMaterial({color:0x9e7943,roughness:.48,metalness:.78});
    this.darkBronze=this.bronze.clone();this.darkBronze.color.set(0x755a35);
    this.lining=new THREE.MeshStandardMaterial({color:0x29150f,roughness:.88});
    const board=(w,h,d,x,y,z,mat=this.wood,parent=this.root,r=.022)=>{
      const m=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/4,h/4,d/4)),mat);
      m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;
    }; this.board=board;
    // One continuous cabinet: shell, front door and sliding tray are independent meshes.
    board(4.18,.16,2.65,0,0,0);
    board(4.18,.16,2.65,0,1.60,0);
    board(.14,1.55,2.65,-2.02,.80,0);board(.14,1.55,2.65,2.02,.80,0);
    board(3.92,1.55,.12,0,.80,-1.27);
    for(const x of [-1.8,1.8]) for(const z of [-1.08,1.08]) board(.26,.16,.27,x,-.04,z);
    for(const y of [.13,1.48]){
      board(4.23,.035,2.68,0,y,0,this.darkBronze);
      board(4.26,.06,2.70,0,y+.03,0,this.wood);
    }
    // Interior runners remain behind the moving tray.
    for(const x of [-1.90,1.90])board(.08,.10,2.32,x,.22,0,this.innerWood);
    this.doors=[];
    const faceMap=this.texture([.425,.357,.37,.22]);
    const panelMat=new THREE.MeshStandardMaterial({map:faceMap,roughness:.58,color:0xe0d4c2});
    for(const side of [-1,1]){
      const door=new THREE.Group();door.position.set(side*2.0,.12,1.33);this.root.add(door);this.doors.push(door);
      const center=-side*.99;
      board(1.98,1.35,.12,center,.68,0,panelMat,door);
      for(const y of [.07,1.29])board(1.91,.022,.016,center,y,.071,this.bronze,door,.004);
      for(const x of [-side*.06,-side*1.92])board(.022,1.22,.016,x,.68,.071,this.bronze,door,.004);
      for(const x of [-side*.09,-side*1.90])for(const y of [.09,1.27]){
        board(.18,.055,.024,x,y,.085,this.darkBronze,door);
        board(.055,.18,.024,x,y,.085,this.darkBronze,door);
      }
      for(const y of [.28,1.05]){
        const hinge=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,.22,12),this.bronze);
        hinge.position.set(0,y,.015);door.add(hinge);
      }
      board(.13,.27,.026,-side*1.82,.70,.085,this.bronze,door);
      const ring=new THREE.Mesh(new THREE.TorusGeometry(.075,.012,10,28),this.bronze);
      ring.position.set(-side*1.82,.62,.14);ring.rotation.x=.14;ring.castShadow=true;door.add(ring);
    }
    // Tray has a structural base, thick sides and a separate interior grid.
    this.tray=new THREE.Group();this.tray.position.y=.25;this.root.add(this.tray);
    board(3.96,.10,2.48,0,0,0,this.innerWood,this.tray);
    for(const x of [-1.96,1.96])board(.12,.27,2.50,x,.12,0,this.wood,this.tray);
    for(const z of [-1.20,1.20])board(3.96,.28,.12,0,.12,z,this.wood,this.tray);
    for(const z of [-1.20,1.20])board(3.97,.014,.02,0,.26,z,this.bronze,this.tray,.004);
    for(const x of [-1.96,1.96])board(.018,.014,2.42,x,.26,0,this.bronze,this.tray,.004);
    board(.50,.14,.045,0,.12,1.28,this.bronze,this.tray);
    const handle=new THREE.Mesh(new THREE.TorusGeometry(.12,.018,10,28,Math.PI),this.bronze);
    handle.rotation.z=Math.PI;handle.position.set(0,.13,1.34);this.tray.add(handle);
    this.grid=new THREE.Group();this.tray.add(this.grid);
  }
  invalidate(){this.dirty=true}
  resize(){
    const r=stage.getBoundingClientRect();if(!r.width||!r.height)return;
    this.renderer.setSize(r.width,r.height,false);this.camera.aspect=r.width/r.height;
    this.camera.updateProjectionMatrix();this.setCamera();this.invalidate();
  }
  setCamera(){
    const arrival=smooth(this.progress);
    this.target.set(0,THREE.MathUtils.lerp(.5,.12,arrival),.12);
    this.camera.position.set(.08,THREE.MathUtils.lerp(2.6,4.8,arrival),THREE.MathUtils.lerp(6.2,4.25,arrival));
    const fit=Math.max(1,1.30/this.camera.aspect)*this.zoom;
    this.camera.position.sub(this.target).multiplyScalar(fit).add(this.target);
    this.camera.lookAt(this.target);this.invalidate();
  }
  setPose(p){
    this.progress=p;this.pose=smooth(p);
    this.tray.position.z=THREE.MathUtils.lerp(-.45,.12,smooth(p));
    this.tray.position.y=THREE.MathUtils.lerp(.05,.25,smooth(p));
    this.setCamera();this.invalidate();
  }
  tween(duration,fn){
    if(reduceMotion.matches){fn(1);return Promise.resolve()}
    return new Promise(resolve=>{this.tweens.add({start:performance.now(),duration,fn,resolve});this.invalidate()});
  }
  async setOpen(open,animate=true){
    if(this.moving)return;
    const target=open?1:0;
    if(this.progress===target){this.isOpen=open;document.body.classList.toggle("tray-is-open",open);this.controls();return}
    const outer=document.querySelector('#cabinetModelStage');
    const viewer=document.querySelector('#cabinetModel');
    this.moving=true;this.isOpen=open;
    // The landing view only needs the exterior cabinet. Start downloading the
    // ten tray objects after the visitor actually opens the box.
    if(open&&!this.slots.some(slot=>slot.model)&&this.items.length)this.update(this.items,this.layout,true);
    // Both surfaces share the same fixed stage while the eye approaches and looks down.
    document.body.classList.add('cabinet-transitioning');
    document.body.classList.add('tray-is-open');
    this.root.rotation.y=0;this.resize();this.controls();
    if(open){
      const orbit=viewer.getCameraOrbit?.();
      this.outerOrbit=orbit?{theta:orbit.theta,phi:orbit.phi,radius:orbit.radius}:{theta:.35,phi:1.25,radius:2};
      this.outerAutoRotate=viewer.autoRotate;
    }
    viewer.autoRotate=false;
    const orbit=this.outerOrbit||{theta:.35,phi:1.25,radius:2};
    const from=this.progress;
    try{
      await this.tween(animate?1750:0,t=>{
        const p=THREE.MathUtils.lerp(from,target,t);
        const approach=smooth(clamp(p/.65,0,1));
        viewer.cameraOrbit=`${orbit.theta}rad ${THREE.MathUtils.lerp(orbit.phi,.70,approach)}rad ${THREE.MathUtils.lerp(orbit.radius,orbit.radius*.80,approach)}m`;
        const blend=smooth(clamp((p-.32)/.48,0,1));
        outer.style.opacity=String(1-blend);stage.style.opacity=String(blend);
        this.setPose(p);
      });
    }finally{
      document.body.classList.toggle('tray-is-open',open);
      document.body.classList.remove('cabinet-transitioning');
      outer.style.opacity='';stage.style.opacity='';
      if(!open){viewer.cameraOrbit=`${orbit.theta}rad ${orbit.phi}rad ${orbit.radius}m`;viewer.autoRotate=this.outerAutoRotate??true;}
      this.moving=false;this.controls();
    }
  }
  controls(){
    openButton.hidden=this.isOpen||this.isInspecting;
    openButton.disabled=this.moving;
    document.querySelector("#cardButton").disabled=this.moving;
    document.querySelector("#modelOpenButton").disabled=this.moving;
    slotLayer.hidden=!this.isOpen||this.moving||this.isInspecting;
    canvas.setAttribute('aria-label',this.isInspecting?'已提起器物，左右拖动旋转':this.isOpen?'三维百宝格，轻点查看，长按拖动换位':'瑾瑜匣，轻点打开，左右拖动观察');
    this.invalidate();
  }
  async update(items,layout,loadModels=this.isOpen){
    const generation=++this.generation;
    this.items=items.map(i=>({...i}));this.layout=layout.map(l=>[...l]);this.readyCount=0;
    this.grid.traverse(o=>{if(o.isMesh && o.userData.structural)o.geometry.dispose()});
    this.grid.clear();this.slots=[];slotLayer.replaceChildren();
    const edges=new Map();
    const edge=(x,z,w,d)=>edges.set([x,z,w,d].map(n=>n.toFixed(4)).join(','),[x,z,w,d]);
    for(let i=0;i<items.length;i++){
      const [col,row,cw,rh]=layout[i];
      const w=cw*UNITX,d=rh*UNITZ;
      const x=-W/2+(col-1)*UNITX+w/2,z=-D/2+(row-1)*UNITZ+d/2;
      const floor=this.board(w-.04,.035,d-.04,x,.07,z,this.lining,this.grid,.008);
      floor.userData={slot:i,structural:true};
      // Unit segments deduplicate shared dividers between irregular cells.
      for(let c=col-1;c<col-1+cw;c++)for(const r of [row-1,row-1+rh])edge(-W/2+(c+.5)*UNITX,-D/2+r*UNITZ,UNITX,.034);
      for(let r=row-1;r<row-1+rh;r++)for(const c of [col-1,col-1+cw])edge(-W/2+c*UNITX,-D/2+(r+.5)*UNITZ,.034,UNITZ);
      const anchor=new THREE.Group();anchor.position.set(x,.093,z);anchor.userData.slot=i;this.grid.add(anchor);
      const button=document.createElement('button');button.className='scene-slot';button.type='button';
      button.setAttribute('aria-label',`提起 ${items[i].name}`);button.dataset.name=items[i].short;
      button.addEventListener('click',()=>{if(!this.moving&&!this.isInspecting)app.inspect(i).catch(error=>app.toast(error.message))});
      slotLayer.append(button);
      this.slots.push({anchor,x,z,w,d,button,model:null,home:null});
    }
    for(const [x,z,w,d] of edges.values()){
      const m=this.board(w,.18,d,x,.14,z,this.innerWood,this.grid,.006);m.userData.structural=true;
    }
    this.controls();this.loadStatus();
    if(!loadModels){status.textContent='';return}
    // Bounded loading avoids decoding every collection model at once.
    let next=0;
    const worker=async()=>{
      while(next<items.length&&generation===this.generation){
        const index=next++,item=items[index];
        try{
          let promise=this.cache.get(item.model);
          if(!promise){promise=this.loader.loadAsync(item.model);this.cache.set(item.model,promise);promise.catch(()=>this.cache.delete(item.model))}
          const gltf=await promise;if(generation!==this.generation)return;
          const object=gltf.scene.clone(true);
          // Collection orientation is expressed as roll pitch yaw in model-viewer.
          if(item.orientation){const a=item.orientation.split(/\s+/).map(parseFloat).map(THREE.MathUtils.degToRad);object.rotation.set(a[1]||0,a[2]||0,a[0]||0,'YXZ')}
          // Present the original model toward the viewer, while keeping it in the real tray.
          // The tray is seen from above; a small presentation tilt preserves the readable front.
          const displayObject=new THREE.Group();displayObject.add(object);displayObject.rotation.x=-.28;
          displayObject.updateMatrixWorld(true);
          const bounds=new THREE.Box3().setFromObject(displayObject),size=bounds.getSize(new THREE.Vector3()),center=bounds.getCenter(new THREE.Vector3());
          displayObject.position.sub(center);displayObject.position.y+=size.y/2;
          const slot=this.slots[index];
          const fit=Math.min((slot.w-.12)/Math.max(size.x,.001),(slot.d-.12)/Math.max(size.z,.001),1.14/Math.max(size.y,.001))*.94;
          const holder=new THREE.Group();holder.add(displayObject);holder.scale.setScalar(fit);
          object.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;o.userData.slot=index}});
          slot.anchor.add(holder);slot.model=holder;slot.homeScale=fit;
          slot.maxSize=Math.max(size.x,size.y,size.z)*fit;
          this.readyCount++;this.loadStatus();this.invalidate();
        }catch(error){
          if(generation!==this.generation)return;
          const slot=this.slots[index];slot.failed=true;
          slot.button.setAttribute('aria-label',`${item.name}，模型载入失败，点击重试`);
          this.readyCount++;this.loadStatus();console.warn('Cabinet model could not load:',item.id,error.message);
        }
      }
    };
    await Promise.all([worker(),worker()]);
    if(generation===this.generation){
      this.loadStatus();
      const active=new Set(this.items.map(i=>i.model));
      for(const [url,promise] of this.cache){
        if(this.cache.size<=14)break;
        if(active.has(url))continue;
        this.cache.delete(url);
        promise.then(gltf=>{
          if(this.items.some(i=>i.model===url)||this.cache.has(url))return;
          const geometries=new Set(),materials=new Set(),textures=new Set();
          gltf.scene.traverse(o=>{if(o.isMesh){geometries.add(o.geometry);for(const m of (Array.isArray(o.material)?o.material:[o.material])){materials.add(m);for(const v of Object.values(m))if(v?.isTexture)textures.add(v)}}});
          geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>{t.dispose();t.source?.data?.close?.()});
        }).catch(()=>{});
      }
    }
  }
  loadStatus(){
    const failed=this.slots.filter(s=>s.failed).length;
    status.textContent=this.readyCount<this.items.length?`珍玩入匣 ${this.readyCount} / ${this.items.length}`:failed?`${failed} 件暂未载入，轻点空格重试`:'';
  }
  async pick(index){
    if(this.moving||this.isInspecting||!this.isOpen)return;
    const slot=this.slots[index];
    if(!slot?.model){if(slot?.failed)this.update(this.items,this.layout);throw new Error('此物尚在入匣，请稍候再试')}
    this.isInspecting=true;this.moving=true;this.selected=index;this.controls();
    this.lastInteraction=performance.now();
    const start=slot.anchor.position.y;
    await this.tween(300,t=>{slot.anchor.position.y=start+ease(t)*.32;this.invalidate()});
    this.moving=false;
  }
  async putBack(){
    if(!this.isInspecting||this.moving)return;
    this.moving=true;app.closeDetail();
    const slot=this.slots[this.selected];
    if(slot){const start=slot.anchor.position.y;await this.tween(300,t=>{slot.anchor.position.y=THREE.MathUtils.lerp(start,.093,ease(t));this.invalidate()})}
    this.isInspecting=false;this.moving=false;this.lastInteraction=performance.now();this.controls();this.loadStatus();
  }
  async swapSlots(a,b){
    if(a===b||this.moving)return;
    this.moving=true;
    const first=this.slots[a].anchor,second=this.slots[b].anchor;
    const from=first.position.clone(),to=second.position.clone();
    await this.tween(500,t=>{const k=ease(t);first.position.lerpVectors(from,to,k);second.position.lerpVectors(to,from,k);first.position.y+=Math.sin(Math.PI*k)*.35;second.position.y+=Math.sin(Math.PI*k)*.18;this.invalidate()});
    this.moving=false;app.swap(a,b);
  }
  hit(event){
    const r=canvas.getBoundingClientRect();
    this.raycaster.setFromCamera(new THREE.Vector2((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1),this.camera);
    const hits=this.raycaster.intersectObject(this.grid,true);
    for(const hit of hits){let o=hit.object;while(o&&o!==this.grid){if(Number.isInteger(o.userData.slot))return o.userData.slot;o=o.parent}}
    return null;
  }
  bind(){
    openButton.addEventListener('click',()=>app.open());
    returnButton.addEventListener('click',()=>this.putBack());
    canvas.tabIndex=0;
    canvas.addEventListener('keydown',e=>{
      if(e.key==='Escape')this.putBack();
      if((e.key==='Enter'||e.key===' ')&&!this.isOpen){e.preventDefault();app.open()}
      if(this.isInspecting&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();this.slots[this.selected].model.rotation.y+=(e.key==='ArrowLeft'?-1:1)*.15;this.invalidate()}
    });
    canvas.addEventListener('wheel',e=>{
      if(!this.isOpen||this.isInspecting)return;
      e.preventDefault();this.zoom=clamp(this.zoom*Math.exp(e.deltaY*.001),.50,1.55);this.lastInteraction=performance.now();this.setCamera();
    },{passive:false});
    canvas.addEventListener('pointerdown',e=>{
      this.lastInteraction=performance.now();this.touchPoints.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(this.touchPoints.size===2){clearTimeout(this.hold);this.pointer=null;const a=[...this.touchPoints.values()];this.pinch=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);canvas.setPointerCapture(e.pointerId);return;}

      if(this.moving)return;
      this.pointer={x:e.clientX,y:e.clientY,lastX:e.clientX,lastY:e.clientY,index:this.isOpen&&!this.isInspecting?this.hit(e):null,moved:false,held:false};
      canvas.setPointerCapture(e.pointerId);
      if(this.pointer.index!==null){this.hold=setTimeout(()=>{
        if(!this.pointer||this.pointer.moved)return;
        this.pointer.held=true;
        const s=this.slots[this.pointer.index];s.anchor.position.y=.30;
        canvas.style.touchAction='none';app.toast('拖到另一格松手换位');this.invalidate();
      },480)}
    });
    canvas.addEventListener('pointermove',e=>{
      if(this.touchPoints.has(e.pointerId))this.touchPoints.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(this.touchPoints.size===2){const a=[...this.touchPoints.values()],distance=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);if(this.pinch&&distance){this.zoom=clamp(this.zoom*this.pinch/distance,.50,1.55);this.setCamera()}this.pinch=distance;this.lastInteraction=performance.now();return;}
      const p=this.pointer;if(!p)return;
      const dx=e.clientX-p.lastX,dy=e.clientY-p.lastY;
      if(Math.hypot(e.clientX-p.x,e.clientY-p.y)>7){p.moved=true;clearTimeout(this.hold)}
      if(this.isInspecting&&!this.moving){
        const model=this.slots[this.selected].model;model.rotation.y+=dx*.009;model.rotation.x=clamp(model.rotation.x+dy*.005,-.45,.45);this.invalidate();
      }else if(p.held){
        e.preventDefault();p.target=this.hit(e);this.invalidate();
      }else if(p.moved&&!this.moving){this.root.rotation.y+=dx*.005;this.lastInteraction=performance.now();this.invalidate()}
      p.lastX=e.clientX;p.lastY=e.clientY;
    });
    const end=(e,cancelled=false)=>{
      this.touchPoints.delete(e.pointerId);this.pinch=null;this.lastInteraction=performance.now();
      clearTimeout(this.hold);const p=this.pointer;this.pointer=null;canvas.style.touchAction='none';
      if(!p)return;
      if(p.held){this.slots[p.index].anchor.position.y=.093;if(!cancelled&&p.target!==null&&p.target!==undefined)this.swapSlots(p.index,p.target);this.invalidate()}
      else if(!cancelled&&!p.moved&&!this.moving&&!this.isInspecting){if(!this.isOpen)app.open();else if(p.index!==null)app.inspect(p.index).catch(error=>app.toast(error.message))}
    };
    canvas.addEventListener('pointerup',e=>end(e));canvas.addEventListener('pointercancel',e=>end(e,true));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&this.isInspecting)this.putBack()});
    document.addEventListener('visibilitychange',()=>this.invalidate());
  }
  projectButtons(){
    const w=canvas.clientWidth,h=canvas.clientHeight;
    this.scene.updateMatrixWorld(true);
    for(const s of this.slots){
      const p=s.anchor.getWorldPosition(new THREE.Vector3()).project(this.camera);
      s.button.style.left=`${(p.x*.5+.5)*w}px`;s.button.style.top=`${(-p.y*.5+.5)*h}px`;
      s.button.style.width=`${Math.max(30,s.w*w/6)}px`;s.button.style.height=`${Math.max(30,s.d*h/5)}px`;
    }
  }
  frame(now){
    requestAnimationFrame(this.frame);
    const elapsed=Math.min(.05,(now-(this.lastFrame||now))/1000);this.lastFrame=now;
    if(document.hidden)return;
    for(const t of this.tweens){const p=t.duration?clamp((now-t.start)/t.duration,0,1):1;t.fn(p);if(p===1){this.tweens.delete(t);t.resolve()}}
    if(!this.dirty)return;
    this.dirty=false;this.projectButtons();this.renderer.render(this.scene,this.camera);
  }
}
try {
  document.body.classList.add('physical-ready');
  const cabinet=new Cabinet();window.physicalCabinet=cabinet;
  const current=app.getState();cabinet.update(current.items,current.layout,false);
  document.getElementById("trayGrid").replaceChildren();

  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();status.textContent='画面暂时中断，请刷新后重试';});
} catch(error) {
  window.cabinetSceneError=error;
  console.error('Physical cabinet unavailable',error);
  document.body.classList.remove('physical-ready');
  const fallback=document.createElement('script');fallback.type='module';fallback.src='./assets/vendor/model-viewer.min.js?v=2';document.head.append(fallback);
  status.textContent='';
}

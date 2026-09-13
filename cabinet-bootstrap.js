(async()=>{
  try {
    await import('./cabinet-physical.js?v=v2-vault-fix');
    if(!window.physicalCabinet)throw window.cabinetSceneError||new Error('Scene initialization failed');
  }catch(error){
    const notice=document.createElement('details');notice.id='cabinetCompatibility';
    const title=document.createElement('summary');title.textContent='已切换兼容三维展示 · 查看原因';
    const body=document.createElement('p');body.textContent=String(error?.message||error);
    notice.append(title,body);
    notice.style.cssText='position:fixed;bottom:12px;left:12px;right:12px;z-index:9999;background:#fff8ee;color:#442a20;padding:14px;border:1px solid #bc9b71;font:14px system-ui';
    document.body.append(notice);
  }
})();

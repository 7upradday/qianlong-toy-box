const corePath = "./assets/core/";
const pinkPath = "./assets/vault/pink/";
const weirdPath = "./assets/vault/weird/";

const protocolWarning = document.querySelector("#protocolWarning");
if (window.location.protocol === "file:") {
  protocolWarning.hidden = false;
  document.body.classList.add("is-file-mode");
}

const legacyArtifacts = [
  {
    id: "core-01",
    name: "雕橄榄核舟（清乾隆二年）",
    short: "橄榄核舟",
    material: "橄榄核雕",
    image: `${corePath}01_雕橄榄核舟.jpg`,
    tags: ["original", "brown", "mechanical", "weird"],
    voice: "朕把八个人、一篇《后赤壁赋》和能开的小窗，全塞进了三点四厘米的小船里。掌心大的工程，排面一点不能小。",
    source: "台北故宫博物院数字典藏；瑾瑜匣原藏"
  },
  {
    id: "core-02",
    name: "西洋金质怀表（清宫旧藏）",
    short: "西洋怀表",
    material: "金属、珐琅、机械机芯",
    image: `${corePath}02_西洋金质怀表.jpg`,
    tags: ["original", "gold", "western", "mechanical"],
    voice: "这不是普通钟表，是会动的掌心奇观。朕看时间，也看齿轮怎样把西洋人的巧思一圈圈收进匣里。",
    source: "台北故宫博物院数字典藏；瑾瑜匣匣内实物"
  },
  {
    id: "core-03",
    name: "红色嵌饰小瓶（清宫旧藏）",
    short: "红色嵌饰瓶",
    material: "红色材质、金属与彩色嵌饰",
    image: `${corePath}03_红色嵌饰小瓶.jpg`,
    tags: ["original", "pink", "western"],
    voice: "巴掌大的一只小瓶，偏要把红、金、蓝、绿都穿在身上。朕的袖珍玩意，也得懂得抢镜。",
    source: "瑾瑜匣匣内实物；正式器名待进一步匹配"
  },
  {
    id: "core-04",
    name: "蓝灰石质西洋小瓶一对（清宫旧藏）",
    short: "蓝灰小瓶",
    material: "蓝灰石质、鎏金金属",
    image: `${corePath}04_蓝灰石质西洋小瓶一对.jpg`,
    tags: ["original", "blue", "western"],
    voice: "深蓝石纹配一圈鎏金，像把两只西洋香水瓶缩进了格子。成双成对，摆起来才叫讲究。",
    source: "瑾瑜匣匣内实物；正式器名待进一步匹配"
  },
  {
    id: "core-05",
    name: "西洋人物肖像椭圆盒（清宫旧藏）",
    short: "人物肖像盒",
    material: "鎏金金属、彩绘人物像",
    image: `${corePath}05_西洋人物肖像椭圆盒.jpg`,
    tags: ["original", "gold", "western"],
    voice: "谁说朕的格子里只能放玉？西洋人的小像配上金盒，和怀表摆在一起，才是朕的跨国选品。",
    source: "瑾瑜匣匣内实物；西洋盒类别已确认"
  },
  {
    id: "core-06",
    name: "白玉勺形器（清宫旧藏）",
    short: "白玉勺形器",
    material: "白玉",
    image: `${corePath}06_白玉勺形器.jpg`,
    tags: ["original", "jade", "white"],
    voice: "一格只放一件白玉，像一弯被磨得没有棱角的月亮。热闹看够了，也要留一处安静。",
    source: "瑾瑜匣匣内实物；正式器名待进一步匹配"
  },
  {
    id: "core-07",
    name: "青玉卧兽（清宫旧藏）",
    short: "青玉卧兽",
    material: "青玉",
    image: `${corePath}07_青玉卧兽.jpg`,
    tags: ["original", "jade", "green", "weird"],
    voice: "这只小兽最会装石头。把它放大，四肢和五官才慢慢跑出来——朕的动物园，主打一个安静。",
    source: "瑾瑜匣匣内实物；正式器名待进一步匹配"
  },
  {
    id: "core-08",
    name: "珐琅彩粉地剔花番莲纹碗（清乾隆）",
    short: "粉地番莲碗",
    material: "瓷胎珐琅彩",
    image: `${corePath}08_珐琅彩粉地剔花番莲纹碗.jpg`,
    tags: ["pink", "porcelain", "flower"],
    voice: "远看是一层温柔粉地，贴近才发现锦纹密得让人眼花。朕要的粉色，从来不是只会装可爱。",
    source: "台北故宫博物院数字典藏；乾隆宝库扩展"
  },
  {
    id: "core-09",
    name: "白套红玻璃花卉鼻烟壶（清乾隆）",
    short: "套红鼻烟壶",
    material: "白色玻璃、粉红套玻璃",
    image: `${corePath}09_白套红玻璃花卉鼻烟壶.jpg`,
    tags: ["pink", "glass", "flower"],
    voice: "白玻璃上套一层月季红，再一点点雕出花。小归小，层次必须比后宫的心思还多。",
    source: "台北故宫博物院数字典藏；乾隆宝库扩展"
  },
  {
    id: "core-10",
    name: "粉彩蓝地连年福寿纹茶壶（清乾隆）",
    short: "蓝地粉彩茶壶",
    material: "瓷胎粉彩",
    image: `${corePath}10_粉彩蓝地连年福寿纹茶壶.jpg`,
    tags: ["blue", "porcelain", "flower"],
    voice: "茶壶也要穿得像一座小花园。蓝地压住热闹的粉彩，朕喝一口茶，顺便看一圈纹样。",
    source: "台北故宫博物院数字典藏；乾隆宝库扩展"
  }
];

const pinkCandidates = [
  ["p01", "清雍正粉彩莲花纹杯", "粉彩瓷", "P01_清雍正粉彩莲花纹杯.jpg"],
  ["p02", "清雍正粉彩浮雕莲花纹杯", "粉彩瓷", "P02_清雍正粉彩浮雕莲花纹杯_A.jpg", "用户交付 GLB；正式器名与馆藏参考待共同确认", "./assets/models/petal-bowl.glb"],
  ["p03", "清粉彩莲花纹罐", "粉彩瓷", "P03_清粉彩莲花纹罐.jpg"],
  ["p04", "清乾隆粉彩莲花荷叶壶", "粉彩瓷", "P04_清乾隆粉彩莲花荷叶壶.jpg"],
  ["p05", "清乾隆粉彩莲花水盂", "粉彩瓷", "P05_清乾隆粉彩莲花水盂.jpg", "用户交付 GLB；正式器名与馆藏参考待共同确认", "./assets/models/pink-lotus.glb"],
  ["p06", "清粉彩荷花壶", "粉彩瓷", "P06_清粉彩荷花壶.jpg", "用户交付 GLB；正式器名与馆藏参考待共同确认", "./assets/models/pink-teapot.glb"],
  ["p07", "清粉彩缠枝荷花杯", "粉彩瓷", "P07_清粉彩缠枝荷花杯.jpg"],
  ["p08", "清光绪粉彩荷花吸杯", "粉彩瓷", "P08_真实馆藏白底_粉彩荷花吸杯.png", "河南博物院真实馆藏参考"],
  ["p09", "清乾隆像生瓷荷花杯盏", "像生瓷", "P09_清乾隆像生瓷荷花杯盏.jpg"],
  ["p10", "清乾隆粉彩绿里花形杯", "粉彩瓷", "P10_清乾隆粉彩绿里花形杯.jpg"],
  ["p11", "清粉彩莲花开光盘", "粉彩瓷", "P11_清粉彩莲花开光盘.jpg"],
  ["p12", "清粉彩缠枝莲纹茶壶", "粉彩瓷", "P12_清粉彩缠枝莲纹茶壶.jpg"],
  ["p13", "清料石荷花形鼻烟壶", "料石", "P13_清料石荷花形鼻烟壶.jpg"],
  ["p14", "清雍正粉彩浮雕莲花纹杯", "粉彩瓷", "P14_清雍正粉彩浮雕莲花纹杯_B.jpg"],
  ["p15", "清乾隆粉彩莲花纹小杯", "粉彩瓷", "P15_清乾隆粉彩莲花纹小杯.jpg"],
  ["p16", "清乾隆芙蓉石蟠螭耳盖炉", "芙蓉石", "P16_乾隆芙蓉石蟠螭耳盖炉.jpg"]
].map(([id, name, material, file, source, model]) => ({
  id,
  name,
  short: name.replace(/^清(乾隆|雍正|光绪)?/, ""),
  material,
  image: `${pinkPath}${file}`,
  model,
  tags: ["pink", "flower", material.includes("瓷") ? "porcelain" : "weird"],
  voice: `这一件的粉色正合朕意。${name.includes("莲") || name.includes("荷") ? "莲瓣不是只画在表面，连器形也一起开了花。" : "温柔的颜色，也要配得上繁复的工艺。"}`,
  source: source || "用户提供的选品插画索引；正式上线前继续匹配真实馆藏图"
}));

const weirdCandidates = [
  ["w01", "清乾隆紫地粉彩八宝勾莲纹奔巴瓶", "粉彩瓷", "W01_清乾隆紫地粉彩八宝勾莲纹奔巴瓶.jpg"],
  ["w02", "清乾隆粉彩镂雕夔龙纹转心瓶", "粉彩瓷", "W02_清乾隆粉彩镂雕夔龙纹转心瓶.jpg"],
  ["w03", "清乾隆胭脂红蓝地轧道洋彩合欢瓶", "洋彩瓷", "W03_清乾隆胭脂红蓝地轧道洋彩折枝花卉纹合欢瓶.jpg"],
  ["w04", "清乾隆粉彩开光花鸟双连瓶", "粉彩瓷", "W04_清乾隆粉彩开光花鸟双连瓶.jpg"],
  ["w05", "清乾隆蓝地粉彩花卉纹包袱尊", "粉彩瓷", "W05_清乾隆蓝地粉彩花卉纹包袱尊.jpg"],
  ["w06", "清乾隆黄地粉彩福寿活环双耳瓶", "粉彩瓷", "W06_清乾隆黄地粉彩福寿活环双耳瓶.jpg"],
  ["w07", "清乾隆粉彩连年纹蓝地茶壶", "粉彩瓷", "W07_清乾隆粉彩连年纹蓝地茶壶.jpg"],
  ["w08", "清乾隆珐琅彩缠枝花卉纹蒜头瓶", "珐琅彩瓷", "W08_清乾隆珐琅彩缠枝花卉纹蒜头瓶.jpg"],
  ["w09", "清乾隆各种釉彩大瓶", "多种釉彩瓷", "W09_真实馆藏白底_各色釉彩大瓶.png", "用户交付 GLB；故宫博物院真实馆藏参考", "./assets/models/porcelain-vase.glb"]
].map(([id, name, material, file, source, model]) => ({
  id,
  name,
  short: name.replace("清乾隆", ""),
  material,
  image: `${weirdPath}${file}`,
  model,
  tags: ["weird", "porcelain", id === "w02" ? "mechanical" : "colorful"],
  voice: `${name.includes("转心") ? "朕让瓶子里面再装一个会转的瓶子，隔着镂空看机关。" : "器形越不讲道理，越能看出工匠究竟有多少本事。"} 大清的技术测试，也得长得足够惊人。`,
  source: source || "用户提供的选品插画索引；正式上线前继续匹配真实馆藏图"
}));

const modelShowcase = [
  {
    id: "model-petal-bowl",
    name: "花瓣碗（3D 模型试样）",
    short: "3D 花瓣碗",
    material: "粉彩瓷质感",
    image: `${pinkPath}P02_清雍正粉彩浮雕莲花纹杯_A.jpg`,
    model: "./assets/models/petal-bowl.glb",
    tags: ["pink", "flower", "porcelain"],
    voice: "这只花瓣碗，朕准你拿在手里转着看。先看器形，再替它查明真正的姓名。",
    source: "用户交付 GLB；正式器名与馆藏参考待共同确认"
  },
  {
    id: "model-pink-lotus",
    name: "粉莲器（3D 模型试样）",
    short: "3D 粉莲器",
    material: "粉彩瓷质感",
    image: `${pinkPath}P04_清乾隆粉彩莲花荷叶壶.jpg`,
    model: "./assets/models/pink-lotus.glb",
    tags: ["pink", "flower", "weird"],
    voice: "一朵莲花若只画在纸上未免可惜，朕偏要把花瓣烧成能转着看的器物。",
    source: "用户交付 GLB；正式器名与馆藏参考待共同确认"
  },
  {
    id: "model-pink-teapot",
    name: "粉色茶壶（3D 模型试样）",
    short: "3D 粉色茶壶",
    material: "粉彩瓷质感",
    image: `${pinkPath}P06_清粉彩荷花壶.jpg`,
    model: "./assets/models/pink-teapot.glb",
    tags: ["pink", "flower", "porcelain"],
    voice: "壶身做得像一朵盛开的花，喝茶只是顺便，转一圈看清每片花瓣才是正事。",
    source: "用户交付 GLB；正式器名与馆藏参考待共同确认"
  },
  {
    id: "model-porcelain-vase",
    name: "精美瓷瓶（3D 模型试样）",
    short: "3D 精美瓷瓶",
    material: "彩绘瓷质感",
    image: `${weirdPath}W09_真实馆藏白底_各色釉彩大瓶.png`,
    model: "./assets/models/porcelain-vase.glb",
    tags: ["porcelain", "colorful", "weird"],
    voice: "瓶子正面好看不算本事，转到背后仍然讲究，才配进入朕的百宝格。",
    source: "用户交付 GLB；正式器名与馆藏参考待共同确认"
  }
];

const artifacts = window.QIANLONG_COLLECTION_3D.map((item) => ({ ...item }));
const vault = artifacts.map((item) => ({ ...item }));

function coreArtifacts() {
  return artifacts.map((item) => ({ ...item }));
}

const themes = [
  { id: "original", name: "瑾瑜本匣", hint: "玉、金与袖珍机关，被朕塞进同一只匣子。", tags: ["original", "jade", "gold"] },
  { id: "pink", name: "胭脂粉局", hint: "这一匣像把御花园的莲花都烧进了器物。", tags: ["pink", "flower"] },
  { id: "jade", name: "玉白清供", hint: "颜色安静下来，手感与器形便更抢眼。", tags: ["jade", "white", "green"] },
  { id: "western", name: "西洋奇珍", hint: "怀表、肖像与舶来小瓶，都是朕的进口玩具。", tags: ["western", "gold", "blue"] },
  { id: "mechanical", name: "机关脑洞", hint: "会转、能开、藏得下整篇文章，才算有趣。", tags: ["mechanical", "weird"] },
  { id: "porcelain", name: "瓷器炫技", hint: "这一局没有低调二字，只有工匠的极限测试。", tags: ["porcelain", "colorful", "weird"] }
];

const layouts = [
  // 每套排布都完整铺满 12 × 7 托盘：长格、竖格和小方格交错，避免出现空洞。
  [[1, 1, 3, 3], [1, 4, 3, 4], [4, 1, 3, 2], [7, 1, 3, 2], [10, 1, 3, 2], [4, 3, 4, 3], [8, 3, 5, 3], [4, 6, 2, 2], [6, 6, 4, 2], [10, 6, 3, 2]],
  [[1, 1, 4, 2], [5, 1, 4, 2], [9, 1, 4, 2], [1, 3, 3, 3], [4, 3, 5, 3], [9, 3, 4, 3], [1, 6, 2, 2], [3, 6, 3, 2], [6, 6, 3, 2], [9, 6, 4, 2]],
  [[1, 1, 2, 4], [3, 1, 4, 2], [7, 1, 3, 2], [10, 1, 3, 2], [3, 3, 3, 2], [6, 3, 4, 2], [10, 3, 3, 2], [1, 5, 4, 3], [5, 5, 4, 3], [9, 5, 4, 3]]
];

const state = {
  theme: themes[0],
  items: artifacts.slice(0, 10),
  layout: layouts[0],
  selectedIndex: 0,
  introStep: 0,
  busy: false,
  holdTimer: null,
  dragIndex: null,
  dragTarget: null,
  slotPointerStart: null,
  slotPointerMoved: false,
  toastTimer: null,
  tasteReport: null
};

const trayGrid = document.querySelector("#trayGrid");
const cabinetDoor = document.querySelector("#cabinetDoor");
const cabinet = document.querySelector("#cabinet");
const cabinetViewer = document.querySelector("#cabinetViewer");
const cabinetModelStage = document.querySelector("#cabinetModelStage");
const cabinetModel = document.querySelector("#cabinetModel");
const modelOpenButton = document.querySelector("#modelOpenButton");
const renewButton = document.querySelector("#renewButton");
const themeReveal = document.querySelector(".theme-reveal");
const themeName = document.querySelector(".theme-name");
const themeHint = document.querySelector(".theme-hint");
const introOverlay = document.querySelector("#introOverlay");
const introButton = document.querySelector("#introButton");
const dialogueText = document.querySelector("#dialogueText");
const qianlongPortrait = document.querySelector("#qianlongPortrait");
const gestureTip = document.querySelector("#gestureTip");
const doorPrompt = document.querySelector("#doorPrompt");
const detailSheet = document.querySelector("#detailSheet");
const vaultSheet = document.querySelector("#vaultSheet");
const cardSheet = document.querySelector("#cardSheet");
const tasteResult = document.querySelector("#tasteResult");
const vaultGrid = document.querySelector("#vaultGrid");
const toast = document.querySelector("#toast");
const detailModel = document.querySelector("#detailModel");

function shuffled(list) {
  const copy = [...list];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function chooseTheme() {
  const alternatives = themes.filter((theme) => theme.id !== state.theme.id);
  state.theme = alternatives[Math.floor(Math.random() * alternatives.length)];
  const matching = vault.filter((item) => item.tags.some((tag) => state.theme.tags.includes(tag)));
  const thematicSelection = shuffled(matching).slice(0, 7);
  const remainingPool = vault.filter((item) => !thematicSelection.includes(item));
  const selected = [
    ...thematicSelection,
    ...shuffled(remainingPool).slice(0, 10 - thematicSelection.length)
  ];
  state.items = shuffled(selected);
  state.layout = layouts[Math.floor(Math.random() * layouts.length)];
  state.tasteReport = null;
  themeName.textContent = state.theme.name;
  themeHint.textContent = state.theme.hint;
}

function applyModelOrientation(viewer, item) {
  if (item.orientation) viewer.setAttribute("orientation", item.orientation);
  else viewer.removeAttribute("orientation");
}

function renderTray(animate = false) {
  trayGrid.textContent = "";
  if (window.physicalCabinet) {
    window.physicalCabinet.update(state.items, state.layout);
    return;
  }
  state.items.forEach((item, index) => {
    const slot = document.createElement("div");
    const [column, row, columns, rows] = state.layout[index] || [1, 1, 2, 2];
    slot.className = `artifact-slot${animate ? " is-entering" : ""}`;
    slot.dataset.index = String(index);
    slot.style.gridColumn = `${column} / span ${columns}`;
    slot.style.gridRow = `${row} / span ${rows}`;
    slot.style.animationDelay = `${index * 34}ms`;
    slot.tabIndex = 0;
    slot.setAttribute("role", "button");
    slot.setAttribute("aria-label", `查看 ${item.name}`);
    if (item.model) slot.classList.add("has-model");

    const viewer = document.createElement("model-viewer");
    viewer.src = item.model;
    viewer.alt = `${item.name} 三维模型`;
    viewer.setAttribute("interaction-prompt", "none");
    viewer.setAttribute("touch-action", "none");
    viewer.setAttribute("shadow-intensity", "1");
    viewer.setAttribute("shadow-softness", ".9");
    viewer.setAttribute("exposure", "1.05");
    viewer.setAttribute("loading", "lazy");
    applyModelOrientation(viewer, item);
    viewer.addEventListener("load", () => slot.classList.add("model-ready"));
    viewer.addEventListener("error", () => slot.classList.add("model-error"));
    const label = document.createElement("span");
    label.className = "slot-name";
    label.textContent = item.short;
    const loader = document.createElement("span");
    loader.className = "model-slot-loader";
    loader.textContent = "载入 3D";
    slot.append(viewer, loader, label);
    if (item.model) {
      const badge = document.createElement("span");
      badge.className = "model-badge";
      badge.textContent = "3D";
      slot.append(badge);
    }
    trayGrid.append(slot);
  });
}

function renderVault() {
  vaultGrid.textContent = "";
  vault.forEach((item) => {
    const button = document.createElement("button");
    button.className = "vault-item";
    button.type = "button";
    button.dataset.artifactId = item.id;
    const viewer = document.createElement("model-viewer");
    viewer.src = item.model;
    viewer.alt = `${item.name} 三维模型`;
    viewer.setAttribute("camera-controls", "");
    viewer.setAttribute("interaction-prompt", "none");
    viewer.setAttribute("touch-action", "pan-y");
    viewer.setAttribute("shadow-intensity", ".8");
    viewer.setAttribute("loading", "lazy");
    applyModelOrientation(viewer, item);
    const label = document.createElement("span");
    label.textContent = item.short;
    button.append(viewer, label);
    vaultGrid.append(button);
  });
}

function setSheet(sheet, isOpen) {
  sheet.classList.toggle("is-open", isOpen);
  sheet.setAttribute("aria-hidden", String(!isOpen));
  document.body.style.overflow = isOpen || tasteResult.classList.contains("is-open") ? "hidden" : "";
}

async function showDetail(index) {
  if (window.physicalCabinet) {
    if (state.busy || window.physicalCabinet.isInspecting) return;
    state.busy = true;
    try { await window.physicalCabinet.pick(index); }
    catch (error) { showToast(error.message); return; }
    finally { state.busy = false; }
  }
  state.selectedIndex = index;
  const item = state.items[index];
  const detailImage = document.querySelector("#detailImage");
  detailImage.src = item.image;
  detailImage.alt = item.name;
  const hasModel = Boolean(item.model);
  detailImage.classList.toggle("is-hidden", hasModel);
  detailModel.classList.toggle("is-visible", hasModel);
  if (hasModel) {
    detailModel.classList.remove("is-loaded");
    const progressBar = detailModel.querySelector(".model-progress span");
    if (progressBar) progressBar.style.width = "0%";
    detailModel.src = item.model;
    detailModel.alt = `${item.name} 三维模型`;
    applyModelOrientation(detailModel, item);
  } else {
    detailModel.removeAttribute("src");
    detailModel.removeAttribute("orientation");
    detailModel.alt = "";
  }
  document.querySelector("#detailIndex").textContent = String(index + 1).padStart(2, "0");
  document.querySelector("#detailDynasty").textContent = item.dynasty;
  document.querySelector("#detailCategory").textContent = item.category;
  document.querySelector("#detailAttribute").textContent = item.attribute;
  document.querySelector("#detailMaterial").textContent = item.material;
  document.querySelector("#detailName").textContent = item.name;
  document.querySelector("#detailVoice").textContent = `“${item.voice}”`;
  document.querySelector("#detailHistory").textContent = item.history;
  document.querySelector("#detailStatus").textContent = "左右拖动旋转 · 双指或滚轮缩放 · 停下后自动转动";
  setSheet(detailSheet, true);
}

let cabinetTapStart = null;

const cabinetPointers = new Set();
let cabinetMultiTouch = false;
function onCabinetPointerDown(event) {
  cabinetPointers.add(event.pointerId);
  if (cabinetPointers.size > 1) { cabinetMultiTouch = true; cabinetTapStart = null; return; }
  cabinetMultiTouch = false;
  cabinetTapStart = { x: event.clientX, y: event.clientY, time: performance.now() };
}

function onCabinetPointerUp(event) {
  cabinetPointers.delete(event.pointerId);
  if (cabinetMultiTouch) { if (!cabinetPointers.size) cabinetMultiTouch = false; cabinetTapStart = null; return; }
  if (!cabinetTapStart) return;
  const distance = Math.hypot(event.clientX - cabinetTapStart.x, event.clientY - cabinetTapStart.y);
  const duration = performance.now() - cabinetTapStart.time;
  cabinetTapStart = null;
  // 拖动用于旋转；短促轻点才触发运镜开匣。
  if (distance < 9 && duration < 450) openCabinet();
}

function setCabinetOpen(isOpen) {
  if (window.physicalCabinet) {
    window.physicalCabinet.setOpen(isOpen, false);
    cabinetDoor.classList.toggle("is-closed", !isOpen);
    gestureTip.textContent = isOpen ? "轻点看物 · 双指缩放 · 长按换位" : "拖动旋转 · 双指缩放 · 轻点开匣";
    document.querySelector("#cabinetRotateHint").textContent = "";
    return;
  }
  cabinetDoor.classList.toggle("is-closed", !isOpen);
  cabinet.classList.toggle("is-drawer-open", isOpen);
  cabinet.classList.toggle("is-concealed", !isOpen);
  cabinetModelStage.classList.toggle("is-concealed", isOpen);
  cabinetModelStage.classList.remove("is-opening");
  cabinetDoor.setAttribute("aria-label", isOpen ? "瑾瑜匣已开启" : "打开瑾瑜匣");
  cabinetDoor.disabled = isOpen;
  gestureTip.textContent = isOpen
    ? "轻点看物 · 在卡片里替换 · 长按拖动隔间"
    : "先轻触匣门开匣 · 也可左右滑动赏匣身";
  doorPrompt.textContent = isOpen ? "" : "轻触开匣";
}

async function openCabinet() {
  if (window.physicalCabinet) {
    if (state.busy || window.physicalCabinet.isOpen) return;
    state.busy = true;
    try { await window.physicalCabinet.setOpen(true, true); setCabinetOpen(true); themeReveal.classList.add("is-visible"); }
    finally { state.busy = false; }
    return;
  }
  if (state.busy || !cabinetDoor.classList.contains("is-closed")) return;
  state.busy = true;
  cabinetModelStage.classList.add("is-opening");
  cabinetModel.cameraOrbit = "0deg 38deg 70%";
  window.setTimeout(() => {
    setCabinetOpen(true);
    themeReveal.classList.add("is-visible");
    cabinetModel.cameraOrbit = "20deg 72deg auto";
    state.busy = false;
  }, 880);
}

async function renew() {
  if (window.physicalCabinet) {
    if (state.busy || window.physicalCabinet.isInspecting) return;
    state.busy = true; renewButton.disabled = true;
    themeReveal.classList.remove("is-visible");
    try {
      await window.physicalCabinet.setOpen(false, true);
      chooseTheme(); renderTray(true);
      await window.physicalCabinet.setOpen(true, true);
      setCabinetOpen(true); themeReveal.classList.add("is-visible"); persistSelection();
    } finally { state.busy = false; renewButton.disabled = false; }
    return;
  }
  if (state.busy) return;
  state.busy = true;
  renewButton.disabled = true;
  renewButton.classList.add("is-spinning");
  themeReveal.classList.remove("is-visible");
  setCabinetOpen(false);
  window.setTimeout(() => {
    chooseTheme();
    renderTray(true);
    cabinetModelStage.classList.add("is-opening");
    cabinetModel.cameraOrbit = "0deg 38deg 70%";
    window.setTimeout(() => {
      setCabinetOpen(true);
      themeReveal.classList.add("is-visible");
      cabinetModel.cameraOrbit = "20deg 72deg auto";
    }, 650);
  }, 520);
  window.setTimeout(() => {
    state.busy = false;
    renewButton.disabled = false;
    renewButton.classList.remove("is-spinning");
    persistSelection();
  }, 1450);
}

function persistSelection() {
  try {
    localStorage.setItem("qianlong-toy-box-selection", JSON.stringify(state.items.map((item) => item.id)));
  } catch (error) {
    // 小工具仍可在无持久化能力时运行。
  }
}

function restoreSelection() {
  try {
    const stored = JSON.parse(localStorage.getItem("qianlong-toy-box-selection") || "null");
    if (!Array.isArray(stored) || stored.length !== 10) return false;
    const restored = stored.map((id) => vault.find((item) => item.id === id)).filter(Boolean);
    if (restored.length !== 10) return false;
    state.items = restored;
    return true;
  } catch (error) {
    return false;
  }
}

function showToast(message) {
  window.clearTimeout(state.toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  state.toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 1900);
}

function clearDragClasses() {
  trayGrid.querySelectorAll(".artifact-slot").forEach((slot) => {
    slot.classList.remove("is-held", "is-target");
  });
}

function onPointerDown(event) {
  const slot = event.target.closest(".artifact-slot");
  if (!slot || state.busy) return;
  const index = Number(slot.dataset.index);
  state.dragIndex = null;
  state.dragTarget = null;
  state.slotPointerStart = { x: event.clientX, y: event.clientY };
  state.slotPointerMoved = false;
  window.clearTimeout(state.holdTimer);
  state.holdTimer = window.setTimeout(() => {
    state.dragIndex = index;
    slot.classList.add("is-held");
    if (navigator.vibrate) navigator.vibrate(22);
    showToast("已拿起隔间，拖到另一格松手");
  }, 480);
}

function onPointerMove(event) {
  if (state.dragIndex === null) {
    if (state.slotPointerStart) {
      const distance = Math.hypot(event.clientX - state.slotPointerStart.x, event.clientY - state.slotPointerStart.y);
      if (distance > 8) {
        state.slotPointerMoved = true;
        window.clearTimeout(state.holdTimer);
      }
    }
    return;
  }
  const target = document.elementFromPoint(event.clientX, event.clientY)?.closest(".artifact-slot");
  trayGrid.querySelectorAll(".artifact-slot.is-target").forEach((slot) => slot.classList.remove("is-target"));
  if (!target) {
    state.dragTarget = null;
    return;
  }
  const targetIndex = Number(target.dataset.index);
  if (targetIndex === state.dragIndex) return;
  state.dragTarget = targetIndex;
  target.classList.add("is-target");
}

function onPointerUp(event) {
  window.clearTimeout(state.holdTimer);
  if (state.dragIndex !== null) {
    event.preventDefault();
    if (state.dragTarget !== null) {
      [state.items[state.dragIndex], state.items[state.dragTarget]] = [state.items[state.dragTarget], state.items[state.dragIndex]];
      [state.layout[state.dragIndex], state.layout[state.dragTarget]] = [state.layout[state.dragTarget], state.layout[state.dragIndex]];
      renderTray(true);
      persistSelection();
      showToast("隔间已重新排好");
    }
    clearDragClasses();
    state.dragIndex = null;
    state.dragTarget = null;
    state.slotPointerStart = null;
    state.slotPointerMoved = false;
    return;
  }
  if (state.slotPointerMoved) {
    state.slotPointerStart = null;
    state.slotPointerMoved = false;
    return;
  }
  const slot = event.target.closest(".artifact-slot");
  state.slotPointerStart = null;
  if (slot) showDetail(Number(slot.dataset.index));
}

function onKeyDown(event) {
  const slot = event.target.closest(".artifact-slot");
  if (!slot) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    showDetail(Number(slot.dataset.index));
  }
}

function closeNamedSheet(name) {
  if ((name === "detail" || name === "vault") && window.physicalCabinet?.isInspecting) window.physicalCabinet.putBack();
  const sheets = { detail: detailSheet, vault: vaultSheet, card: cardSheet };
  if (sheets[name]) setSheet(sheets[name], false);
}

const tasteProfiles = [
  {
    id: "garden",
    name: "御花园秩序派",
    code: "FLORAL · ORDERED",
    signals: { pink: 3.2, flower: 2.4, porcelain: 0.45, green: 0.35 },
    summary: "你偏爱花卉与柔和釉色，却不会任由热闹失去秩序。你的柜子像一座被认真修剪过的御花园。"
  },
  {
    id: "jade",
    name: "玉白清赏派",
    code: "JADE · RESTRAINED",
    signals: { jade: 4.2, white: 3.1, green: 1.7, flower: 0.25 },
    summary: "你相信真正耐看的器物不必高声说话。温润材质、干净器形与克制颜色，是你的选品准则。"
  },
  {
    id: "mechanical",
    name: "造办机关派",
    code: "CURIOUS · MECHANICAL",
    signals: { mechanical: 3.5, weird: 0.9, gold: 1.45, western: 0.25 },
    summary: "你挑中的不只是器物，而是一连串值得追问的机关。越猜不透用途，越容易被你收入匣中。"
  },
  {
    id: "western",
    name: "西洋奇珍派",
    code: "GLOBAL · ORNATE",
    signals: { western: 3.8, blue: 2.2, glass: 1.8, portrait: 0.85, gold: 0.55 },
    summary: "你的目光会越过宫墙，追逐陌生材料与舶来器形。你在意的不是出处是否一致，而是它够不够新鲜。"
  },
  {
    id: "kiln",
    name: "釉彩炫技派",
    code: "COLORFUL · MAXIMAL",
    signals: { colorful: 2.9, enamel: 1.65, red: 1.4, porcelain: 0.6, blue: 0.45 },
    summary: "你欣赏把复杂工艺做到极致的器物。颜色可以叠，纹样可以满，难度本身就是你眼中的美感。"
  },
  {
    id: "scholar",
    name: "瑾瑜博古派",
    code: "SCHOLARLY · TIMELESS",
    signals: { scholar: 3.2, original: 2.35, lacquer: 2, black: 0.9, landscape: 0.7, imperial: 0.65 },
    summary: "你更在意器物背后的时间、文字与来历。比起第一眼惊艳，你更愿意留下能够慢慢读懂的东西。"
  }
];

function countSelectionTags() {
  return state.items.reduce((counts, item) => {
    item.tags.forEach((tag) => { counts[tag] = (counts[tag] || 0) + 1; });
    return counts;
  }, {});
}

function percentageFromCount(count, floor = 28) {
  return Math.min(96, floor + count * 11);
}

const catalogTagFrequency = vault.reduce((counts, item) => {
  item.tags.forEach((tag) => { counts[tag] = (counts[tag] || 0) + 1; });
  return counts;
}, {});

function signalSpecificity(tag) {
  const frequency = catalogTagFrequency[tag] || 1;
  return Math.min(2.35, Math.max(0.72, Math.sqrt(vault.length / frequency) * 0.62));
}

function scoreTasteProfile(profile, counts) {
  const evidence = Object.entries(profile.signals).reduce((score, [tag, weight]) => {
    const share = (counts[tag] || 0) / Math.max(1, state.items.length);
    return score + share * weight * signalSpecificity(tag);
  }, 0);
  const strongMatches = Object.entries(profile.signals)
    .filter(([tag, weight]) => weight >= 1.4 && (counts[tag] || 0) > 0)
    .length;
  return evidence + Math.max(0, strongMatches - 1) * 0.18;
}

function scoreItemForProfile(item, profile) {
  return item.tags.reduce((score, tag) => {
    const weight = profile.signals[tag] || 0;
    return score + weight * signalSpecificity(tag);
  }, 0);
}

function readableList(items) {
  const names = items.filter(Boolean).map((item) => `“${item.short}”`);
  if (names.length <= 1) return names[0] || "这件器物";
  return `${names.slice(0, -1).join("、")}和${names.at(-1)}`;
}

const tasteNarratives = {
  pink: { title: "你用胭脂色给热闹定了调", idea: "柔和的粉色反复出现，让不同器形先有了共同的情绪" },
  flower: { title: "你在匣中重新种了一座花园", idea: "花卉不是点缀，而是你组织整匣器物的线索" },
  jade: { title: "你愿意为温润留出位置", idea: "玉质的光泽并不喧哗，却经得住靠近和久看" },
  white: { title: "你把颜色安静了下来", idea: "玉白让器形与轮廓先说话，也暴露了你对克制的偏爱" },
  green: { title: "你偏爱的绿不是一种绿", idea: "青绿、碧色和翠地彼此呼应，把清凉感留在了柜中" },
  mechanical: { title: "你总想知道它究竟怎么动", idea: "机关、转动与隐藏用途，比单纯的名贵更能勾住你的注意" },
  weird: { title: "你会给反常器形一次机会", idea: "越是第一眼猜不中用途的东西，越容易成为你的谈资" },
  gold: { title: "你并不回避器物的排场", idea: "鎏金与金色细节被你当作结构重点，而不是无意义的炫耀" },
  western: { title: "你的目光越过了宫墙", idea: "舶来器形和异域趣味进入同一只匣子，反而显出你的开放" },
  blue: { title: "一抹霁蓝替你稳住了全局", idea: "蓝色让繁密纹样获得呼吸，也让整匣的热闹有了停顿" },
  colorful: { title: "你把工艺难度也算进了美感", idea: "复合釉彩与多层装饰越难驾驭，越能得到你的注意" },
  enamel: { title: "你会靠近看珐琅的细节", idea: "颜色、描线与烧成的光泽，都是你判断精致程度的证据" },
  red: { title: "朱红是你留下的重音", idea: "红色没有铺满全局，却在关键位置替你的选择落了款" },
  scholar: { title: "你愿意把一件器物慢慢读完", idea: "诗文、题款与书房气息，让器物在好看之外还有内容" },
  original: { title: "你没有忘记百宝匣的来处", idea: "袖珍、可把玩和有来历的器物，被你留作整局的骨架" },
  lacquer: { title: "你看得见时间留下的层次", idea: "漆层、描金与雕刻背后的慢工，比第一眼的华丽更打动你" }
};

const materialSignals = [
  { tag: "porcelain", title: "你相信釉面会说话", idea: "瓷器占据了相当分量；你在意釉色、器形和近看时的细腻变化" },
  { tag: "enamel", title: "你把珐琅当成掌心里的画", idea: "画珐琅和掐丝珐琅反复出现，说明你会把绘画般的细节算进选品" },
  { tag: "jade", title: "你偏爱有触感的光泽", idea: "玉器的温润与薄胎感，让材质本身成了你的判断依据" },
  { tag: "lacquer", title: "你对慢工艺格外有耐心", idea: "髹漆、剔刻与描金需要时间，你留下的正是这种不急于完成的质感" },
  { tag: "glass", title: "透明与反光也在你的审美里", idea: "玻璃带来的轻盈和异域感，让整匣不只停留在传统材料中" },
  { tag: "mechanical", title: "器物会动，才算真正入戏", idea: "机械构件并非附加噱头，而是你理解一件器物性格的入口" }
];

function buildTasteInsights(profile, counts, rankedSignals) {
  const firstSignal = rankedSignals.find(({ tag }) => tasteNarratives[tag] && (counts[tag] || 0) > 0);
  const firstEvidence = firstSignal
    ? state.items.filter((item) => item.tags.includes(firstSignal.tag)).slice(0, 2)
    : state.items.slice(0, 2);
  const firstNarrative = tasteNarratives[firstSignal?.tag] || tasteNarratives.original;

  const material = materialSignals
    .map((entry) => ({ ...entry, count: counts[entry.tag] || 0 }))
    .sort((a, b) => b.count * signalSpecificity(b.tag) - a.count * signalSpecificity(a.tag))[0];
  const materialEvidence = state.items.filter((item) => item.tags.includes(material.tag)).slice(0, 2);

  const rankedItems = state.items
    .map((item) => ({ item, affinity: scoreItemForProfile(item, profile) }))
    .sort((a, b) => a.affinity - b.affinity);
  const outlier = rankedItems[0];
  const strongest = rankedItems.at(-1);
  const hasOutlier = outlier && strongest && outlier.affinity < strongest.affinity * 0.28;

  return [
    {
      title: firstNarrative.title,
      text: `${readableList(firstEvidence)}被你同时留下。${firstNarrative.idea}。`
    },
    {
      title: material.count > 0 ? material.title : "你没有被单一材质困住",
      text: material.count > 0
        ? material.count >= 3
          ? `${readableList(materialEvidence)}最能说明这一点。${material.idea}，同类信号在你的十件中出现了 ${material.count} 次。`
          : `${readableList(materialEvidence)}替这一匣添了一种不同触感。它不是数量最多的材料，却说明你的判断并不只服从统一风格。`
        : "你的十件在材质上没有明显多数。比起统一质感，你更愿意让器物凭各自的性格进入柜中。"
    },
    hasOutlier
      ? {
          title: `你还为${outlier.item.short}留了一个意外席位`,
          text: `它与“${profile.name}”的主信号并不完全一致，却没有被你换走。这个偏离让结果更像你的真实选择，也避免整匣只剩下一种标准答案。`
        }
      : {
          title: "你的十件几乎没有一句多余的话",
          text: `${readableList([strongest?.item, rankedItems.at(-2)?.item])}把“${profile.name}”的取向说得最清楚。你的选择集中而稳定，器形虽不同，判断标准却很一致。`
        }
  ];
}

function createTasteReport() {
  const counts = countSelectionTags();
  const rankedProfiles = tasteProfiles
    .map((profile) => ({
      ...profile,
      score: scoreTasteProfile(profile, counts)
    }))
    .sort((a, b) => b.score - a.score);
  const profile = rankedProfiles[0];
  const rankedSignals = Object.entries(profile.signals)
    .map(([tag, weight]) => ({ tag, score: (counts[tag] || 0) * weight * signalSpecificity(tag) }))
    .sort((a, b) => b.score - a.score);
  const signatureItems = [...state.items]
    .map((item) => ({
      item,
      score: scoreItemForProfile(item, profile)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ item }) => item);

  const colorTags = ["pink", "green", "blue", "red", "white", "gold", "black", "colorful"];
  const colorNames = { pink: "胭脂粉", green: "青绿", blue: "霁蓝", red: "朱红", white: "玉白", gold: "鎏金", black: "玄黑", colorful: "多彩" };
  const dominantColor = colorTags.sort((a, b) => (counts[b] || 0) - (counts[a] || 0))[0];
  const porcelainCount = counts.porcelain || 0;
  const jadeCount = counts.jade || 0;
  const curiousCount = Math.max(counts.weird || 0, counts.mechanical || 0);
  const flowerCount = counts.flower || 0;
  const westernCount = counts.western || 0;

  return {
    ...profile,
    counts,
    signatureItems,
    dominantColor: colorNames[dominantColor] || "宫廷多彩",
    axes: [
      { label: "花卉浓度", value: percentageFromCount(flowerCount), note: `${flowerCount} 件带有花卉或植物气息` },
      { label: "瓷玉偏爱", value: percentageFromCount(porcelainCount + jadeCount, 22), note: `${porcelainCount + jadeCount} 件来自瓷与玉的温润质感` },
      { label: "奇巧指数", value: percentageFromCount(curiousCount, 25), note: `${curiousCount} 件带有异形、机关或意外用途` },
      { label: "舶来趣味", value: percentageFromCount(westernCount, 20), note: `${westernCount} 件透露出西洋或异域趣味` }
    ],
    insights: buildTasteInsights(profile, counts, rankedSignals)
  };
}

function renderTasteResult() {
  const report = createTasteReport();
  state.tasteReport = report;
  document.querySelector("#tasteIdentity").textContent = report.name;
  document.querySelector("#tasteCode").textContent = report.code;
  document.querySelector("#tasteSummary").textContent = report.summary;

  const heroItems = document.querySelector("#tasteHeroItems");
  heroItems.textContent = "";
  report.signatureItems.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><img src="${item.image}" alt="${item.name}"><figcaption>${item.short}</figcaption>`;
    heroItems.append(figure);
  });

  const axes = document.querySelector("#tasteAxes");
  axes.textContent = "";
  report.axes.forEach((axis) => {
    const row = document.createElement("div");
    row.className = "taste-axis";
    row.innerHTML = `<div><strong>${axis.label}</strong><span>${axis.value}%</span></div><div class="axis-track"><i style="--axis-value:${axis.value}%"></i></div><p>${axis.note}</p>`;
    axes.append(row);
  });

  const insights = document.querySelector("#tasteInsights");
  insights.textContent = "";
  report.insights.forEach((insight, index) => {
    const article = document.createElement("article");
    article.innerHTML = `<span>0${index + 1}</span><div><h4>${insight.title}</h4><p>${insight.text}</p></div>`;
    insights.append(article);
  });

}

function openTasteResult() {
  renderTasteResult();
  tasteResult.classList.add("is-open");
  tasteResult.setAttribute("aria-hidden", "false");
  tasteResult.scrollTop = 0;
  document.body.style.overflow = "hidden";
}

function closeTasteResult() {
  tasteResult.classList.remove("is-open");
  tasteResult.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

async function drawMemoryCard() {
  const canvas = document.querySelector("#memoryCanvas");
  const context = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const report = state.tasteReport || createTasteReport();
  state.tasteReport = report;
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#fbf7ef";
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "rgba(140, 56, 41, 0.075)";
  context.lineWidth = 1;
  for (let x = 44; x < width; x += 82) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  context.strokeStyle = "#a53b2f";
  context.lineWidth = 2;
  context.strokeRect(28, 28, width - 56, height - 56);

  context.fillStyle = "#8f3028";
  context.font = "700 22px sans-serif";
  context.textAlign = "center";
  context.fillText("QIANLONG'S TOY BOX", width / 2, 70);
  context.fillStyle = "#2d201c";
  context.font = "700 44px serif";
  context.fillText("乾 隆 的 玩 具 盒", width / 2, 120);
  context.fillStyle = "#a2382d";
  context.font = "26px serif";
  context.fillText("寡 人 钦 点 · 十 件 皇 家 选 品", width / 2, 163);

  roundedRect(context, 205, 186, 670, 82, 18);
  context.fillStyle = "rgba(255, 253, 247, .78)";
  context.fill();
  context.strokeStyle = "#ad493b";
  context.lineWidth = 2;
  context.stroke();
  context.fillStyle = "#927424";
  context.font = "700 42px serif";
  context.fillText(report.name, width / 2, 241);

  const cardWidth = 458;
  const cardHeight = 164;
  const columnGap = 24;
  const rowGap = 12;
  const startX = 70;
  const startY = 296;

  const images = await Promise.all(state.items.map((item) => loadImage(item.image)));
  state.items.forEach((item, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const x = startX + column * (cardWidth + columnGap);
    const y = startY + row * (cardHeight + rowGap);
    roundedRect(context, x, y, cardWidth, cardHeight, 14);
    context.fillStyle = "#ffffff";
    context.fill();
    context.strokeStyle = "rgba(166, 56, 43, .55)";
    context.lineWidth = 1.5;
    context.stroke();

    context.fillStyle = "#a32f27";
    context.font = "700 32px serif";
    context.textAlign = "left";
    context.fillText(String(index + 1).padStart(2, "0"), x + 20, y + 42);
    context.fillStyle = "#34241f";
    context.font = "22px serif";
    drawWrappedText(context, item.short, x + 20, y + 80, 148, 30, 2);
    context.fillStyle = "#ffffff";
    context.fillRect(x + 178, y + 9, cardWidth - 187, cardHeight - 18);
    context.save();
    context.globalCompositeOperation = "source-over";
    context.filter = "brightness(1.045) contrast(1.015) saturate(1.14)";
    drawContained(context, images[index], x + 188, y + 15, cardWidth - 207, cardHeight - 30);
    context.restore();
  });

  const footerY = 1184;
  roundedRect(context, 70, footerY, 610, 176, 14);
  context.fillStyle = "rgba(255, 253, 247, .72)";
  context.fill();
  context.strokeStyle = "rgba(166, 56, 43, .52)";
  context.stroke();
  context.textAlign = "left";
  context.fillStyle = "#35241f";
  context.font = "700 30px serif";
  drawWrappedText(context, "测测你和我的审美取向有多相似？", 96, footerY + 50, 550, 42, 2);
  context.fillStyle = "#a3342b";
  context.font = "25px serif";
  context.fillText("扫码和我比一局", 96, footerY + 139);

  drawQrPlaceholder(context, 706, footerY + 8, 160, state.items.map((item) => item.id).join(""));

  context.textAlign = "left";
  context.fillStyle = "#4f3931";
  context.font = "22px serif";
  context.fillText(`本局：${state.theme.name}`, 892, footerY + 58);
  const today = new Date();
  context.fillStyle = "#806c61";
  context.font = "19px sans-serif";
  context.fillText(`${today.getFullYear()} · ${String(today.getMonth() + 1).padStart(2, "0")} · ${String(today.getDate()).padStart(2, "0")}`, 892, footerY + 100);
  context.fillStyle = "#a3342b";
  context.font = "18px sans-serif";
  context.fillText(report.code, 892, footerY + 140);
}

function roundedRect(context, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + width, y, x + width, y + height, r);
  context.arcTo(x + width, y + height, x, y + height, r);
  context.arcTo(x, y + height, x, y, r);
  context.arcTo(x, y, x + width, y, r);
  context.closePath();
}

function drawWrappedText(context, text, x, y, maxWidth, lineHeight, maxLines) {
  const characters = [...text];
  let line = "";
  let lineIndex = 0;
  for (let index = 0; index < characters.length; index += 1) {
    const testLine = line + characters[index];
    if (context.measureText(testLine).width > maxWidth && line) {
      context.fillText(line, x, y + lineIndex * lineHeight);
      lineIndex += 1;
      line = characters[index];
      if (lineIndex >= maxLines - 1) {
        const rest = line + characters.slice(index + 1).join("");
        context.fillText(trimCanvasText(context, rest, maxWidth), x, y + lineIndex * lineHeight);
        return;
      }
    } else {
      line = testLine;
    }
  }
  if (line) context.fillText(line, x, y + lineIndex * lineHeight);
}

function drawQrPlaceholder(context, x, y, size, seedText) {
  context.fillStyle = "#fffdf7";
  context.fillRect(x, y, size, size);
  context.strokeStyle = "#9b3a31";
  context.lineWidth = 3;
  context.strokeRect(x, y, size, size);
  const cells = 17;
  const unit = (size - 20) / cells;
  let seed = [...seedText].reduce((total, character) => total + character.charCodeAt(0), 0);
  const finder = (column, row) => (column < 5 && row < 5) || (column > 11 && row < 5) || (column < 5 && row > 11);
  context.fillStyle = "#2d211d";
  for (let row = 0; row < cells; row += 1) {
    for (let column = 0; column < cells; column += 1) {
      seed = (seed * 9301 + 49297) % 233280;
      const on = finder(column, row) || seed / 233280 > 0.55;
      if (on) context.fillRect(x + 10 + column * unit, y + 10 + row * unit, Math.ceil(unit), Math.ceil(unit));
    }
  }
  context.fillStyle = "rgba(255,253,247,.92)";
  context.fillRect(x + 35, y + size / 2 - 18, size - 70, 36);
  context.fillStyle = "#7e3029";
  context.font = "700 16px sans-serif";
  context.textAlign = "center";
  context.fillText("二维码占位", x + size / 2, y + size / 2 + 6);
}

function loadImage(source) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = source;
  });
}

function drawContained(context, image, x, y, width, height) {
  if (!image) return;
  const ratio = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * ratio;
  const drawHeight = image.naturalHeight * ratio;
  context.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
}

function trimCanvasText(context, text, maxWidth) {
  if (context.measureText(text).width <= maxWidth) return text;
  let output = text;
  while (output.length > 1 && context.measureText(`${output}…`).width > maxWidth) output = output.slice(0, -1);
  return `${output}…`;
}

function downloadCard() {
  const canvas = document.querySelector("#memoryCanvas");
  canvas.toBlob((blob) => {
    if (!blob) {
      showToast("请直接截图保存这张卡");
      return;
    }
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `乾隆的玩具盒-${state.theme.name}.png`;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("钦点卡已经备好");
  }, "image/png");
}

introButton.addEventListener("click", () => {
  const lines = [
    "朕每次开匣，都会换一种心情。至于这一局是什么主题——你自己看。",
    "看中哪件就点开，想换便换；长按不松手，还能给器物换个位置。"
  ];
  if (state.introStep < lines.length) {
    dialogueText.textContent = lines[state.introStep];
    if (state.introStep === 0) qianlongPortrait.src = "./assets/ui/qianlong-wink.jpg";
    state.introStep += 1;
    introButton.textContent = state.introStep === lines.length ? "替朕开匣" : "继续听旨";
    return;
  }
  introOverlay.classList.add("is-hidden");
  chooseTheme();
  renderTray(true);
  setCabinetOpen(false);
});

renewButton.addEventListener("click", renew);
cabinetDoor.addEventListener("click", openCabinet);
modelOpenButton.addEventListener("click", openCabinet);
cabinetModel.addEventListener("pointerdown", onCabinetPointerDown);
cabinetModel.addEventListener("pointerup", onCabinetPointerUp);
cabinetModel.addEventListener("pointercancel", () => { cabinetTapStart = null; cabinetPointers.clear(); cabinetMultiTouch = false; });
trayGrid.addEventListener("pointerdown", onPointerDown);
trayGrid.addEventListener("pointermove", onPointerMove);
trayGrid.addEventListener("pointerup", onPointerUp);
trayGrid.addEventListener("pointercancel", onPointerUp);
trayGrid.addEventListener("keydown", onKeyDown);

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => closeNamedSheet(button.dataset.close));
});

document.querySelector("#replaceButton").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  if (button.disabled) return;
  button.disabled = true;
  try {
    await ensureVault();
    setSheet(detailSheet, false);
    await window.physicalCabinet?.putBack();
    setSheet(vaultSheet, true);
  } catch (error) {
    console.error("Vault unavailable", error);
    showToast("宝库加载失败，请重试");
  } finally {
    button.disabled = false;
  }
});

document.querySelector("#inspectButton").addEventListener("click", () => {
  const item = state.items[state.selectedIndex];
  showToast(item.model ? "手指左右拖动模型，双指可缩放。" : "这件尚未接入 GLB，当前使用临时图片。 ");
});

vaultGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".vault-item");
  if (!button) return;
  const item = vault.find((artifact) => artifact.id === button.dataset.artifactId);
  if (!item) return;
  state.items[state.selectedIndex] = { ...item };
  state.tasteReport = null;
  renderTray(true);
  persistSelection();
  setSheet(vaultSheet, false);
  showToast(`已换成：${item.short}`);
});

document.querySelector("#cardButton").addEventListener("click", openTasteResult);
document.querySelector("#resultBackButton").addEventListener("click", closeTasteResult);
document.querySelector("#resultEditButton").addEventListener("click", closeTasteResult);
document.querySelector("#resultShareButton").addEventListener("click", async () => {
  await drawMemoryCard();
  setSheet(cardSheet, true);
});

document.querySelector("#saveCardButton").addEventListener("click", downloadCard);

const helpPopover = document.querySelector("#helpPopover");
function setHelp(open) {
  helpPopover.classList.toggle("is-open", open);
  helpPopover.setAttribute("aria-hidden", String(!open));
}
document.querySelector(".help-button").addEventListener("click", () => setHelp(true));
document.querySelector("#helpBackdrop").addEventListener("click", () => setHelp(false));
document.querySelector("#helpClose").addEventListener("click", () => setHelp(false));

function bindModelProgress(viewer) {
  const bar = viewer.querySelector(".model-progress span");
  viewer.addEventListener("progress", (event) => {
    if (bar) bar.style.width = `${Math.round(event.detail.totalProgress * 100)}%`;
  });
  viewer.addEventListener("load", () => viewer.classList.add("is-loaded"));
}

bindModelProgress(cabinetModel);
bindModelProgress(detailModel);

restoreSelection();
renderTray();

// Scene adapter keeps selection, reports and sharing in the original application.
window.cabinetApp = {
  getState: () => state,
  open: openCabinet,
  inspect: showDetail,
  toast: showToast,
  swap(a, b) {
    if (state.busy || a === b) return;
    [state.items[a], state.items[b]] = [state.items[b], state.items[a]];
    state.tasteReport = null;
    renderTray(); persistSelection(); showToast("器物已换位");
  },
  closeDetail() { setSheet(detailSheet, false); },
};

let vaultInitialized = false;
let vaultLoading = null;
async function ensureVault() {
  if (vaultInitialized) return;
  if (!vaultLoading) {
    vaultLoading = (async () => {
      // Match the entry-page URL: different query strings execute the module twice.
      if (!customElements.get("model-viewer")) {
        await import("./assets/vendor/model-viewer.min.js?v=2");
      }
      renderVault();
      vaultInitialized = true;
    })().finally(() => { vaultLoading = null; });
  }
  return vaultLoading;
}

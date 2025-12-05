// Animal upgrades.
const upgrades = [
    { e:"🐾", n:"Kitten",     desc:"Soft! (1/click)",       c: 0,     p: 1 },
    { e:"🐭", n:"Mouse",      desc:"Tiny toe-nails. (2)",   c: 11,    p: 2 },
    { e:"🐹", n:"Hamster",    desc:"Quick paws. (4)",       c: 24,    p: 4 },
    { e:"🐰", n:"Rabbit",     desc:"Hopping scratch! (8)",  c: 48,    p: 8 },
    { e:"🐶", n:"Puppy",      desc:"Mini canine flex. (13)",c: 90,    p: 13 },
    { e:"🐔", n:"Chicken",    desc:"Peck! (20)",            c: 165,   p: 20 },
    { e:"🦊", n:"Fox",        desc:"Sly paws. (28)",        c: 230,   p: 28 },
    { e:"🐱", n:"Cat",        desc:"Sharp nails (37)",      c: 320,   p: 37 },
    { e:"🦝", n:"Raccoon",    desc:"Dexterous! (48)",       c: 440,   p: 48 },
    { e:"🐺", n:"Wolf",       desc:"Pack power (60)",       c: 610,   p: 60 },
    { e:"🦦", n:"Otter",      desc:"Swept speed! (84)",     c: 820,   p: 84 },
    { e:"🐻", n:"Bear",       desc:"Grizzly! (120)",        c: 1120,  p: 120 },
    { e:"🐯", n:"Tiger",      desc:"Ferocious! (175)",      c: 1540,  p: 175 },
    { e:"🦡", n:"Badger",     desc:"Dig! (225)",            c: 1930,  p: 225 },
    { e:"🐘", n:"Elephant",   desc:"Huge stomp! (285)",     c: 2420,  p: 285 }
];

// Animal tools: autoclickers (10), each gives paws/sec after unlock.
const tools = [
    // e(icon), n(name), desc, cost, autoclick rate
    { e:"🐜", n:"Ant Army",         desc:"+1/sec, small steady paws",   c: 90, ac: 1 },
    { e:"🦋", n:"Butterfly Cloud",  desc:"+2/sec, gentle wings",        c: 210, ac: 2 },
    { e:"🦎", n:"Lizard Crew",      desc:"+4/sec, sneak & flash",       c: 400, ac: 4 },
    { e:"🕷️",n:"Spider Web",       desc:"+7/sec, everywhere clicks!",  c: 690, ac: 7 },
    { e:"🦅", n:"Eagle Patrol",     desc:"+13/sec, high flying",        c: 1600,ac: 13 },
    { e:"🐦", n:"Bird Flock",       desc:"+20/sec, sky taps!",          c: 2900,ac: 20 },
    { e:"🐠", n:"Fish School",      desc:"+40/sec, underwater tap",     c: 5200,ac: 40 },
    { e:"🪱", n:"Worm Work",        desc:"+90/sec, diligent dig",       c: 9500,ac: 90 },
    { e:"🦣", n:"Mammoth Wave",     desc:"+200/sec, ancient paws",      c: 18400,ac: 200 },
    { e:"🐉", n:"Mini-Dragon Gang", desc:"+420/sec, mythic tap force!", c: 35500,ac: 420 }
];

const pawSVGs = [
 // bucketing for upgrade up to index 4
 "data:image/svg+xml;utf8,<svg width='70' height='70' viewBox='0 0 72 72'><ellipse cx='36' cy='52' rx='20' ry='13' fill=\"%238e5b43\"/><ellipse cx='21' cy='22' rx='10' ry='12' fill=\"%238e5b43\"/><ellipse cx='51' cy='22' rx='10' ry='12' fill=\"%238e5b43\"/><ellipse cx='14' cy='39' rx='6' ry='8' fill=\"%238e5b43\"/><ellipse cx='58' cy='39' rx='6' ry='8' fill=\"%238e5b43\"/></svg>",
 // fox–tiger: orange paws
 "data:image/svg+xml;utf8,<svg width='70' height='70' viewBox='0 0 72 72'><ellipse cx='36' cy='52' rx='20' ry='13' fill=\"%23ffa516\"/><ellipse cx='21' cy='22' rx='10' ry='12' fill=\"%23ffa516\"/><ellipse cx='51' cy='22' rx='10' ry='12' fill=\"%23ffa516\"/><ellipse cx='14' cy='39' rx='6' ry='8' fill=\"%23ffa516\"/><ellipse cx='58' cy='39' rx='6' ry='8' fill=\"%23ffa516\"/></svg>",
 // high-tier: gold paws
 "data:image/svg+xml;utf8,<svg width='70' height='70' viewBox='0 0 72 72'><ellipse cx='36' cy='52' rx='20' ry='13' fill=\"%23ffd700\"/><ellipse cx='21' cy='22' rx='10' ry='12' fill=\"%23ffd700\"/><ellipse cx='51' cy='22' rx='10' ry='12' fill=\"%23ffd700\"/><ellipse cx='14' cy='39' rx='6' ry='8' fill=\"%23ffd700\"/><ellipse cx='58' cy='39' rx='6' ry='8' fill=\"%23ffd700\"/></svg>",
];

// Utility: Adjust SVG index to animal level
function getPawSVGIdx(animalIdx) {
    if(animalIdx<=4) return 0;
    if(animalIdx<=11) return 1;
    return 2;
}

// Game state
let score = 0;
let currentAnimal = 0; // index in upgrades
let boughtUpgrades = Array(upgrades.length).fill(false); boughtUpgrades[0]=true;
let boughtTools = Array(tools.length).fill(false);
let autoclick = 0;

const scoreSpan = document.getElementById("score"),
      clickBtn  = document.getElementById("click-btn"),
      pawImg    = document.getElementById("paw-img"),
      animalName= document.getElementById("animal-name"),
      upgradeList=document.getElementById("upgrade-list"),
      pointEffect=document.getElementById("point-effect"),
      toolList=document.getElementById("tool-list"),
      autoclickInfo=document.getElementById("autoclick-rate");

// Util: Pretty numbers
function formatBigNumber(n) {
    if(n>=1e9)  return (n/1e9).toFixed(2)+"B";
    if(n>=1e6)  return (n/1e6).toFixed(2)+"M";
    if(n>=1e3)  return (n/1e3).toFixed(1)+"K";
    return n;
}
function updateScore() {
    scoreSpan.textContent = formatBigNumber(score);
}
function updateAutoclick() {
    autoclickInfo.textContent = autoclick;
}
function showPopup(pawns) {
    // Floating point animation
    const popup = document.createElement("div");
    popup.className="point-popup";
    popup.textContent = "+"+formatBigNumber(pawns);
    pointEffect.appendChild(popup);
    setTimeout(()=>{ popup.remove(); }, 690);
}
function bouncePaw(){
    clickBtn.classList.add("paw-bounce");
    setTimeout(()=> clickBtn.classList.remove("paw-bounce"),155);
}
function flashPaw(){
    clickBtn.classList.add("paw-flash");
    setTimeout(()=> clickBtn.classList.remove("paw-flash"),450);
}
// Change current animal
function updateAnimal() {
    animalName.textContent = upgrades[currentAnimal].n;
    pawImg.src = pawSVGs[getPawSVGIdx(currentAnimal)];
    flashPaw();
}

// Render upgrades
function renderUpgrades() {
    upgradeList.innerHTML = "";
    upgrades.forEach((upg, idx)=>{
        const div = document.createElement("div");
        div.className="upgrade";
        // Single row
        div.innerHTML = `
          <div class="upgrade-data">
              <span class="animal-icon">${upg.e}</span>
              <span class="animal-name">${upg.n}</span>
              <span style="font-size:.94em;">${upg.desc}</span>
              <span style="color:#b57437; margin-left:.8em;">Cost: ${formatBigNumber(upg.c)}</span>

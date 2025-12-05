// Array of upgrades (animal, cost, paw strength), emojis used for icons, can be improved with SVGs for each if desired
const upgrades = [
    // name, description, cost, paw (per click), emoji or mini description (for selector icon/SVG ID choice)
    { name: "Kitten",     desc: "Tiny & cute! (1 per click)", cost: 0,   paw: 1,  emoji: "🐾" },
    { name: "Mouse",      desc: "Small, nibbling! (2 per click)", cost: 12,  paw: 2, emoji: "🐭" },
    { name: "Hamster",    desc: "Tiny cheeks, speedy paws. (3)", cost: 27,  paw: 3, emoji: "🐹" },
    { name: "Rabbit",     desc: "Quick hops, soft kicks. (4)", cost: 52, paw: 4,emoji: "🐰" },
    { name: "Puppy",      desc: "Playful tail-wags. (6)", cost: 90,  paw: 6, emoji: "🐶" },
    { name: "Chicken",    desc: "Feather flaps add strength! (8)", cost: 155, paw: 8, emoji: "🐔" },
    { name: "Cat",        desc: "Elegant, sharper claws! (11)", cost: 246, paw: 11, emoji: "🐱" },
    { name: "Raccoon",    desc: "Mischievous clever paws. (15)", cost: 350, paw: 15, emoji: "🦝" },
    { name: "Fox",        desc: "Quick & cunning. (20)", cost: 490, paw: 20, emoji: "🦊" },
    { name: "Wolf",       desc: "Softly stalks & strikes. (27)", cost: 690, paw: 27, emoji: "🐺" },
    { name: "Otter",      desc: "Speedy swimmers! (35)", cost: 900, paw: 35, emoji: "🦦" },
    { name: "Cheetah",    desc: "Lightning fast! (45)", cost: 1230, paw:45, emoji: "🐆" },
    { name: "Koala",      desc: "Slow but steady! (60)", cost: 1589, paw: 60, emoji: "🐨" },
    { name: "Badger",     desc: "Ferocious digger! (80)", cost: 2060, paw: 80, emoji: "🦡" },
    { name: "Crocodile",  desc: "Snappy heavy paw! (100)", cost: 2800, paw:100, emoji: "🐊" },
    { name: "Tiger",      desc: "Roaring strong. (140)", cost: 3700, paw:140, emoji: "🐯" },
    { name: "Lion",       desc: "Regal real power! (200)", cost: 4900, paw:200, emoji: "🦁" },
    { name: "Leopard",    desc: "Stealthy, massively strong. (260)", cost: 6300, paw: 260, emoji: "🐆" },
    { name: "Dog",        desc: "Best friend bonus! (340)", cost: 8200, paw: 340, emoji: "🐕" },
    { name: "Boar",       desc: "Tusks & strength together! (430)", cost: 10200, paw: 430, emoji: "🐗" },
    { name: "Horse",      desc: "Thundering hooves! (550)", cost: 13000, paw: 550, emoji: "🐎" },
    { name: "Moose",      desc: "Powerful, sturdy. (700)", cost: 17000, paw: 700, emoji: "🦌" },
    { name: "Bear",       desc: "Big beast of the forest! (900)", cost: 22000, paw: 900, emoji: "🐻" },
    { name: "Buffalo",    desc: "Heavy & unstoppable. (1100)", cost: 29000, paw:1100, emoji:"🐃" },
    { name: "Gorilla",    desc: "Mighty, crushes everything! (1400)", cost: 40000, paw:1400, emoji:"🦍" },
    { name: "Elephant",   desc: "Giant stomping foot! (1800)", cost: 56000, paw:1800,emoji:"🐘" },
    { name: "Rhino",      desc: "Horn & power combined! (2300)", cost: 72000, paw:2300,emoji:"🦏" },
    { name: "Hippopotamus",desc:"Strong jaws & powerful bulk! (3000)",cost:94000,paw:3000,emoji:"🦛"}
];

// One SVG for each animal tier (if you want extra challenge—there are lots!)
// This sample uses 6 strong-color SVG paws for intervals of upgrades; 
// Lower tiers = brown/grey, mid = gold/orange, top = ultra.
const pawSVGs = [
    "<svg width='70' height='70' viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'><ellipse cx='36' cy='52' rx='20' ry='13' fill='%238e5b43'/><ellipse cx='21' cy='22' rx='10' ry='12' fill='%238e5b43'/><ellipse cx='51' cy='22' rx='10' ry='12' fill='%238e5b43'/><ellipse cx='14' cy='39' rx='6' ry='8' fill='%238e5b43'/><ellipse cx='58' cy='39' rx='6' ry='8' fill='%238e5b43'/></svg>", // brown
    "<svg width='70' height='70' viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'><ellipse cx='36' cy='52' rx='20' ry='13' fill='%23a88e7d'/><ellipse cx='21' cy='22' rx='10' ry='12' fill='%23a88e7d'/><ellipse cx='51' cy='22' rx='10' ry='12' fill='%23a88e7d'/><ellipse cx='14' cy='39' rx='6' ry='8' fill='%23a88e7d'/><ellipse cx='58' cy='39' rx='6' ry='8' fill='%23a88e7d'/></svg>",  // grey
    "<svg width='70' height='70' viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'><ellipse cx='36' cy='52' rx='20' ry='13' fill='%23ea900e'/><ellipse cx='21' cy='22' rx='10' ry='12' fill='%23ea900e'/><ellipse cx='51' cy='22' rx='10' ry='12' fill='%23ea900e'/><ellipse cx='14' cy='39' rx='6' ry='8' fill='%23ea900e'/><ellipse cx='58' cy='39' rx='6' ry='8' fill='%23ea900e'/></svg>",  // orange
    "<svg width='70' height='70' viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'><ellipse cx='36' cy='52' rx='20' ry='13' fill='%23caba74'/><ellipse cx='21' cy='22' rx='10' ry='12' fill='%23caba74'/><ellipse cx='51' cy='22' rx='10' ry='12' fill='%23caba74'/><ellipse cx='14' cy='39' rx='6' ry='8' fill='%23caba74'/><ellipse cx='58' cy='39' rx='6' ry='8' fill='%23caba74'/></svg>", // gold
    "<svg width='70' height='70' viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'><ellipse cx='36' cy='52' rx='20' ry='13' fill='%23774114'/><ellipse cx='21' cy='22' rx='10' ry='12' fill='%23774114'/><ellipse cx='51' cy='22' rx='10' ry='12' fill='%23774114'/><ellipse cx='14' cy='39' rx='6' ry='8' fill='%23774114'/><ellipse cx='58' cy='39' rx='6' ry='8' fill='%23774114'/></svg>", // dark brown
    "<svg width='70' height='70' viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'><ellipse cx='36' cy='52' rx='20' ry='13' fill='%239468d1'/><ellipse cx='21' cy='22' rx='10' ry='12' fill='%239468d1'/><ellipse cx='51' cy='22' rx='10' ry='12' fill='%239468d1'/><ellipse cx='14' cy='39' rx='6' ry='8' fill='%239468d1'/><ellipse cx='58' cy='39' rx='6' ry='8' fill='%239468d1'/></svg>",  // purple for HIPPO!
];

function pawSVGIndex(currentIdx){
    // Divides total range into equal buckets — more deluxe SVG-system could directly assign per animal
    if (currentIdx >= 26) return 5;  // Hippo
    if (currentIdx >= 23) return 4;  // Bear, Buffalo, Gorilla, Elephant, Rhino
    if (currentIdx >= 16) return 3;  // Lion→Moose
    if (currentIdx >= 8 ) return 2;  // Fox→Otter→...
    if (currentIdx >= 3 ) return 1;  // Rabbit...Cat
    return 0;
}

let score = 0;
let currentAnimal = 0; // always unlocked
let boughtUpgrades = Array(upgrades.length).fill(false);
boughtUpgrades[0] = true;

const scoreSpan = document.getElementById("score");
const clickBtn = document.getElementById("click-btn");
const upgradeList = document.get


// Animals list as upgrades: name, description, cost, icon, and paw click power
const upgrades = [
    {
        name: "Cat",
        description: "Tiny but fast! (1 paw/Click)",
        cost: 0,
        paw: 1
    },
    {
        name: "Fox",
        description: "Quick and fox-smart! (2 paws/Click)",
        cost: 50,
        paw: 2
    },
    {
        name: "Lion",
        description: "Majestic mighty paws! (5 paws/Click)",
        cost: 200,
        paw: 5
    },
    {
        name: "Bear",
        description: "The ultimate heavyweight paw. (10 paws/Click)",
        cost: 800,
        paw: 10
    }
];

// Optionally, use different SVG paws based on the animal
const pawSVGs = [
    // Cat & Fox (brown paw)
    "<svg width='70' height='70' viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'><ellipse cx='36' cy='52' rx='20' ry='13' fill='%238e5b43'/><ellipse cx='21' cy='22' rx='10' ry='12' fill='%238e5b43'/><ellipse cx='51' cy='22' rx='10' ry='12' fill='%238e5b43'/><ellipse cx='14' cy='39' rx='6' ry='8' fill='%238e5b43'/><ellipse cx='58' cy='39' rx='6' ry='8' fill='%238e5b43'/></svg>",

    // Fox (orange paw)
    "<svg width='70' height='70' viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'><ellipse cx='36' cy='52' rx='20' ry='13' fill='%23e87a20'/><ellipse cx='21' cy='22' rx='10' ry='12' fill='%23e87a20'/><ellipse cx='51' cy='22' rx='10' ry='12' fill='%23e87a20'/><ellipse cx='14' cy='39' rx='6' ry='8' fill='%23e87a20'/><ellipse cx='58' cy='39' rx='6' ry='8' fill='%23e87a20'/></svg>",

    // Lion (gold)
    "<svg width='70' height='70' viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'><ellipse cx='36' cy='52' rx='20' ry='13' fill='%23ffa812'/><ellipse cx='21' cy='22' rx='10' ry='12' fill='%23ffa812'/><ellipse cx='51' cy='22' rx='10' ry='12' fill='%23ffa812'/><ellipse cx='14' cy='39' rx='6' ry='8' fill='%23ffa812'/><ellipse cx='58' cy='39' rx='6' ry='8' fill='%23ffa812'/></svg>",

    // Bear (dark brown)
    "<svg width='70' height='70' viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'><ellipse cx='36' cy='52' rx='20' ry='13' fill='%2358311e'/><ellipse cx='21' cy='22' rx='10' ry='12' fill='%2358311e'/><ellipse cx='51' cy='22' rx='10' ry='12' fill='%2358311e'/><ellipse cx='14' cy='39' rx='6' ry='8' fill='%2358311e'/><ellipse cx='58' cy='39' rx='6' ry='8' fill='%2358311e'/></svg>",
];

let score = 0;
let currentAnimal = 0; // Cat by default
let boughtUpgrades = [true, false, false, false];

const scoreSpan = document.getElementById("score");
const clickBtn = document.getElementById("click-btn");
const upgradeList = document.getElementById("upgrade-list");
const pawImg = document.getElementById("paw-img");
const animalName = document.getElementById("animal-name");

// Update score on the page
function updateScore() {
    scoreSpan.textContent = score;
}

// When click the paw - adds paw strength value to score
clickBtn.addEventListener("click", function() {
    score += upgrades[currentAnimal].paw;
    updateScore();
    updateUpgrades();
});

// Render all available animal upgrades as buttons
function createUpgradeUI() {
    upgradeList.innerHTML = "";
    upgrades.forEach((upg, idx) => {
        // First (Cat) is always "bought" and can't be upgraded to
        if (idx === 0) return;

        const upgradeDiv = document.createElement("div");
        upgradeDiv.className = "upgrade";
        upgradeDiv.innerHTML = `
            <div>
                <strong>${upg.name}</strong><br>
                <span style="font-size:0.93em">${upg.description}</span><br>
                <span style="color:#8e5b43">Cost: ${upg.cost}</span>
            </div>
        `;
        // Button: "Upgrade!" or "Current"
        const upgradeBtn = document.createElement("button");
        upgradeBtn.textContent = boughtUpgrades[idx]
            ? "Current"
            : "Upgrade!";
        upgradeBtn.disabled = boughtUpgrades[idx] || score < upg.cost;
        upgradeBtn.addEventListener("click", () => {
            if (score >= upg.cost && !boughtUpgrades[idx]) {
                score -= upg.cost;
                boughtUpgrades = boughtUpgrades.map((b, i) => i === idx); // Only one active
                currentAnimal = idx;
                updateAnimal();
                updateScore();
                updateUpgrades();
            }
        });

        upgradeDiv.appendChild(upgradeBtn);
        upgradeList.appendChild(upgradeDiv);
    });
}

// Show which animal/paw is used now (also updates paw image)
function updateAnimal() {
    animalName.textContent = upgrades[currentAnimal].name;
    pawImg.src =
        "data:image/svg+xml;utf8," +
        encodeURIComponent(pawSVGs[currentAnimal]);
    // Visually bump
    pawImg.style.transition = "none";
    pawImg.style.transform = "scale(1.12)";
    setTimeout(() => {
        pawImg.style.transition = "transform .2s";
        pawImg.style.transform = "scale(1)";
    }, 130);
}

// Refresh upgrades UI
function updateUpgrades() {
    createUpgradeUI();
}

// Initial draw:
updateScore();
updateAnimal();
createUpgradeUI();

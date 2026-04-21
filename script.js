// Official ARC Raiders Weapons with Direct Wiki Image Links
const guns = [
    { name: "Ferro", rarity: "common", cost: 1, image: "./resources/gun-thumbnails/Ferro.png" },
    { name: "Stitcher", rarity: "common", cost: 1, image: "./resources/gun-thumbnails/Stitcher.png" },
    { name: "Anvil", rarity: "uncommon", cost: 1, image: "./resources/gun-thumbnails/Anvil.png" },
    { name: "Il Toro", rarity: "uncommon", cost: 2, image: "./resources/gun-thumbnails/Il_Toro.png" },
    { name: "Renegade", rarity: "rare", cost: 2, image: "./resources/gun-thumbnails/Renegade.png" },
    { name: "Canto", rarity: "rare", cost: 2, image: "./resources/gun-thumbnails/Canto.png" },
    { name: "Venator", rarity: "rare", cost: 2, image: "./resources/gun-thumbnails/Venator.png" },
    { name: "Torrente", rarity: "rare", cost: 2, image: "./resources/gun-thumbnails/Torrente.png" },
    { name: "Vulcano", rarity: "epic", cost: 3, image: "./resources/gun-thumbnails/Vulcano.png" },
    { name: "Tempest", rarity: "epic", cost: 3, image: "./resources/gun-thumbnails/Tempest.png" },
    { name: "Hullcracker", rarity: "epic", cost: 3, image: "./resources/gun-thumbnails/Hullcracker.png" },
    { name: "Dolabra", rarity: "legendary", cost: 4, image: "./resources/gun-thumbnails/Dolabra.png" },
    { name: "Equalizer", rarity: "legendary", cost: 4, image: "./resources/gun-thumbnails/Equalizer.png" },
    { name: "Jupiter", rarity: "legendary", cost: 4, image: "./resources/gun-thumbnails/Jupiter.png" }
];

// Item categories use standard icons if specific ones are missing
const augmentIcon = "https://arcraiders.wiki/images/thumb/7/7e/Icon_Augment.png/120px-Icon_Augment.png";

const augments = [
    { name: "Tactical Mk.1", cost: 1, supports: ["Light", "Medium"], image: augmentIcon },
    { name: "Looting Mk.2", cost: 2, supports: ["Light"], image: augmentIcon },
    { name: "Combat Mk.2", cost: 2, supports: ["Light", "Medium", "Heavy"], image: augmentIcon },
    { name: "Looting Mk.3 (Survivor)", cost: 3, supports: ["Light", "Medium"], image: augmentIcon },
    { name: "Combat Mk.3 (Aggressive)", cost: 3, supports: ["Light", "Medium", "Heavy"], image: augmentIcon }
];

const shields = [
    { name: "Light Shield", cost: 1, image: "https://arcraiders.wiki/images/b/bc/Light_Shield.png" },
    { name: "Medium Shield", cost: 2, image: "https://arcraiders.wiki/images/4/4c/Medium_Shield.png" },
    { name: "Heavy Shield", cost: 3, image: "https://arcraiders.wiki/images/e/ef/Heavy_Shield.png" }
];

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateLoadout() {
    const rarityFilters = Array.from(
        document.querySelectorAll('input[type="checkbox"]:checked')
    ).map(cb => cb.value);

    let filteredGuns = guns.filter(g => rarityFilters.includes(g.rarity));
    if (filteredGuns.length === 0) filteredGuns = guns;

    const costInput = document.getElementById("costLimit").value;
    const costLimit = costInput ? parseInt(costInput) : 99;
    
    let gun, augment, shield;
    let valid = false;
    let attempts = 0;

    while (!valid && attempts < 100) {
        gun = random(filteredGuns);
        augment = random(augments);
        shield = random(shields);

        const isCompatible = augment.supports.includes(shield.name.split(' ')[0]);
        const totalCost = gun.cost + augment.cost + shield.cost;

        if (isCompatible && totalCost <= costLimit) {
            valid = true;
        }
        attempts++;
    }

    displayLoadout(gun, augment, shield);
}

function hardcoreRun() {
    const gun = random(guns);
    const augment = random(augments);
    const shield = random(shields);
    displayLoadout(gun, augment, shield);
}

function displayLoadout(gun, augment, shield) {
    // Weapon Display
    const gunEl = document.getElementById("gun");
    gunEl.innerHTML = `<img src="${gun.image}" class="item-img" onerror="this.src='https://via.placeholder.com/120x60?text=Gun'"> <br> ${gun.name} (${gun.rarity.toUpperCase()})`;
    gunEl.className = `rarity-${gun.rarity}`;

    // Augment Display
    document.getElementById("augment").innerHTML = `<img src="${augment.image}" class="item-img"> <br> ${augment.name}`;
    
    // Shield Display
    document.getElementById("shield").innerHTML = `<img src="${shield.image}" class="item-img"> <br> ${shield.name}`;
    
    updateShareLink(gun, augment, shield);
}

let shareURL = "";
function updateShareLink(g, a, s) {
    shareURL = `${window.location.origin}${window.location.pathname}?gun=${encodeURIComponent(g.name)}&augment=${encodeURIComponent(a.name)}&shield=${encodeURIComponent(s.name)}`;
}

function copyShareLink() {
    if (!shareURL) { alert("Generate a loadout first!"); return; }
    navigator.clipboard.writeText(shareURL);
    alert("Share link copied!");
}

window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    if (params.get("gun")) {
        // Simple logic to find and display items from URL if needed
        document.getElementById("gun").innerText = params.get("gun");
        document.getElementById("augment").innerText = params.get("augment");
        document.getElementById("shield").innerText = params.get("shield");
    }
};
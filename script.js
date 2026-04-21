// Official ARC Raiders Weapons with Direct Wiki Image Links
// Updated ARC Raiders Loadout Logic with Local Image Paths
const guns = [
    { name: "Ferro", rarity: "common", cost: 1, image: "./resources/gun-thumbnails/Ferro.png" },
    { name: "Stitcher", rarity: "common", cost: 1, image: "./resources/gun-thumbnails/Stitcher.png" },
    { name: "Kettle", rarity: "common", cost: 1, image: "./resources/gun-thumbnails/Kettle.png" },
    { name: "Rattler", rarity: "common", cost: 1, image: "./resources/gun-thumbnails/Rattler.png" },
    { name: "Hairpin", rarity: "common", cost: 1, image: "./resources/gun-thumbnails/Hairpin.png" },
    { name: "Anvil", rarity: "uncommon", cost: 1, image: "./resources/gun-thumbnails/Anvil.png" },
    { name: "Il Toro", rarity: "uncommon", cost: 2, image: "./resources/gun-thumbnails/Il_Toro.png" },
    { name: "Arpeggio", rarity: "uncommon", cost: 2, image: "./resources/gun-thumbnails/Arpeggio.png" },
    { name: "Burletta", rarity: "rare", cost: 2, image: "./resources/gun-thumbnails/Burletta.png" },
    { name: "Renegade", rarity: "rare", cost: 2, image: "./resources/gun-thumbnails/Renegade.png" },
    { name: "Canto", rarity: "rare", cost: 2, image: "./resources/gun-thumbnails/Canto.png" },
    { name: "Venator", rarity: "rare", cost: 2, image: "./resources/gun-thumbnails/Venator.png" },
    { name: "Torrente", rarity: "rare", cost: 2, image: "./resources/gun-thumbnails/Torrente.png" },
    { name: "Osprey", rarity: "rare", cost: 2, image: "./resources/gun-thumbnails/Osprey.png" },
    { name: "Vulcano", rarity: "epic", cost: 3, image: "./resources/gun-thumbnails/Vulcano.png" },
    { name: "Tempest", rarity: "epic", cost: 3, image: "./resources/gun-thumbnails/Tempest.png" },
    { name: "Hullcracker", rarity: "epic", cost: 3, image: "./resources/gun-thumbnails/Hullcracker.png" },
    { name: "Dolabra", rarity: "legendary", cost: 4, image: "./resources/gun-thumbnails/Dolabra.png" },
    { name: "Equalizer", rarity: "legendary", cost: 4, image: "./resources/gun-thumbnails/Equalizer.png" },
    { name: "Jupiter", rarity: "legendary", cost: 4, image: "./resources/gun-thumbnails/Jupiter.png" }
];

// Assuming similar local paths for augments and shields
const augmentIcon = "./resources/augment-thumbnails/Icon_Augment.png";

const augments = [
    { name: "Tactical Mk.1", cost: 1, supports: ["Light", "Medium"], image: augmentIcon },
    { name: "Looting Mk.2", cost: 2, supports: ["Light"], image: augmentIcon },
    { name: "Combat Mk.2", cost: 2, supports: ["Light", "Medium", "Heavy"], image: augmentIcon },
    { name: "Looting Mk.3 (Survivor)", cost: 3, supports: ["Light", "Medium"], image: augmentIcon },
    { name: "Combat Mk.3 (Aggressive)", cost: 3, supports: ["Light", "Medium", "Heavy"], image: augmentIcon }
];

const shields = [
    { name: "Light Shield", cost: 1, image: "./resources/shield-thumbnails/Light_Shield.png" },
    { name: "Medium Shield", cost: 2, image: "./resources/shield-thumbnails/Medium_Shield.png" },
    { name: "Heavy Shield", cost: 3, image: "./resources/shield-thumbnails/Heavy_Shield.png" }
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
    gunEl.innerHTML = `<img src="${gun.image}" class="item-img" onerror="console.error('Failed to load image:', '${gun.image}')"> <br> ${gun.name} (${gun.rarity.toUpperCase()})`;
    gunEl.className = `rarity-${gun.rarity}`;

    // Augment Display
    document.getElementById("augment").innerHTML = `<img src="${augment.image}" class="item-img" onerror="console.error('Failed to load image:', '${augment.image}')"> <br> ${augment.name}`;
    
    // Shield Display
    document.getElementById("shield").innerHTML = `<img src="${shield.image}" class="item-img" onerror="console.error('Failed to load image:', '${shield.image}')"> <br> ${shield.name}`;
    
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
        const gunName = params.get("gun");
        const augName = params.get("augment");
        const shldName = params.get("shield");
        
        // Find actual objects to get images
        const gun = guns.find(g => g.name === gunName) || {name: gunName, image: "", rarity: "common"};
        const aug = augments.find(a => a.name === augName) || {name: augName, image: ""};
        const shld = shields.find(s => s.name === shldName) || {name: shldName, image: ""};
        
        displayLoadout(gun, aug, shld);
    }
};
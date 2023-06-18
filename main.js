var plantedRice = 0
var grownRice = 0
var rice = 100

var plantUpgrade = {
    price: 10,
    bought: 0
}
var growUpgrade = {
    price: 10,
    bought: 0
}
var harvestUpgrade = {
    price: 10,
    bought: 0
}

var workers = {
    planter: {
        price: 100,
        hired: 0
    },
    grower: {
        price: 100,
        hired: 0
    },
    harvester: {
        price: 100,
        hired: 0
    },
    
}

var plantPerClick = 1
var growPerClick = 1
var ricePerClick = 1

var plantBtnInfo = `<h2>Plant</h2><p>Plants ${plantPerClick} rices</p>`
var growBtnInfo = `<h2>Grow</h2><p>Grows ${growPerClick} rices</p>`
var harvestBtnInfo = `<h2>Harvest</h2><p>Harvests ${ricePerClick} rices</p>`

var planterInfo = `<h2>Planter</h2><p>Price: ${format(plantUpgrade.price)}</p><p>x2 Planted rice per click</p><p>Bought: ${plantUpgrade.bought}</p>`
var growerInfo = `<h2>Grower</h2><p>Price: ${format(growUpgrade.price)}</p><p>x2 Grown rice per click</p><p>Bought: ${growUpgrade.bought}</p>`
var harvesterInfo = `<h2>Harvester</h2><p>Price: ${format(harvestUpgrade.price)}</p><p>x2 rice per click</p><p>Bought: ${harvestUpgrade.bought}</p>`

var planterWorkerInfo = `<h2>Hire Planter</h2><p>Price: ${format(workers.planter.price)}</p><p>Plants automatically</p><p>Hired: ${format(workers.planter.hired)}</p><p>Producing: ${format(plantPerClick*workers.planter.hired)}/s</p>`
/*var growerInfo = `<h2>Grower</h2><p>Price: ${format(growUpgrade.price)}</p><p>x2 Grown rice per click</p><p>Bought: ${growUpgrade.bought}</p>`
var harvesterInfo = `<h2>Harvester</h2><p>Price: ${format(harvestUpgrade.price)}</p><p>x2 rice per click</p><p>Bought: ${harvestUpgrade.bought}</p>`
*/

updateInfo()
var lastUpdate = Date.now()

function plant() {
    plantedRice += plantPerClick
    updateCurrency()
}

function grow() {
    if (plantedRice > 0) {
        if (plantedRice < growPerClick) {
            grownRice += plantedRice
            plantedRice = 0
        }
        else {
            grownRice += growPerClick
            plantedRice -= growPerClick
        }
        updateCurrency()
    }
}

function harvest() {
    if (grownRice > 0) {
        if (grownRice < ricePerClick) {
            rice += grownRice
            grownRice = 0
        }
        else {
            rice += ricePerClick
            grownRice -= ricePerClick
        }
        updateCurrency()
    }
}

function upgradePlanter() {
    if (rice >= plantUpgrade.price) {
        rice -= plantUpgrade.price
        plantPerClick += plantPerClick
        plantUpgrade.price = plantUpgrade.price * 10
        plantUpgrade.bought++
        updateInfo()
    }
}

function upgradeGrower() {
    if (rice >= growUpgrade.price) {
        rice -= growUpgrade.price
        growPerClick += growPerClick
        growUpgrade.price = growUpgrade.price * 10
        growUpgrade.bought++
        updateInfo()
    }
}

function upgradeHarvester() {
    if (rice >= harvestUpgrade.price) {
        rice -= harvestUpgrade.price
        ricePerClick += ricePerClick
        harvestUpgrade.price = harvestUpgrade.price * 10
        harvestUpgrade.bought++
        updateInfo()
    }
}

function hirePlanter() {
    if (rice >= workers.planter.price) {
        rice -= workers.planter.price
        workers.planter.hired++
        workers.planter.price = workers.planter.price * 7.75
        updateInfo()
        updateCurrency()
    }
}

function showInfo(btn, infoText) {
    let btnInfo = document.getElementById(btn)
    btnInfo.onmouseenter = () => {
        document.getElementById('info-box').innerHTML = infoText
    }
    btnInfo.onmouseleave = () => {
        document.getElementById('info-box').innerHTML = ''
    }
}

function format(num) {
    let power = Math.floor(Math.log10(num))
    let mantissa = num * Math.pow(10, power)
    if (power < 3) return num.toFixed(2)
    return mantissa.toFixed(2) + 'e' + power
}

function updateInfo() {
    document.getElementById('info-box').innerHTML = ''
    plantBtnInfo = `<h2>Plant</h2><p>Plants ${format(plantPerClick)} rices</p>`
    harvestBtnInfo = `<h2>Harvest</h2><p>Harvests ${format(ricePerClick)} rices</p>`
    growBtnInfo = `<h2>Grow</h2><p>Grows ${format(growPerClick)} rices</p>`
    planterInfo = `<h2>Planter</h2><p>Price: ${format(plantUpgrade.price)}</p><p>x2 Planted rice per click</p><p>Bought: ${plantUpgrade.bought}</p>`
    growerInfo = `<h2>Grower</h2><p>Price: ${format(growUpgrade.price)}</p><p>x2 Grown rice per click</p><p>Bought: ${growUpgrade.bought}</p>`
    harvesterInfo = `<h2>Harvester</h2><p>Price: ${format(harvestUpgrade.price)}</p><p>x2 rice per click</p><p>Bought: ${harvestUpgrade.bought}</p>`
    planterWorkerInfo = `<h2>Hire Planter</h2><p>Price: ${format(workers.planter.price)}</p><p>Plants automatically</p><p>Hired: ${format(workers.planter.hired)}</p><p>Producing: ${format(plantPerClick*workers.planter.hired)}/s</p>`
    showInfo('planterup', planterInfo)
    showInfo('growerup', growerInfo)
    showInfo('harvesterup', harvesterInfo)
    showInfo('plant', plantBtnInfo)
    showInfo('grow', growBtnInfo)
    showInfo('harvest', harvestBtnInfo)
    showInfo('planterworker', planterWorkerInfo)
}

function updateCurrency() {
    let plantedText = `Planted: ${format(plantedRice)}`
    document.getElementById('rice').innerHTML = 'Rice: ' + format(rice)
    document.getElementById('grown').innerHTML = 'Grown: ' + format(grownRice)
    document.getElementById('planted').innerHTML = plantedText
}

function productionLoop(diff) {
    plantedRice += plantPerClick * workers.planter.hired * diff
}

function mainLoop() {
    var diff = (Date.now() - lastUpdate) / 1000

    productionLoop(diff)
    updateCurrency()

    lastUpdate = Date.now()
}

setInterval(mainLoop, 50)

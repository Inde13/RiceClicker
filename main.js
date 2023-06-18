var plantedRice = 0
var grownRice = 0
var rice = 0

var plantPerClick = 1
var growPerClick = 1
var ricePerClick = 1

var plantUpgradePrice = 10
var growUpgradePrice = 10
var riceUpgradePrice = 10

var planterInfo = `<h2>Planter</h2><p>Price: ${format(plantUpgradePrice)}</p><p>x2 Planted rice per click</p>`
var growerInfo = `<h2>Grower</h2><p>Price: ${format(growUpgradePrice)}</p><p>x2 Grown rice per click</p>`
var harvesterInfo = `<h2>Harvester</h2><p>Price: ${format(riceUpgradePrice)}</p><p>x2 rice per click</p>`

showInfo('planterup', planterInfo)
showInfo('growerup', growerInfo)
showInfo('harvesterup', harvesterInfo)

function plant() {
    plantedRice += plantPerClick
    update()
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
        update()
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
        update()
    }
}

function upgradePlanter() {
    if (rice >= plantUpgradePrice) {
        rice -= plantUpgradePrice
        plantPerClick += plantPerClick
        plantUpgradePrice = plantUpgradePrice * 10
        update()
    }
}

function upgradeGrower() {
    if (rice >= growUpgradePrice) {
        rice -= growUpgradePrice
        growPerClick += growPerClick
        growUpgradePrice = growUpgradePrice * 10
        update()
    }
}

function upgradeHarvester() {
    if (rice >= riceUpgradePrice) {
        rice -= riceUpgradePrice
        ricePerClick += ricePerClick
        riceUpgradePrice = riceUpgradePrice * 10
        update()
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

function update() {
    document.getElementById('info-box').innerHTML = ''
    planterInfo = `<h2>Planter</h2><p>Price: ${plantUpgradePrice}</p>`
    growerInfo = `<h2>Grower</h2><p>Price: ${growUpgradePrice}</p>`
    harvesterInfo = `<h2>Harvester</h2><p>Price: ${riceUpgradePrice}</p>`
    showInfo('planterup', planterInfo)
    showInfo('growerup', growerInfo)
    showInfo('harvesterup', harvesterInfo)
    document.getElementById('rice').innerHTML = 'Rice: ' + format(rice)
    document.getElementById('grown').innerHTML = 'Grown: ' + format(grownRice)
    document.getElementById('planted').innerHTML = 'Planted: ' + format(plantedRice)
}

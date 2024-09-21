const ChargedUPGS = {
    canBuy(x) {
        let u = this.upgs[x]
        let res = player.mass
        return res.gte(u.cost) && (!hascUpg(x))
    },
    buyUpg(x) {
        if (hascUpg(i)) return;
        if (this.canBuy(x)) {
            let u = this.upgs[x]
            player.charged.upgs.push(x)
        }
    },
    unl() {
        let x = E(1)
        return x
    },
    upgs: [
    
        {
            desc: `Boost object weight based on object amount, but also increase lifting time.`,
            cost: E(356000/1e21),
            row:1,
            eff() {
                let x = E(1)
                let y = E(1)
                x=(BUILDINGS.eff("mass_5").add(1)).log2().pow(1.25).max(1)
                y=x.max(1).div(3).pow(1.15).max(1)
                return {eff:x,eff2:y}
            },
            effDesc() {return `<br><span style="color:green">Boosts object weight by `+formatMult(this.eff().eff)+`<br><span style="color:red">Increases lifting time by `+formatMult(this.eff().eff2)}
        },
        {
            desc: `Decrease lifting time based on object weight, but also increase exp requirement for next lvl.`,
            row:1,
            eff() {
                let x = E(1)
                let y = E(1)
                x=tmp.massGain.root(35)
                y=x.max(1).mul(3).pow(1.15).max(1)
                return {eff:x,eff2:y}
            },
            effDesc() {return `<br><span style="color:green">Decrease lifting time by `+formatMult(this.eff().eff)+`<br><span style="color:red">Increases exp requirement for next lvl by `+formatMult(this.eff().eff2)},
            cost: E(1.75e6/1e21),
        },
        {
            desc: `Each Fragment will boost each other.`,
            row:1,
            cost: E(3.62e11/1e21),
        },
        {
            desc: `[ct1] is much more better.`,
            row:1,
            cost: E(2.35e14/1e21),
        },
        {
            desc: `Unlock Last Modificators.`,
            row:2,
            cost: E(7.1e18/1e21),
        },
        {
            desc: `Reduce C17's goal.`,
            row:2,
            cost: E(1),
        },
    ],
    }
    function setupCUPGHTML() {
        let table = new Element('cUpgs_table')
        let h = ``
    
        for (let i in ChargedUPGS.upgs) {
            let c = ChargedUPGS.upgs[i]
    
            h += `
            <button onclick="ChargedUPGS.buyUpg(${i})" class="btn full cUpg" id="cUpg${i}_div" style="font-size: 11px;">
                <h4>[Upgrade ${c.row+(E(i).add(1))}]</h4><br>
                <span id="cUpg${i}_desc">${c.desc}</span><br>
                <span id="cUpg${i}_cost"></span>
            </button>
            `
        }
        table.setHTML(h)
    }
    function hascUpg(i) { return player.charged.upgs.includes(i) }
    function cUpgEff(i) { return ChargedUPGS.upgs[i].eff()}
    function updateCUPGHTML() {
        
        for (let i in ChargedUPGS.upgs) {
            i = parseInt(i)
        let unl=ChargedUPGS.unl()
        let c = ChargedUPGS.upgs[i], id = `cUpg${i}`
        tmp.el[id+"_div"].setDisplay(i<unl)
        tmp.el[id+"_cost"].setDisplay(!hascUpg(i))
        tmp.el[id+"_cost"].setHTML(`<br>Cost: <b>`+formatMass(c.cost)+`</b>.`)
        tmp.el[id+"_desc"].setHTML(`${c.desc}`+`${c.effDesc?c.effDesc():""}`)
    
        tmp.el[id+"_div"].setClasses({btn: true, full: true, cUpg: true, locked:  player.mass.lt(c.cost) && !hascUpg(i), bought: hascUpg(i)})
    }
    }
    
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
        if (hascUpg(0)) x=x.add(2)
        return x
    },
    upgs: [
    
        {
            desc: `Boost object weight and strengthen Overcount power based on object amount, but also increase lifting time.`,
            cost: E(356000/1e21),
            row:1,
            eff() {
                let x = E(1)
                let y = E(1)
                x=(BUILDINGS.eff("mass_5").add(1)).log2().pow(1.25).add(1)
                y=x.max(1).div(3).pow(0.15).add(1)
                return {eff:x,eff2:y}
            },
            effDesc() {return `<br><span style="color:green">Boosts object weight by `+formatMult(this.eff().eff)+`<br><span style="color:red">Increases lifting time by `+formatMult(this.eff().eff2)}
        },
        {
            desc: `Decrease lifting time and boost Rank 2 eff. increase based on object weight, but also increase exp requirement for next lvl.`,
            row:1,
            eff() {
                let x = E(1)
                let y = E(1)
                let x2= E(0)
                x=E(tmp.massGain).root(30).mul(5).add(1)
                x2=E(tmp.massGain).root(20).mul(15)
                y=x.add(1).root(2.55).div(10).add(1)
                return {eff:x,eff2:y,eff3:x2}
            },
            effDesc() {return `<br><span style="color:green">Decrease lifting time by `+formatMult(this.eff().eff)+`, add +` +format(this.eff().eff3)+` to Rank 2 effect increase.</span>`+`<br><span style="color:red">Increases exp requirement for next lvl by `+formatMult(this.eff().eff2)},
            cost: E(1.75e6/1e21),
        },
        {
            desc: `Per 2 Stronger add free Overcount level as multiplier.`,
            eff() {
                let x = E(1)
                x=E(player.build.mass_3.amt).div(2).floor()
                return {eff:x}
            },
            effDesc() {return `<br><span style="color:green">Add +`+format(this.eff().eff)+` to Overcount levels</span>`},
            row:1,
            cost: E(1.576e10/1e21),
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
                <span id="cUpg${i}_desc">${c.desc}</span>
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
    
        tmp.el[id+"_div"].setClasses({btn: true, cUpg: true, locked:  player.mass.lt(c.cost) && !hascUpg(i), bought: hascUpg(i)})
    }
    }
    
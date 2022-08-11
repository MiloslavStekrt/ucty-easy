import './App.css';
import {useState, useEffect} from "react";
import Add from "./Add.js";
import Opt from "./Opt.js";
import Ucet from "./ucet.js";

function App() {
    const [selected, setSelected] = useState(0);
    const [operations, setOperations] = useState(JSON.parse(window.localStorage.getItem("opt")) || [ ]);
    const [history, setHistory] = useState(JSON.parse(window.localStorage.getItem("history")) || [ ]);
    const [thema, setThema] = useState(window.localStorage.getItem("thema") == 0 ? false : true);

    function formatMoney(number) {
        let ans = "";
        var edit_number = String(parseInt(number));

        for (let i=edit_number.length; i>0; i-=3) {
            ans = edit_number.substring(i-3, i) + "\u00a0" + ans;
        }
        return ans.trim();
    }
    const upload = () => {
        return "UPloading"
    }

    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        console.log("Update that");
        window.localStorage.setItem("opt", JSON.stringify(operations));
    }, [operations, history]);
    useEffect(() => {
        console.log(history);
        window.localStorage.setItem("history", JSON.stringify(history));
    }, [history]);

    useEffect(() => {
        let accounts_set = [];
        for (let i=0; i<operations.length; i++) {
            let isThere = [false, false];
            for (let j=0; j<accounts_set.length; j++) {
                if (accounts_set[j].name == operations[i].md) {
                    if (accounts_set[j].md)
                        accounts_set[j].md.push({i: i+1, cost: operations[i].cost})
                    else accounts_set[j].md = [{i: i+1, cost: operations[i].cost}]
                    isThere[0] = true;
                }
                if (accounts_set[j].name == operations[i].d) {
                    if (accounts_set[j].d)
                        accounts_set[j].d.push({i: i+1, cost: operations[i].cost})
                    else accounts_set[j].d = [{i: i+1, cost: operations[i].cost}]
                    isThere[1] = true;
                }
            }
            if (!isThere[0] && !isThere[1] && (operations[i].md == operations[i].d)) {
                let account = {name: 0, md: [], d: []};
                if (!isThere[0]) {
                    account.name = operations[i].md;
                    account.md.push({i: i+1, cost: operations[i].cost})
                    account.d.push({i: i+1, cost: operations[i].cost})
                }
                accounts_set.push(account);
            } else {
                if (!isThere[0]) {
                    let account = { name: operations[i].md,
                        md: [{i: i+1, cost: operations[i].cost}], d: []};
                    accounts_set.push(account);
                }
                if (!isThere[1]){
                    let account = {name: operations[i].d, md: [],
                        d: [{i: i+1, cost: operations[i].cost}]};
                    accounts_set.push(account);
                }
            }
            if (!isThere[0] && !isThere[1]) {
            } else if (!isThere[0] || !isThere[1]) { }
        }
        setAccounts(accounts_set)
    }, [operations, selected])
    useEffect(() => {
        window.localStorage.setItem("thema", thema ? "1": "0");
    }, [thema]);
    useEffect(() => {
        if (selected >= operations.length+1) setSelected(0);
    }, [selected, operations])
    function opt_clear() {
        setOperations([])
        setHistory([])
    }
    function back() {
        let opt = history[history.length-1]
        if (history.length < 1) return;
        switch (opt[0]) {
            case "add":
                setOperations([...operations.filter((opt, id) => id != operations.length-1)]); break;
            case "del":
                let opts = operations;
                let first = [];
                let second = [];

                opts.map((o, i) => {
                    if (i >= opt[1].id) second.push(o);
                    else first.push(o);
                })
                first.push({cost: opt[1].cost, md: opt[1].md, d: opt[1].d});
                setOperations(first.concat(second))
                break;
            case "edit":
                setOperations([
                    ...operations.filter((x, i) => i != opt[1].id), 
                    {cost: opt[1].cost, md: opt[1].md, d: opt[1].d}
                ])
            default:
                console.log("not same? \n", opt);
        }
        setHistory([...history.filter((h,i) => i != history.length-1)]);
    }

    return (
        <div className={thema ? "body" : "body-dark"}>
            <section className={thema ? "rozvaha": "rozvaha white"}>
                <h1>
                    Operace:
                    {/*<remove>{window.location.href.split(".app/")[1] || <button className={thema ? "" : "white-btn"} onclick={upload}>Upload</button> }</remove>*/}
                    <button className={thema ? "" : "white-btn"} onClick={() => {setThema(!thema)}}>
                        {thema ? "Dark" : "light"}
                    </button>
                    <button onClick={back}>← zpet</button>
                    <button onClick={opt_clear}>Vycistit</button>
                </h1>
                <table className='show'>
                    <tbody>
                        <tr className="nav vr-b">
                            <td>N</td><td></td> <td>Cena</td> <td>MD</td> <td>D</td>
                        </tr>
                        { operations.map((opt, i) => 
                            <Opt opt={opt} i={i}
                                operations={operations} setSelect={setSelected} h={history} sh={setHistory}
                                setOperation={setOperations} sel={selected} thema={thema} money={formatMoney} />
                        )}
                    </tbody>
                </table>
                <Add money={formatMoney} setState={setOperations} state={operations} thema={thema} h={history} sh={setHistory}
                    operations={operations} selected={selected} setOperations={setOperations} setSelected={setSelected}/>
            </section>
            <section className="disk-box">
                {accounts.map(acc => <Ucet money={formatMoney} acc={acc} sel={selected} thema={thema}/>)}
            </section>
        </div>
    );
}

export default App;

import './App.css';
import {useState, useEffect} from "react";
import Add from "./Add.js";
import Opt from "./Opt.js";
import Ucet from "./ucet.js";
import { collection, addDoc } from "firebase/firestore";

function App() {
    const [selected, setSelected] = useState(0);
    const [edit, setEdit] = useState({cost: 0, md: 0, d: 0});
    const [operations, setOperations] = useState(JSON.parse(window.localStorage.getItem("opt")) || [ ]);
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
    }, [operations]);

    useEffect(() => { setEdit(operations[selected]) }, [selected]);

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
                console.log("Their are the same", operations[i])
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
            } else if (!isThere[0] || !isThere[1]) {
            }
            console.log(isThere);
        }
        console.log(accounts_set);
        setAccounts(accounts_set)
    }, [operations])
    useEffect(() => {
        window.localStorage.setItem("thema", thema ? "1": "0");
    }, [thema]);

    return (
        <div className={thema ? "body" : "body-dark"}>
            <section className={thema ? "rozvaha": "rozvaha white"}>
                <h1>
                    Operace:
                    <remove>{window.location.href.split(".app/")[1] || <button className={thema ? "" : "white-btn"} onclick={upload}>Upload</button> }</remove>
                    <button className={thema ? "" : "white-btn"} onClick={() => {setThema(!thema)}}>
                        {thema ? "Dark" : "light"}
                    </button>
                </h1>
                <div className="nav vr-b">
                    <p>N</p> <p>Cena</p> <p>MD</p> <p>D</p>
                </div>
                <div className="show">
                    { operations.map((opt, i) => <Opt opt={opt} i={i}
                        operations={operations} setSelect={setSelected}
                        setOperation={setOperations} sel={selected} thema={thema} />) }
                </div>
                <Add money={formatMoney} setState={setOperations} state={operations} thema={thema}/>
            </section>
            <section className="disk-box">
                {accounts.map(acc => <Ucet money={formatMoney} acc={acc} sel={selected} thema={thema}/>)}
            </section>
        </div>
    );
}

export default App;

import {useState, useEffect} from "react";
import DataList from "./datalist.js";


function Add({setState, state, money, thema, operations, selected, setSelected, setOperations, sh, h}) {
    const [value, setValue] = useState({cost: "", md: "", d: ""});
    const [cost, setCost] = useState("");
    const [edit, setEdit] = useState(false);
    const DEF ={cost: "", md: "", d: ""};
    // 0,0 => no dph
    // 1,0 => MD
    // 0,1 => D
    const [DPH, setDPH] = useState([false, false]); 

    useEffect(() => {
        setCost(money(value.cost))
    }, [value]);
    useEffect(scrollDown, [state]);
    useEffect(() => {
        if (selected == 0) {
            setValue(DEF);
            setEdit(false);
            return
        } 
        setEdit(true);
        setValue(operations[selected-1]);
    }, [selected]);

    function add() {
        if (edit) {
            let opts = operations;
            sh([...h, ["edit", {...opts[selected-1], id: selected-1}]]);
            opts[selected-1] = value;

            setOperations(opts);
            setSelected(0);
            return;
        } 
        let opts = [{
            cost: parseFloat(value.cost),
            md: value.md,
            d: value.d
        }];
        if (DPH[0]) {
            let x = {
                cost: parseInt(value.cost * 0.21),
                md: "343",
                d: value.d
            };
            opts.push(x)
            sh([...h, ["add", value], ["add", x]]);
        } else if (DPH[1]) {
            let x = {
                cost: parseInt(value.cost * 0.21),
                md: value.md,
                d: "343"
            }
            opts.push(x)
            sh([...h, ["add", value], ["add", x]]);
        }
        setState([...state, ...opts])

        setValue({cost: "", md: "", d: ""});
        setDPH(false, false)
    }
    function scrollDown() {
        let s = document.getElementsByClassName("show")[0];
        s.scrollTo(0, s.scrollHeight);
    }
    function changeMD(e) {
        const emp = String.fromCharCode("8291");
        if (e.target.value.length == 3) {
            if (String(value.md).includes(emp)) 
                setValue({cost: value.cost, md: parseInt(e.target.value/10), d: value.d})
            else setValue({cost: value.cost, md: e.target.value+emp, d: value.d})
        } else setValue({cost: value.cost, md: e.target.value, d: value.d})
    }
    function changeD(e) {
        const emp = String.fromCharCode("8291");
        if (e.target.value.length == 3) {
            if (String(value.d).includes(emp)) 
                setValue({cost: value.cost, d: parseInt(e.target.value/10), md: value.md})
            else setValue({cost: value.cost, d: e.target.value+emp, md: value.md})
        } else setValue({cost: value.cost, d: e.target.value, md: value.md})
    }
    return (
        <div className="bottom vr-t">
            <DataList />
            <datalist id="empty"></datalist>
            <p>
                <label for="cost">Cena</label>
                {cost != "NaN" ? cost : ""}
                <input className={thema ? "col-lg": "col-lg white-btn"} id="cost" placeholder="Cena"
                value={value.cost} onChange={e => setValue(
                    {cost: e.target.value, md: value.md, d: value.d})}/>
            </p>
            <p>
                <label for="md">MD</label>
                <span hidden={edit}>
                    <input type="checkbox" name="mdon" id="permd" checked={DPH[0]} onChange={e => setDPH([!DPH[0], false])}/>
                    <label for="permd">DPH</label>
                </span>
                <input list="account-UCTO" className={thema ? "col-lg": "col-lg white-btn"} placeholder="MD"
                id="md" value={value.md} onChange={e => changeMD(e)}/>
            </p>
            <p>
                <label for="d">D</label>
                <span hidden={edit}>
                    <input type="checkbox" name="don" id="perd" checked={DPH[1]} onChange={e => setDPH([false, !DPH[1]])}/>
                    <label for="perd">DPH</label>
                </span>
                <input list="account-UCTO" className={thema ? "col-lg": "col-lg white-btn"} placeholder="D"
                id="d" value={value.d} onChange={e => changeD(e)} />
            </p>
            <p>
                <button id="addbtn" className={thema ? "": "white-btn"} onClick={add}>{edit ? "Zmenit" : "Pridat"}</button>
            </p>
        </div>
    )
}
export default  Add;

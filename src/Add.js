import {useState, useEffect} from "react";
import DataList from "./datalist.js";

function Add({setState, state, money, thema}) {
    const [value, setValue] = useState({cost: 0, md: 0, d: 0});
    const [cost, setCost] = useState("");

    useEffect(() => {
        setCost(money(value.cost))
        console.log(`"`+cost+`"`)
    }, [value])

    function add() {
        setState([...state, {
            cost: parseInt(value.cost),
            md: value.md,
            d: value.d
        }])
    }
    return (
        <div className="bottom vr-t">
            <DataList />
            <p>
                <label for="cost">Cena</label>
                {cost != "NaN" ? cost : ""}
                <input className={thema ? "col-lg": "col-lg white-btn"} id="cost" placeholder="Cena"
                onChange={e => setValue(
                    {cost: e.target.value, md: value.md, d: value.d})}/>
            </p>
            <p>
                <label for="md">MD</label>
                <input list="account-UCTO" className={thema ? "col-lg": "col-lg white-btn"} placeholder="MD"
                id="md" onChange={e => setValue(
                    {cost: value.cost, md: e.target.value, d: value.d})}/>
            </p>
            <p>
                <label for="d">D</label>
                <input list="account-UCTO" className={thema ? "col-lg": "col-lg white-btn"} placeholder="D"
                id="d" onChange={e => setValue(
                    {cost: value.cost, md: value.md, d: e.target.value})}/>
            </p>
            <p>
                <button id="addbtn" className={thema ? "": "white-btn"} onClick={add}>Add</button>
            </p>
        </div>
    )
}
export default  Add;

function Opt({opt, i, operations, setSelect, setOperation, sel, thema, money, h, sh}) {
    function changeSelected() {
        if (sel == i+1) {
            setSelect(0);
        } else {
            setSelect(i+1);
        }
    }
    function del_that(e) {
        e.stopPropagation();
        sh([...h, ["del", {...operations[e.target.value], id: e.target.value}]]);
        setOperation(operations.filter((x, i) => i != e.target.value));
    }
    function moveUP(e) {
        e.stopPropagation();
        let i = e.target.value;
        if (i == 0) return;

        let opts = [...operations];
        let old = opts[i-1];
        opts[i-1] = opts[i];
        opts[i] = old;
        setOperation(opts)
    }
    function moveDOWN(e) {
        e.stopPropagation();
        let i = parseInt(e.target.value);
        if (i == operations.length-1) return;

        let opts = [...operations];
        let old = opts[i+1];
        console.log(opts[i], opts, old);
        opts[i+1] = opts[i];
        opts[i] = old;
        setOperation(opts)
    }
    const base = 5;
    function money_10m(cost) {
        let ans = "";

        let edit_number = String(parseInt(cost));
        for (let i=edit_number.length; i>0; i-=3) {
            ans = edit_number.substring(i-3, i) + "\u00a0" + ans;
        }
        return `${String.fromCharCode(160).repeat(ans.length - base)}${ans}` 
    }

    return (
        <tr className={sel == i+1 ? thema ? "opt snav": "opt snav white-sel" : "opt"} onClick={changeSelected}>
            <td class="first">{i+1}</td> 
            <td className="between">
                <button onClick={e => moveUP(e)} value={i}>&uarr;</button>
                <button onClick={e => moveDOWN(e)} value={i}>&darr;</button>

            </td>
            <td className="cost">
                {money_10m(opt.cost)}
            </td> <td>{opt.md}</td> <td class="last">{opt.d}</td>
            <button onClick={e => del_that(e)} value={i}>&times;</button>
        </tr>
    )
}
export default Opt;

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
    return (
        <tr className={sel == i+1 ? thema ? "opt snav": "opt snav white-sel" : "opt"} onClick={changeSelected}>
            <td className="first">{i+1}</td> 
            <td className="between">
                <button onClick={e => moveUP(e)} value={i}>&uarr;</button>
                <button onClick={e => moveDOWN(e)} value={i}>&darr;</button>
            </td>
            <td className="cost">
                {money(opt.cost)}
            </td> <td className="side-acc">{opt.md}</td> <td className="last side-acc">{opt.d}</td>
            <button className="p-58" onClick={e => del_that(e)} value={i}>&times;</button>
        </tr>
    )
}
export default Opt;

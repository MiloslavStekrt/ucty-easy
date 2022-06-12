function Opt({opt, i, operations, setSelect, setOperation, sel, thema}) {
    function changeSelected() {
        if (sel == i+1) {
            setSelect(0);
        } else {
            setSelect(i+1);
        }
    }
    function del_that(e) {
        setOperation(operations.filter((x, i) => i != e.target.value));
        e.stopPropagation();
    }

    return (
        <div className={sel == i+1 ? thema ? "opt snav": "opt snav white-sel" : "opt"} onClick={changeSelected}>
            <p>{i+1}</p> <p>{opt.cost}</p> <p>{opt.md}</p> <p class="last">{opt.d}</p>
            <button onClick={e => del_that(e)} value={i}>&times;</button>
        </div>
    )
}
export default Opt;

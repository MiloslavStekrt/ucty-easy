import {useEffect, useState} from "react";

export default function Ucet({acc, sel, money, thema}) {
    const [is, setIs] = useState(false);
    // 0 => MD, 1 => D, 2 => MD == D
    const [gone, setGone] = useState(2);
    const [overall, setOverall] = useState(0);


    useEffect(() => {
        let isit = false;
        acc.md.map(md => md.i == sel ? isit = true: false);
        acc.d.map(d => d.i == sel ? isit = true: false);
        setIs(isit);
    }, [sel]);

    useEffect(() => {
        let md = (acc.md.map(md => md.cost).reduce((a,b) => Number(a)+Number(b) , 0)) || 0;
        let d = (acc.d.map(d => d.cost).reduce((a,b) => Number(a)+Number(b), 0)) || 0;

        if (d > md) {
            setGone(0);
            setOverall(d - md);
        } else if(d == md) {
            setGone(2);
            setOverall(0);
        } else {
            setGone(1);
            setOverall(md - d);
        }
    }, [acc, sel]);

    return (
        <div className={is ? thema ? "ucet b-sel" : "white-sel ucet b-sel": thema ? "ucet" : "white ucet"}>
            <div className="super">
                <p>MD</p> <p>{acc.name}</p> <p>D</p>
            </div>
            <hr />
            <div className="high">
                <div className="sub">
                    {
                        acc.md.map(md => {
                            return (
                                <div className={sel == md.i ? "row selected": "row"}>
                                    <p>{md.i})&nbsp;</p> <p>&nbsp;{money(md.cost)},-</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="granade"></div>
                <div className="sub">
                    {
                        acc.d.map(d => {
                            return (
                                <div className={sel == d.i ? "row selected": "row"}>
                                    <p>{d.i})&nbsp;</p> <p>&nbsp;{money(d.cost)},-</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <hr />
            <div className="high">
                <div className="sub">
                    <div className="row">
                        <p>&nbsp;</p> <p>&nbsp;{ money(acc.md.map(md => md.cost).reduce((a,b) => Number(a)+Number(b) , 0)) },-</p>
                    </div>
                </div>
                <div className="granade"></div>
                <div className="sub">
                    <div className="row">
                        <p>&nbsp;</p> <p>&nbsp;{ money(acc.d.map(d => d.cost).reduce((a,b) => Number(a)+Number(b), 0)) },-</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="high">
                <div className="sub">
                    <div className="row">
                        { gone == 1 ? money(overall)+",-": String.fromCharCode(160) }
                    </div>
                </div>
                <div className="sub">
                    <div className="row">
                        { gone == 0 ? money(overall)+",-": String.fromCharCode(160) }
                    </div>
                </div>
            </div>
        </div>
    )
}

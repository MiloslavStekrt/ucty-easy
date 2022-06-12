import {useEffect, useState} from "react";

export default function Ucet({acc, sel, money, thema}) {
    const [is, setIs] = useState(false);


    useEffect(() => {
        let isit = false;
        acc.md.map(md => md.i == sel ? isit = true: false);
        acc.d.map(d => d.i == sel ? isit = true: false);
        setIs(isit);
    }, [sel]);

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
                        <p>&nbsp;</p> <p>&nbsp;{ money(acc.md.map(md => md.cost).reduce((a,b) => a+b, 0)) },-</p>
                    </div>
                </div>
                <div className="granade"></div>
                <div className="sub">
                    <div className="row">
                        <p>&nbsp;</p> <p>&nbsp;{ money(acc.d.map(d => d.cost).reduce((a,b) => a+b, 0)) },-</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

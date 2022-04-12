import React from "react"
import Die from "./components/Die"
import "./App.css"

function App () {
    const number = Math.floor(Math.random() * 6)
//    const dice = Array.apply(null, { length: 10 }).map((e, i) => (
//         <Die value={number}/>
//       ));
    return (
        <main>
            <div className="container">
            <Die value={number}/>
            <Die value={number}/>
            <Die value={number}/>
            <Die value={number}/>
            <Die value={number}/>

            <Die value={number}/>
            <Die value={number}/>
            <Die value={number}/>
            <Die value={number}/>
            <Die value={number}/>
            </div>
        </main>
    )
}

export default App
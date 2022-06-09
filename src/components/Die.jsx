import React from "react";

function Die (props) {
    
    return (
        <div 
        className={`dice ${props.isHeld ? "green" : ""}`}
        onClick={props.holdDice}>
            <h2>{props.value}</h2>
        </div>
    )
}

export default Die
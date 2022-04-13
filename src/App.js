import React, {useEffect, useState} from "react"
import Die from "./components/Die"
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import { useStopwatch } from 'react-timer-hook';
import { nanoid } from "nanoid"
import "./App.css"

function App () {
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [game, setGame] = useState(false)
    const [user, setUser] = useState("")    

    const { width, height } = useWindowSize()
    const {seconds, minutes,start, pause,reset} = useStopwatch({ autoStart: true });

    const confetti = (
        <Confetti
        width={width}
        height={height}
      />
    )

    useEffect(() => {
        const check = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allValues = dice.every(die => die.value === firstValue)
        if(check && allValues) {
            setTenzies(true)
            pause()
        }
    }, [dice, pause])

    function generateNewDice () {
        return {
            value: Math.floor(Math.random() * 6),
            id: nanoid(),
            isHeld: false
        }   
    }

    function allNewDice() {
        const newDice = []
        for (var i = 0;i<10;i++) {
            newDice.push(generateNewDice())
        }
        return newDice
    }

    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateNewDice()
            }))
        } else {
            setTenzies(false)
            reset()
            setDice(allNewDice())
        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    const diceElements = dice.map(die => {
        return <Die isHeld={die.isHeld} value={die.value}
                key={die.id} holdDice={()=>holdDice(die.id)}/>
    })

    function startGame () {
        if(user.length>3) {
            setGame(true)
            start()
        } else if(user.length === 0) {
            alert("Enter a username to play")
        }
        else {
            alert(`Username should be more than ${user.length} letter ${user.length > 1 ? "s" : ""}`)
        }
    }

    function handleChange (event) {
        const { value } = event.target
        setUser(value)
    }

    return (
        <main>
            {
                !game ?
                <div className="new-game">
                    <h2 className="title">Enter Username:</h2>
                    <input 
                        type="text"
                        className="input--box"
                        name="user"
                        placeholder="Enter your name"
                        onChange={handleChange}
                    />
                        <button 
                            onClick = {startGame}
                            className="dice--button">
                        Start Game
                    </button>
                </div>
                 :
            <>
            <div className="game">
                 {tenzies ? confetti : ""}
                <h2 className="title">Tenzies</h2>
                <div className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</div>
                <div className="container">
                    {diceElements}
                </div>
                <button 
                onClick = {rollDice}
                className="dice--button">
                    {tenzies ? "New Game" : "Roll"}
                </button>
            </div>
            <div className="player">
                   <h3 className="player--name">Current player:<br/>
                    {user}</h3>
                    <div>
                    <h3 className="player--name">Time elapsed:<br/>
                    {minutes}:{seconds}</h3>
                    </div>
                </div>
            </>
            }
        </main>
    )
}

export default App
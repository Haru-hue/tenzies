import React, {useEffect, useState} from "react"
import Die from "./Die"
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import { useStopwatch } from 'react-timer-hook';
import { nanoid } from "nanoid"
import axios from "axios"

export default function Game (props) {
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [game, setGame] = useState(false)
    const [count, setCount] = useState(0)
    const [player, setPlayer] = useState("")
    const { width, height } = useWindowSize()
    const {seconds, minutes, start, pause, reset} = useStopwatch({ autoStart: true });

    const confetti = (
        <Confetti
        width={width}
        height={height}
      />
    )

    const submitUser = () => {
        const body = ({
            username: player,
            totalTime: `${minutes}:${seconds}`,
            totalRounds: count
        });
        axios.post('http://localhost:5000/', body, {
            header: {
                'Content-Type': 'application/json'
            }
        })
    }

    useEffect(() => {
        const check = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allValues = dice.every(die => die.value === firstValue)
        if(check && allValues && !tenzies) {
            setTenzies(true)
            pause()
            submitUser()
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dice, pause, tenzies])
    
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
            setCount(prev => prev + 1)
        } else {
            setTenzies(false)
            reset()
            setDice(allNewDice())
            setCount(0)
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

    function handleChange (event) {
        const { value } = event.target
        setPlayer(value)
    }

    function startGame () {
        if(player.length>=3 || player.length<=10)  {
            setGame(true)
           start()
        } else if(player === "") {
            alert("Enter a username to play")
        }
        else {
            alert(`Let the username between 3-10 characters`)
        }
    }
    return (     
    <main>
        {!game ? 
        
        <div className="new-game">
            <h2 className="title">Enter Username:</h2>
                <input
                    type="text"
                    className="input--box"
                    name="player"
                    placeholder="Enter your name"
                    onChange={handleChange}
                />
                    <button
                        type="submit"
                        className="dice--button"
                        onClick={startGame}
                        >
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
                    Rolls: {count}
                <button 
                    onClick = {rollDice}
                    className="dice--button">
                    {tenzies ? "New Game" : "Roll"}
                </button>
            </div>
            <div className="player">
                   <h3 className="player--name">Current player:<br/>
                    <div className="user">{player}</div></h3>
                    <div>
                    <h3 className="player--name">Time elapsed:<br/>
                    {minutes}:{seconds > 9 ? "" : "0"}{seconds}</h3>
                    </div>
            </div>
        
        </>
        }
    </main>
    )
}
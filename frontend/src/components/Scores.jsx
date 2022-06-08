import { useEffect, useState } from "react"
import pin from "../pin.png"

const Scores = () => {
    const [results, setResults] = useState({
        username: '',
        time: '',
        rolls: 0
    })

    useEffect(() => {
        async function callAPI () {
            const res = await fetch("http://localhost:5000/")
            const data = await res.json()
            console.log(data)
            data.map(item => {
                   setResults({
                     username: item.username,
                     time: item.totalTime,
                     rolls: item.totalRounds
                 })
             })
        }  

        callAPI()
    }, [])


    return (
        <div className="leaderboard">
            <figure>
                <img src={pin} alt="Hello pin"/>
            </figure>
            <h2>Leaderboard</h2>
            <table>
                <thead>
                    <th>Username</th>
                    <th>Total Time</th>
                    <th>Total Rounds</th>
                </thead>
                <tbody>
                    <tr>
                        <td>{results.username}</td>
                        <td>{results.time}</td>
                        <td>{results.rolls}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Scores



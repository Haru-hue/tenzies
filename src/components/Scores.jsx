import { useEffect, useState } from "react"
import env from "react-dotenv"
import pin from "../pin.png"

const Scores = () => {
    const [results, setResults] = useState([])

    useEffect(() => {
        async function callAPI () {
            const res = await fetch(`${env.REACT_APP_DATABASE_URL}`)
            const data = await res.json()
            console.log(data)
            setResults(data)
        }  
        callAPI()
    }, [])

    const resultArray = results.map(item => {
        return (
            <tr>
                <td>{item.username}</td>
                <td>{item.totalTime}</td>
                <td>{item.totalRounds}</td>
            </tr>
        )
    })   

    return (
        <div className="leaderboard">
            <figure>
                <img src={pin} alt="Hello pin"/>
            </figure>
            <h2>Leaderboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Total Time</th>
                        <th>Total Rounds</th>
                    </tr>
                </thead>
                <tbody>
                   {resultArray}
                </tbody>
            </table>
        </div>
    )
}

export default Scores
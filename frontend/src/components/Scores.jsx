import { useEffect, useState } from "react"

const Scores = (props) => {
    const [data, setData] = useState([])    

    useEffect(() => {
        async function callAPI () {
            await fetch("http://localhost:5000/")
            .then(res => res.json())
            .then(res => setData(res))
        }  

        callAPI()
    }, [])

    console.log(data)

    return (
        <div className="leaderboard">
            hello
        </div>
    )
}

export default Scores
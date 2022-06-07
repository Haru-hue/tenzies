export default function NewGame (props) {
    return (
    <div className="new-game">
        <h2 className="title">Enter Username:</h2>
            <input 
                type="text"
                className="input--box"
                name="player"
                placeholder="Enter your name"
                onChange={props.handleChange}
            />
                <button 
                    type="submit"
                    className="dice--button"
                    onClick={props.startGame}
                    >
                Start Game
            </button>
    </div>
    )
}
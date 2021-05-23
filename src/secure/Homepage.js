import Button from '../components/Button'
import Header from '../components/Header'

const Homepage = () => {
    return(
        <div className={"container"}>
            <div className={"account"}>
                <Button text={"Account"} width={100} nav={"/account"}/>
            </div>
            <Header title={"Codenames   Online"} size={150} family={"Tulpen One"}/>
            <Button text={"Create room"} width={200} nav={"/createroom"}/>
            <div className={"rules"}>
                <label>How to play:</label>
                <ol type={"1"}>
                    <li>1. Click on the CREATE ROOM button.</li> <br/>
                    <li>2. Select the preferred game settings and start the game.</li> <br/>
                    <li>3. Connect with your friends using your favorite audio or video chat.</li> <br/>
                    <li>4. Share the room URL with your friends.</li> <br/>
                    <li>5. Enjoy the game!</li>
                </ol>
            </div>
        </div>
    )
}

export default Homepage
import Button from '../components/Button'
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
const Gameroom = () => {
    const [text, setText] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };
    return (
        <div>
            <div className={"playeruser"}>
                <div className="dropdown player">
                    <button className="dropbtn">Players</button>
                    <div className="dropdown-content" style={{left:0}}>
                        <div>Invite link <br/>
                            <input type={"text"} value={text} size={"15"} onChange={(event) => setText(event.target.value)}/> <br/>
                            <CopyToClipboard text={text} onCopy={onCopyText}>
                                <div className="copy-area">
                                    <button className={"gameroombtn"}>Copy to Clipboard</button>
                                </div>
                            </CopyToClipboard>
                        </div>
                        <hr/>
                        <div>
                            Players in this room
                            <ul>
                                <li>User1</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={"dropdown username"}>
                    <button className="dropbtn">Username</button>
                    <div className="dropdown-content">
                        <button className={"gameroombtn"}>Become spectator</button><br/><br/>
                        <button className={"gameroombtn"}>Switch to another team</button><br/><br/>
                        <button className={"gameroombtn"}>Leave the room</button><br/><br/>
                    </div>
                </div>
            </div>

            <div className={"team"}>
                <div className={"team1 item"}>
                    <h1>Team 1</h1>
                    <label htmlFor="operative">Select Operative</label>
                    <input type="radio" id="operative" name="role" value="operative"/>
                    <br/>
                    <label htmlFor="spymaster">Select Spymaster</label>
                    <input type="radio" id="spymaster" name="role" value="spymaster"/>
                </div>

                <div className={"team2 item"}>
                    <h1>Team 2</h1>
                    <label htmlFor="operative">Select Operative</label>
                    <input type="radio" id="operative" name="role2" value="operative"/>
                    <br/>
                    <label htmlFor="spymaster">Select Spymaster</label>
                    <input type="radio" id="spymaster" name="role2" value="spymaster"/>
                </div>
                <div className={"confirm"}>
                    <Button text={"Confirm"} width={100} nav={"/game"}/>
                </div>
            </div>

        </div>
    )
}
export default Gameroom
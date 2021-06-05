import React, { Component } from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Nav, NavDropdown} from "react-bootstrap";
import {withRouter} from "react-router";

class Game extends Component {
    constructor() {
        super();
        this.state = {words: "", value: "", isCopied: "", red: 0, blue: 0, role: "", wordsColors: "",
            wordsIds: "", isOpened: "", clue: "", word_count: 1, game_log: [],
        game_id: 0, red_first: 0, lang: "", red_team_id: 0, blue_team_id: 0,
            user_id: 0, user_nickname: "", team_id: 0, user_role_id: 0,
        red_spy: "", red_ord: "", blue_spy: "", blue_ord: "", inGame: 0, color_team: "", turn: 0,
        is_active: 1, winner: ''};
        //this.RedFirst = this.RedFirst.bind(this);
        /*this.checkState = this.checkState.bind(this);*/
        this.GiveClue = this.GiveClue.bind(this);
        this.updateTurn = this.updateTurn.bind(this);
        this.UpdateCard = this.UpdateCard.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.leaveRoom = this.leaveRoom.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        console.warn('clue', this.state.clue);
    }

    async componentDidMount() {
        if (!localStorage.getItem('user_token')) {
            this.props.history.push("/login");
        } else {
            await this.getGameInfo();
            await this.getTeamsInfo();
            await this.getUserInfo();
            //await this.RedFirst();
            await this.getCardsInfo();
            await this.getGameLogInfo();
            await this.getUsersTeamsInfo();
            await this.getTurnInfo();
            setInterval(async () => await this.getTurnInfo(), 10000);
            setInterval(async () => await this.getCardsInfo(), 10000);
            setInterval(async () => await this.getGameLogInfo(), 10000);
            setInterval(async () => await this.getUsersTeamsInfo(), 10000);
            setInterval(async () => await this.getGameInfo(), 10000);

            //setInterval(async () => this.getUsersTeamsInfo(this.state.red_team_id, 1), 10000);
            //setInterval(async () => this.getUsersTeamsInfo(this.state.red_team_id, 2), 30000);
            //setInterval(async () => this.getUsersTeamsInfo(this.state.blue_team_id, 1), 30000);
            //setInterval(async () => this.getUsersTeamsInfo(this.state.blue_team_id, 2), 30000);

        }
    }

    /*async componentDidUpdate() {
        if (!localStorage.getItem('user_token')) {
            this.props.history.push("/login");
        } else {
            setInterval(async () => this.getCardsInfo(), 10000);
            setInterval(async () => this.getGameLogInfo(), 10000);
        }
    }*/

    async getGameInfo(){
        const token = this.props.match.params.id;
        //console.warn('token', token);
        let res = await fetch("http://localhost:8000/api/games/token", {
            method: 'GET',
            headers: {
                "Content-type": 'application/json',
                "Accept": 'application/json',
                "Auth-Token": token
            }
        });
        res = await res.json();
        if(res !== undefined) {
            if (res['data'] !== undefined && res['data'] !== null) {
                if (res['data'].length !== 0) {
            /*console.warn("res", res);*/
            this.setState({game_id: JSON.stringify(res['data']['id'])});
            this.setState({red_first: JSON.stringify(res['data']['is_red_first'])});
            console.warn('game_id', this.state.game_id);
            this.setState({lang: JSON.stringify(res['data']['lang'])});
            this.setState({red: JSON.stringify(res['data']['red'])});
            this.setState({blue: JSON.stringify(res['data']['blue'])});
            this.setState({is_active: JSON.stringify(res['data']['is_active'])});
            this.setState({winner: JSON.stringify(res['data']['winner'])});
            console.warn('reddd', this.state.red);
            if(this.state.red == 0){
                this.setState({is_active: 0});
                this.setState({winner: 'red'});
            }
            if(this.state.blue == 0){
                this.setState({is_active: 0});
                this.setState({winner: 'blue'});
            }
            //console.warn('game_id', this.state.game_id);

            /*localStorage.setItem("game_id", JSON.stringify(res['data']['id']));
            localStorage.setItem("red_first", JSON.stringify(res['data']['is_red_first']));
            localStorage.setItem("lang", JSON.stringify(res['data']['lang']));*/
        }}}
    }

    async getTeamsInfo(){
        const gameId = this.state.game_id;
        let res = await fetch("http://localhost:8000/api/teams", {
            method: 'GET',
            headers: {
                "Content-type": 'application/json',
                "Accept": 'application/json',
                "game_id": gameId
            }
        });
        res = await res.json();
        if(res !== undefined) {
            if (res['data'] !== undefined) {
                if (res['data'].length !== 0) {
                /*console.warn("res", res);*/
                this.setState({red_team_id: JSON.stringify(res['data'][0]['id'])});
                this.setState({blue_team_id: JSON.stringify(res['data'][1]['id'])});

                /*localStorage.setItem("red_team_id", JSON.stringify(res['data'][0]['id']));
                localStorage.setItem("blue_team_id", JSON.stringify(res['data'][1]['id']));*/
            }
        }}
    }

    async getUserInfo() {
        let token = JSON.parse(localStorage.getItem('user_token')).data.token;
        //console.warn("token", token);
        let result = await fetch("http://localhost:8000/api/users/token", {
            method: 'GET',
            headers: {
                "Content-type": 'application/json',
                "Accept": 'application/json',
                "Auth-Token": token
            }
        });
        result = await result.json();
        if(result !== undefined) {
            if (result['data'] !== undefined) {
                if (result['data'].length !== 0) {
                    this.setState({user_id: JSON.stringify(result['data']['id'])});
                    this.setState({user_nickname: JSON.stringify(result['data']['nickname'])});
                    //console.warn('nick', this.state.user_nickname);

            /*localStorage.setItem("user_id", JSON.stringify(result['data']['id']));
            localStorage.setItem("user_nickname", JSON.stringify(result['data']['nickname']));*/
        }}}
    }

    async getCardsInfo() {
        const gameId = this.state.game_id;
        let result = await fetch("http://localhost:8000/api/cards/id", {
            method: 'GET',
            headers: {
                "Content-type": 'application/json',
                "Accept": 'application/json',
                "game_id": gameId
            }
        });
        result = await result.json();
        //console.warn("cards", result);
        if(result !== undefined) {
            if (result['data'] !== undefined) {
                if (result['data'].length !== 0) {
                    console.warn("cards", result);
                    let item = [];
                    let colors = [];
                    let ids = [];
                    let isOpen = [];
                    let is;
                    for (let i = 0; i < 25; i++) {
                        if (this.state.lang === '"en"')
                            item.push(result['data'][i]['word_en']);
                        else if (this.state.lang === '"ru"')
                            item.push(result['data'][i]['word_ru']);
                        else if (this.state.lang === '"fr"')
                            item.push(result['data'][i]['word_fr']);
                        else if (this.state.lang === '"az"')
                            item.push(result['data'][i]['word_az']);

                        //console.warn("item", item);
                        colors.push(result['data'][i]['color']);
                        ids.push(result['data'][i]['id']);
                        is = result['data'][i]['opened_by'];
                        if (is != null)
                            isOpen.push(result['data'][i]['opened_by']);
                        else
                            isOpen.push(null);
                    }
                    this.setState({words: item});
                    this.setState({wordsColors: colors});
                    this.setState({wordsIds: ids});
                    this.setState({isOpened: isOpen});
                    console.warn('wordsColors', this.state.wordsColors);
                    console.warn('isOpened', this.state.isOpened);
                    //console.warn("wwww", this.state.words);
                    /*console.warn("wordsColors", this.state.wordsColors[0]);*/
                }
            }
        }
    }

    async getGameLogInfo() {
        let game_id = this.state.game_id;
        //console.warn("token", token);
        let result = await fetch("http://localhost:8000/api/clues/game", {
            method: 'GET',
            headers: {
                "Content-type": 'application/json',
                "Accept": 'application/json',
                "game_id": game_id
            }
        });
        result = await result.json();
        //console.warn("rr", result);
        if(result !== undefined) {
            if (result['data'] !== undefined) {
                if (result['data'].length !== 0) {
            this.setState({game_log: result['data']})
        }}}
        //localStorage.setItem("game_log", JSON.stringify(result['data']));
    }

    async getUsersTeamsInfo() {
        //console.warn("token", token);
        const game_id = this.state.game_id;
        let result = await fetch("http://localhost:8000/api/users/teams/id", {
            method: 'GET',
            headers: {
                "Content-type": 'application/json',
                "Accept": 'application/json',
                "game_id": game_id,
            }
        });
        result = await result.json();
        //console.warn("rr", result);
        if(result !== undefined) {
            if (result['data'] !== undefined && result['data'] !== null) {
                if (result['data'].length !== 0) {
                    //console.warn('red_spy', this.state.red_spy);
                    for(let i=0; i<4; i++) {
                        if (result['data'][i] !== undefined && result['data'][i] !== null) {
                            //console.warn('red_spy', this.state.red_spy);
                            if (this.state.red_team_id == result['data'][i]['team_id'] && result['data'][i]['user_role_id'] === 1) {
                                //console.warn("ut", result);
                                this.setState({red_spy: result['data'][i]['user_name']});
                                //console.warn('red_spy', this.state.red_spy);
                            } else if (this.state.red_team_id == result['data'][i]['team_id'] && result['data'][i]['user_role_id'] === 2) {
                                //console.warn("ut", result);
                                this.setState({red_ord: result['data'][i]['user_name']});
                                //return result['data']['user_name'];
                            } else if (this.state.blue_team_id == result['data'][i]['team_id'] && result['data'][i]['user_role_id'] === 1) {
                                //console.warn("ut", result);
                                this.setState({blue_spy: result['data'][i]['user_name']});
                            } else if (this.state.blue_team_id == result['data'][i]['team_id'] && result['data'][i]['user_role_id'] === 2) {
                                //console.warn("ut", result);
                                this.setState({blue_ord: result['data'][i]['user_name']});
                            } if(this.state.user_nickname.replace(/['"]+/g, '') === this.state.red_spy){
                                this.setState({color_team: "red"});
                                this.setState({user_role_id: 1});
                                this.setState({inGame: 1});
                            } else if(this.state.user_nickname.replace(/['"]+/g, '') === this.state.red_ord){
                                this.setState({color_team: "red"});
                                this.setState({user_role_id: 2});
                                this.setState({inGame: 1});
                            } else if (this.state.user_nickname.replace(/['"]+/g, '') === this.state.blue_spy){
                                this.setState({color_team: "blue"});
                                this.setState({user_role_id: 1});
                                this.setState({inGame: 1});
                            } else if(this.state.user_nickname.replace(/['"]+/g, '') === this.state.blue_ord){
                                this.setState({color_team: "blue"});
                                this.setState({user_role_id: 2});
                                this.setState({inGame: 1});
                            }
                        }
                    }
                }}}
        //localStorage.setItem("game_log", JSON.stringify(result['data']));

    }

    async getTurnInfo() {
        const game_id = this.state.game_id;
        //console.warn('game_id', game_id);
        let result = await fetch("http://localhost:8000/api/turns/game", {
            method: 'GET',
            headers: {
                "Content-type": 'application/json',
                "Accept": 'application/json',
                "game_id": game_id
            }
        });
        result = await result.json();
        //console.warn('r', result);
        if(result !== undefined) {
            if (result['data'] !== undefined) {
                if (result['data'].length !== 0) {
                    this.setState({turn: JSON.stringify(result['data'][0]['turn'])});
                    console.warn('turn', this.state.turn);
                    console.warn('role', this.state.user_role_id);

                    /*localStorage.setItem("user_id", JSON.stringify(result['data']['id']));
                    localStorage.setItem("user_nickname", JSON.stringify(result['data']['nickname']));*/
                }}}
    }



/*    async componentDidMount() {
        if (!localStorage.getItem('user_token')) {
            this.props.history.push("/login");
        } else {
            await this.getGameInfo();
            await this.getTeamsInfo();
            await this.getUserInfo();
            await this.getCardsInfo();
            this.RedFirst();
        }
    }*/

    async updateTurn(){
        const game_id = this.state.game_id;
        const turn = (parseInt(this.state.turn) + 1)%4;
        //console.warn('why', parseInt(this.state.turn) + 1);
        //console.warn('tr', turn);
        let item = {turn};
        let result = await fetch("http://localhost:8000/api/turns", {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {
                "Content-type": 'application/json',
                "Accept": 'application/json',
                "game_id": game_id
            }
        });
        result = await result.json();
    }

    async chooseRole(team_id, user_role_id) {
        this.setState({team_id: team_id});
        this.setState({user_role_id: user_role_id});
        /*localStorage.setItem("team_id", team_id);
        localStorage.setItem("user_role_id", user_role_id);*/
        const user_id = this.state.user_id;
        const game_id = this.state.game_id;
        let item = {user_id, team_id, user_role_id, game_id}
        let result = await fetch("http://localhost:8000/api/users/teams", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-type": 'application/json',
                "Accept": 'application/json',
            }
        });
        result = await result.json();
        console.warn("resulttt", result);
        this.setState({team_id: team_id});
        /*if(result !== undefined && result['data'] !== null) {
            //console.warn("resulttttt", result);
            if (this.state.team_id === this.state.red_team_id && this.state.user_role_id === '1') {
                this.setState({color: 'red', role: 'spymaster'});
            } else if (this.state.team_id === this.state.red_team_id && this.state.user_role_id === '2') {
                this.setState({color: 'red', role: 'ordinary'});
            } else if (this.state.team_id === this.state.blue_team_id && this.state.user_role_id === '1') {
                this.setState({color: 'blue', role: 'spymaster'});
            } else if (this.state.team_id === this.state.blue_team_id && this.state.user_role_id === '2') {
                this.setState({color: 'blue', role: 'ordinary'});
            }
            console.warn("color", this.state.color);
            console.warn("role", this.state.role);
            /!*window.location.reload();*!/
        }*/
    }

            /*    checkState(team_id, user_role_id){
                    if(!localStorage.getItem('user_role_id')) {
                        return <p>++++++++++++++</p>
            /!*
                        return <button onClick={() => this.chooseRole(JSON.parse(localStorage.getItem('red_team_id')),1)} className='btn' style={{width:120, height:30, fontSize:10}}>Join as Spymaster</button>
            *!/
                    } else {
                        return <p>----------------</p>
                    }
                }*/
    async UpdateGame(){
        const red = this.state.red;
        const blue = this.state.blue;
        const is_active = this.state.is_active;
        const winner = this.state.winner;
        const game_id = this.state.game_id;
        let item = {red, blue, is_active, winner};
        let result = await fetch("http://localhost:8000/api/games/id", {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {
                "Content-type": 'application/json',
                "Accept": 'application/json',
                "game_id": game_id
            }
        });
        result = await result.json();
        console.warn('updateGame', result);
    }

    async UpdateCard(index){
        if((this.state.color_team == "red" && this.state.user_role_id == 2 && this.state.turn == 1) ||
            (this.state.color_team == "blue" && this.state.user_role_id == 2 && this.state.turn == 3)) {
            if(this.state.isOpened[index] !== null) {
                this.btn.setAttribute("disabled", "disabled");
            } else {
                const opened_by = this.state.user_id;
                const card_id = this.state.wordsIds[index];
                this.setState({isOpened: this.state.user_id});
                let isOpened = [...this.state.isOpened];
                isOpened[index] = {...isOpened[index], key: this.state.user_id};
                this.setState({isOpened});
                console.warn('ddd', this.state.wordsColors[index]);
                if (this.state.wordsColors[index] == 'red') {
                    let red = parseInt(this.state.red)-1;
                    this.setState({red: red});
                } if (this.state.wordsColors[index] == 'blue'){
                    let blue = (parseInt(this.state.blue)-1);
                    this.setState({blue: blue});
                    console.warn('blue', this.state.blue);
                } if (this.state.wordsColors[index] == 'black'){
                    this.setState({is_active: 0});
                    if(this.state.color_team == 'red'){
                        this.setState({winner: 'blue'});
                    } else if(this.state.color_team == 'blue'){
                        this.setState({winner: 'red'});
                    }
                    console.warn('blue', this.state.blue);
                }
                if (this.state.wordsColors[index] != this.state.color_team) {
                    await this.updateTurn();
                }
                let item = {opened_by, card_id};
                let result = await fetch("http://localhost:8000/api/cards/id", {
                    method: 'PUT',
                    body: JSON.stringify(item),
                    headers: {
                        "Content-type": 'application/json',
                        "Accept": 'application/json',
                    }
                });
                result = await result.json();
                console.warn('updateee', result);
                setTimeout(async () => await this.UpdateGame(), 1000);

                //await this.UpdateGame();
                if (result !== undefined && result['data'] !== null) {
                    this.setState({isOpened: 1});
                    this.setState({wordsColors: 1});
                }
            }
        }
    }

    async GiveClue(){
        const clue = this.state.clue;
        const word_count = this.state.word_count;
        const game_id = this.state.game_id;
        const team_id = this.state.team_id;
        const user_id = this.state.user_id;
        let item = {clue, word_count, game_id, team_id, user_id};
            let result = await fetch("http://localhost:8000/api/clues", {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    "Content-type": 'application/json',
                    "Accept": 'application/json',
                }
            });
            result = await result.json();
        console.warn("giveclue", result);
        }



    /*RedFirst(){
        const redFirst = this.state.red_first;
        if(redFirst == 1) {
            console.warn('redFir', redFirst);
            this.setState({red: 9});
            this.setState({blue: 8});
        }
        else {
            this.setState({red: 8});
            this.setState({blue: 9});
        }
    }*/

    leaveRoom(){
        localStorage.removeItem("red_first");
        localStorage.removeItem("game_id");
        this.props.history.push("/homepage");
    }

    render() {
        return (
            <div className="body">
                <header className="h">
                    Header
                </header>
                {this.state.is_active == 0 && this.state.winner != null && <p style={{color: this.state.winner, fontSize: 27, textShadow: '0.5px 0.5px'}}>{this.state.winner.replace(/['"]+/g, '')} team wins!</p>}
                {this.state.is_active == 1 && this.state.turn == 0 && <p style={{color: "red", fontSize: 27, textShadow: '0.5px 0.5px'}}>Red spymaster turn</p>}
                {this.state.is_active == 1 && this.state.turn == 1 && <p style={{color: "red", fontSize: 27, textShadow: '0.5px 0.5px'}}>Red operative turn</p>}
                {this.state.is_active == 1 && this.state.turn == 2 && <p style={{color: "blue", fontSize: 27, textShadow: '0.5px 0.5px'}}>Blue spymaster turn</p>}
                {this.state.is_active == 1 && this.state.turn == 3 && <p style={{color: "blue", fontSize: 27, textShadow: '0.5px 0.5px'}}>Blue operative turn</p>}

                <Nav className={"account"}>
                    <NavDropdown title="Link">
                        <NavDropdown.Item><div className="dropdown-content" style={{left:0}}>
                            <div>Invite link <br/>
                                <input type={"text"} value={this.state.value} size={"15"} onChange={this.handleChange}/> <br/>
                                {/*<CopyToClipboard text={this.state.value} onCopy={onCopyText}>
                                    <div className="copy-area">
                                        <button className={"gameroombtn"}>Copy to Clipboard</button>
                                    </div>
                                </CopyToClipboard>*/}
                            </div>
                            <hr/>
                            <div>
                                Players in this room
                                <ul>
                                    <li>User1</li>
                                </ul>
                            </div>
                        </div></NavDropdown.Item>
                    </NavDropdown>
                    <br/>




                    <NavDropdown title="Actions">
                        <NavDropdown.Item>Become spectator</NavDropdown.Item>
                        <NavDropdown.Item>Switch to another team</NavDropdown.Item>
                        <NavDropdown.Item onClick={this.leaveRoom}>Leave the room</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <br/>



                <main>
                    <nav>
                        <div className="Team1">
                            <div className="up1">
                                <div>
                                    <img src="https://boardgametree.com/wp-content/uploads/2019/04/codenames-2.jpg" alt="character" width="110" />
                                </div>
                                <div className="score1">
                                    <h2>{this.state.red}</h2>
                                </div>
                            </div>
                            <div className="player1">
                                <h6>Spymaster</h6>
                                {this.state.red_spy === "" && this.state.inGame !== 1 &&
                                <button
                                    onClick={async () => {await this.chooseRole(this.state.red_team_id, 1);}}
                                    className='btn' style={{width: 120, height: 30, fontSize: 10}}>Join as
                                    Spymaster</button>
                                }
                                {this.state.user_nickname.replace(/['"]+/g, '') === this.state.red_spy ?
                                <p style={{color: "yellow"}}>{this.state.red_spy}</p> : <p>{this.state.red_spy}</p>}


                                <h6>Operative</h6>
                                {this.state.red_ord === "" && this.state.inGame !== 1 &&
                                <button
                                    onClick={async () => {await this.chooseRole(this.state.red_team_id, 2);}}
                                    className='btn' style={{width: 120, height: 30, fontSize: 10}}>Join as
                                    Operative</button>
                                }
                                {this.state.user_nickname.replace(/['"]+/g, '') === this.state.red_ord ?
                                <p style={{color: "yellow"}}>{this.state.red_ord}</p> : <p>{this.state.red_ord}</p>}
                                {/*{this.state.user_role_id === 2 && this.state.team_id === this.state.red_team_id &&
                                <p>{this.state.user_nickname}</p>
                                }
                                {this.state.user_role_id !== 0 &&this.state.user_role_id !== 2 && this.state.team_id !== this.state.red_team_id &&
                                <p>-</p>
                                }*/}
                            </div>
                        </div>
                    </nav>
                    <article>
                        <div>
                            <div>
{/*                                <Card id='0' word={this.state.words[0]} color={(this.state.isOpened[0] && 'green') || (this.state.user_role_id === 1 && this.state.wordsColors[0])} onClick={((this.state.color_team == "red" && this.state.user_role_id == 2 && this.state.turn == 1) ||
                                    (this.state.color_team == "blue" && this.state.user_role_id == 2 && this.state.turn == 3)) && this.UpdateCard(0)}/>*/}
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[0] && this.state.wordsColors[0]) || (this.state.user_role_id === 1 && this.state.wordsColors[0]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(0);}}>{this.state.isOpened[0] ? '-' : this.state.words[0]}</button>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[1] && this.state.wordsColors[1]) || (this.state.user_role_id === 1 && this.state.wordsColors[1]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(1);}}>{this.state.isOpened[1] ? '-' : this.state.words[1]}</button>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[2] && this.state.wordsColors[2]) || (this.state.user_role_id === 1 && this.state.wordsColors[2]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(2);}}>{this.state.isOpened[2] ? '-' : this.state.words[2]}</button>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[3] && this.state.wordsColors[3]) || (this.state.user_role_id === 1 && this.state.wordsColors[3]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(3);}}>{this.state.isOpened[3] ? '-' : this.state.words[3]}</button>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[4] && this.state.wordsColors[4]) || (this.state.user_role_id === 1 && this.state.wordsColors[4]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(4);}}>{this.state.isOpened[4] ? '-' : this.state.words[4]}</button>
                            </div>
                            <div>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[5] && this.state.wordsColors[5]) || (this.state.user_role_id === 1 && this.state.wordsColors[5]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(5);}}>{this.state.isOpened[5] ? '-' : this.state.words[5]}</button>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[6] && this.state.wordsColors[6]) || (this.state.user_role_id === 1 && this.state.wordsColors[6]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(6);}}>{this.state.isOpened[6] ? '-' : this.state.words[6]}</button>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[7] && this.state.wordsColors[7]) || (this.state.user_role_id === 1 && this.state.wordsColors[7]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(7);}}>{this.state.isOpened[7] ? '-' : this.state.words[7]}</button>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[8] && this.state.wordsColors[8]) || (this.state.user_role_id === 1 && this.state.wordsColors[8]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(8);}}>{this.state.isOpened[8] ? '-' : this.state.words[8]}</button>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[9] && this.state.wordsColors[9]) || (this.state.user_role_id === 1 && this.state.wordsColors[9]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(9);}}>{this.state.isOpened[9] ? '-' : this.state.words[9]}</button>
                            </div>
                            <div>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[10] && this.state.wordsColors[10]) || (this.state.user_role_id === 1 && this.state.wordsColors[10]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(10);}}>{this.state.isOpened[10] ? '-' : this.state.words[10]}</button>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[11] && this.state.wordsColors[11]) || (this.state.user_role_id === 1 && this.state.wordsColors[11]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(11);}}>{this.state.isOpened[11] ? '-' : this.state.words[11]}</button>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[12] && this.state.wordsColors[12]) || (this.state.user_role_id === 1 && this.state.wordsColors[12]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(12);}}>{this.state.isOpened[12] ? '-' : this.state.words[12]}</button>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[13] && this.state.wordsColors[13]) || (this.state.user_role_id === 1 && this.state.wordsColors[13]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(13);}}>{this.state.isOpened[13] ? '-' : this.state.words[13]}</button>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[14] && this.state.wordsColors[14]) || (this.state.user_role_id === 1 && this.state.wordsColors[14]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(14);}}>{this.state.isOpened[14] ? '-' : this.state.words[14]}</button>
                            </div>
                            <div>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[15] && this.state.wordsColors[15]) || (this.state.user_role_id === 1 && this.state.wordsColors[15]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(15);}}>{this.state.isOpened[15] ? '-' : this.state.words[15]}</button>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[16] && this.state.wordsColors[16]) || (this.state.user_role_id === 1 && this.state.wordsColors[16]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(16);}}>{this.state.isOpened[16] ? '-' : this.state.words[16]}</button>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[17] && this.state.wordsColors[17]) || (this.state.user_role_id === 1 && this.state.wordsColors[17]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(17);}}>{this.state.isOpened[17] ? '-' : this.state.words[17]}</button>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[18] && this.state.wordsColors[18]) || (this.state.user_role_id === 1 && this.state.wordsColors[18]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(18);}}>{this.state.isOpened[18] ? '-' : this.state.words[18]}</button>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[19] && this.state.wordsColors[19]) || (this.state.user_role_id === 1 && this.state.wordsColors[19]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(19);}}>{this.state.isOpened[19] ? '-' : this.state.words[19]}</button>
                            </div>
                            <div>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[20] && this.state.wordsColors[20]) || (this.state.user_role_id === 1 && this.state.wordsColors[20]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(20);}}>{this.state.isOpened[20] ? '-' : this.state.words[20]}</button>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[21] && this.state.wordsColors[21]) || (this.state.user_role_id === 1 && this.state.wordsColors[21]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(21);}}>{this.state.isOpened[21] ? '-' : this.state.words[21]}</button>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[22] && this.state.wordsColors[22]) || (this.state.user_role_id === 1 && this.state.wordsColors[22]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(22);}}>{this.state.isOpened[22] ? '-' : this.state.words[22]}</button>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[23] && this.state.wordsColors[23]) || (this.state.user_role_id === 1 && this.state.wordsColors[23]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(23);}}>{this.state.isOpened[23] ? '-' : this.state.words[23]}</button>
                                <button ref={btn => { this.btn = btn; }}  style={{backgroundColor: (this.state.isOpened[24] && this.state.wordsColors[24]) || (this.state.user_role_id === 1 && this.state.wordsColors[24]), color: 'grey', textShadow: '0.5px 0.5px #000000'}}
                                        onClick={() => {this.UpdateCard(24);}}>{this.state.isOpened[24] ? '-' : this.state.words[24]}</button>
                            </div>
                        </div>
                        <br/>
                        {((this.state.color_team == "red" && this.state.user_role_id == 1 && this.state.turn == 0) ||
                        (this.state.color_team == "blue" && this.state.user_role_id == 1 && this.state.turn == 2)) &&
                            <>
                        <div className="clue">
                            <div>
                                <input type="text" name="clue" placeholder="Type your clue here" className="input-clue" onChange={this.handleChange}/>
                            </div>
                            &nbsp; &nbsp;
                            <div className="dropdown-container">
                                <select name="word_count" onChange={this.handleChange}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                        </div>
                            <br/>
                            <button onClick={() => { this.GiveClue(); this.updateTurn();}} className='clue-btn'>Give Clue</button>
                        </>
                        }
                        {((this.state.color_team == "red" && this.state.user_role_id == 2 && this.state.turn == 1) ||
                            (this.state.color_team == "blue" && this.state.user_role_id == 2 && this.state.turn == 3)) &&
                            <>
                                <br/>
                                <button onClick={() => { this.updateTurn();}} className='clue-btn'>Pass turn</button>
                            </>}
                    </article>
                    <aside>
                        <div className="Team2">
                            <div className="up2">
                                <div className="score2">
                                    <h2>{this.state.blue}</h2>
                                </div>
                                <div>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFKK_nMs2OLA0TZa9XsFD5XYnW2TIlISL9iOy6AgtT2QAUw41H_XxUGvtv0jhRAE8feLE&usqp=CAU" alt="character" width="110" />
                                </div>
                            </div>
                            <div className="player2">
                                {/*<h6>Spymaster</h6>
                                <button onClick={() => this.chooseRole(this.state.blue_team_id,1)} className='btn' style={{width:120, height:30, fontSize:10}}>Join as Spymaster</button>
                                <h6>Operative</h6>
                                <button onClick={() => this.chooseRole(this.state.blue_team_id,2)} className='btn' style={{width:120, height:30, fontSize:10}}>Join as Operative</button>*/}

                                <h6>Spymaster</h6>
                                {this.state.blue_spy === "" && this.state.inGame !== 1 &&
                                <button
                                    onClick={async () => {await this.chooseRole(this.state.blue_team_id, 1);}}
                                    className='btn' style={{width: 120, height: 30, fontSize: 10}}>Join as
                                    Spymaster</button>
                                }
                                {this.state.user_nickname.replace(/['"]+/g, '') === this.state.blue_spy ?
                                <p style={{color: "yellow"}}>{this.state.blue_spy}</p> : <p>{this.state.blue_spy}</p>}


                                <h6>Operative</h6>
                                {this.state.blue_ord === "" && this.state.inGame !== 1 &&
                                <button
                                    onClick={async () => {await this.chooseRole(this.state.blue_team_id, 2);}}
                                    className='btn' style={{width: 120, height: 30, fontSize: 10}}>Join as
                                    Operative</button>
                                }
                                {this.state.user_nickname.replace(/['"]+/g, '') === this.state.blue_ord ?
                                <p style={{color: "yellow"}}>{this.state.blue_ord}</p> : <p>{this.state.blue_ord}</p>}

                            </div>
                        </div>
                        <div className="gamelog">
                            <section>
                                <p>Game log</p>

                            </section>
                            <section>

                                <p>{this.state.game_log !== undefined && this.state.game_log.map(log => <div><span style={{color: (log.nickname.replace(/['"]+/g, '') === this.state.red_spy) ? "red" : "blue"}}>{log.nickname}</span> gives a clue {log.clue} {log.word_count}</div>)}</p>
                            </section>
                        </div>
                    </aside>
                </main>
            </div>
        )
    }
}

export default withRouter(Game)
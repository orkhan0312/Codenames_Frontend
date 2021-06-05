import Button from '../components/Button'
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
const Createroom = () => {
    const [lang, setLang] = useState("en");
    const [timer, setTimer] = useState(3);
    const history = useHistory();

    useEffect(()=>{
        if(!localStorage.getItem('user_token')){
            history.push('/');
        }
    })

    let myItem = localStorage.getItem('user_token');
    localStorage.clear();
    localStorage.setItem('user_token',myItem);

    async function createGame(){
        let item = {lang, timer};
        console.warn("item", item);
        let result = await fetch("http://localhost:8000/api/games", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-type": 'application/json',
                "Accept": 'application/json',
            }
        });
        result = await result.json();
        console.warn('result', result);
       result = result['data'];
        localStorage.setItem("game_token", JSON.stringify(result));

        history.push('game/'+result);
    }

    return(
        <div>
            <div className={"crroom"}>
                <div className="flex flex-col items-center py-16 bg-gray-100 languages">
                    <label style={{color: 'white'}}>Language of the words:</label>
                    <ul  id="filter1" className="filter-switch inline-flex items-center relative h-10 p-1 space-x-1 bg-gray-200 rounded-md font-semibold text-blue-600 my-4">
                        <li className="filter-switch-item flex relative h-8 bg-gray-300x">
                            <input type={"radio"} name={"filter1"} id={"filter1-0"} className="sr-only" onChange={(e)=>setLang('az')}/>
                            <label htmlFor="filter1-0" className="h-8 py-1 px-2 text-sm leading-6 text-gray-600">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAACAklEQVRIS+2VXUiTYRiGr3f79pluxmh/GUWExuzPEZEUCMODciwiEow6iESS0YkHRYr0c9Si8ECCsM6iDgJPFoU/EboaVFhE2Socs0BC24gcFJvbvs0tXNHxJL910N7Dl+d97ov7vR8e0dbR0+RH8s/nhI4SHrMmn20m2yxMHecy8zkhlVD7j5RJ5DOC9vP5ws0eV2kZJh4W9MoAZQf+vQP3qM9rETjQFz0ForICg6cVQ+dhdPUbySfTKJNhvl+8Scr/qqg+r4n/moLlAmjMRqxjA8iOzSRHn5O4PYSQdQj9KuSd9cQ8l9UFMN+9RNWxFhZC0ww37kJbW0uj10vU56NqPIxhJqkuwIaFpyx9QbCvj0/dPew44qFu8AaJN+954T5IXdSsLoAtOkyFzUqovx/59B2EczvSSRd6g4lYpxf5W0pdgPi142zt6iIRChNztBPNRZjMzrBao8HZdgZl8LG6AM+MH2kJBFjT0EDq0QSx8QApi4zF7WJx5CU/zl5XF2CKKSLVGnb39mI/egLteiuLs1+J33rA9JWr2DLLzADd+wrb0N16qCjylSoa8d3/vQ3LAP+jA4qiMDY0iiRJiFKHUEmn+fD2HZHZOWzrahDyhQNflLRSs1LpLraPTpbZ62wKik0Dp+xzkc9PlLSyttjHf1O3ZLvJasG+bUvQWF25/yfu5t7+vd9iEQAAAABJRU5ErkJggg==" alt="man"/>
                            </label>
                        </li>
                        <li className="filter-switch-item flex relative h-8 bg-gray-300x">
                            <input type={"radio"} name={"filter1"} id={"filter1-1"} className="sr-only" onChange={(e)=>setLang('en')}/>
                            <label htmlFor="filter1-1" className="h-8 py-1 px-2 text-sm leading-6 text-gray-600">
                                <img src="data:image/png;base64,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" alt="man" />
                            </label>
                        </li>
                        <li className="filter-switch-item flex relative h-8 bg-gray-300x">
                            <input type={"radio"} name={"filter1"} id={"filter1-2"} className="sr-only" onChange={(e)=>setLang('ru')}/>
                            <label htmlFor="filter1-2" className="h-8 py-1 px-2 text-sm leading-6 text-gray-600">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAAo0lEQVRIS2PcuO+I+u07D/d/+/5DkoGOgIuT47mqirwjY8+spc/obTnMnyBHMDZNnPsfJFCcHkdH/zMw9M5cBLZv1AGjITDwIcCoWf+fhZWNwcotnq654NDW2ZBcMOqA0RAYDYEBD4HlAgzg2tBaRoKu5cDRJy8g5cCoA0ZDYDCEwGUGBgYdumYBhGXnGZdxM4gzsTHs+/+fQYvOjjj//zeDJwBxf34P7r+YUwAAAABJRU5ErkJggg==" alt="man"/>
                            </label>
                        </li>
                        <li className="filter-switch-item flex relative h-8 bg-gray-300x">
                            <input type={"radio"} name={"filter1"} id={"filter1-3"} className="sr-only" onChange={(e)=>setLang('fr')}/>
                            <label htmlFor="filter1-3" className="h-8 py-1 px-2 text-sm leading-6 text-gray-600">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAAjUlEQVRIS2N01pktzszMvIeBgUGHAQ+wSfqPTxpDTrkyF696RgaGKwyMjC6MbvrzLhOyHGQStR0AMhPkCJADwF5TEA7B6+L+bZwkhcAHVSW86g+8fQuWH3XAaAiMhsBoCIyGwGgIjIbAaAiMhsCgCIEBa5QyMDCcZwQ1y5mYmfcxMjBo0bNZDrackdETAIE6sTOFYlSxAAAAAElFTkSuQmCC" alt="man" />
                            </label>
                        </li>
                    </ul>
                </div>
                <label style={{color:'white'}}>Timer &nbsp; &nbsp; </label>
                <select>
                    <option  onChange={(e)=>setTimer(3)}>3 min</option>
                    <option onChange={(e)=>setTimer(5)}>5 min</option>
                    <option  onChange={(e)=>setTimer(7)}>7 min</option>
                </select>
                {/*<Button text={"Confirm"} width={200} nav={"/game"}/>*/}
                <button onClick={createGame} className='btn' style={{width:250}}>Confirm</button>
            </div>
        </div>
    )
}
export default Createroom
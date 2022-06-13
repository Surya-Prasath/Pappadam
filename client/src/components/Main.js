import React, {useRef} from "react";
import { useLocation } from "react-router-dom";
import {io} from "socket.io-client";
import FaceCam from "./FaceCam";
import Chat from "./Chat";
import Youtube from "./Youtube";
import Spotify from "./Spotify";
import Netflix from "./Netflix";


const Main = ()=>{
    //Checks whether the state feature was sent
    const {state} = useLocation()
    const roomId = useRef(state.roomId)
    const {feature} = state

    let socket = io("http://localhost:5000")
    socket.on("connect", ()=>{
        socket.emit("join-room", "testing")
        socket.on("chat-bot", message=>console.log(message))
    })

    const mainFrame = ()=>{
        switch (feature) {
            case "Youtube":
                return( <Youtube/>)
            case "Spotify":
                return( <Spotify/>)
            case "Netflix":
                return (<Netflix/>)
            default:
                return (<Youtube/>)
        }
    }
    return(
        <div>
            {mainFrame()}
            <FaceCam socket={socket}/>
            <Chat socket={socket}/>
        </div>
    )
}

export default Main;
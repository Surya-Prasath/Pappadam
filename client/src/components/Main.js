import React from "react";
import { useLocation } from "react-router-dom";
import {io} from "socket.io-client";
import {generate} from "random-username-generator"
import FaceCam from "./FaceCam";
import Chat from "./Chat";
import Youtube from "./Youtube";
import Spotify from "./Spotify";
import Netflix from "./Netflix";


// eslint-disable-next-line react-hooks/rules-of-hooks
let socket = io("http://localhost:5000")

const Main = () => {
    const location = useLocation()
    let {roomId} =  location.state
    let {feature} = location.state
    let name = sessionStorage.getItem("name") || generate()

    console.log(name, "name", roomId, "room")

    //passing feature
    const mainFrame = () => {
        switch (feature) {
            case "Youtube":
                return (<Youtube/>)
            case "Spotify":
                return (<Spotify/>)
            case "Netflix":
                return (<Netflix/>)
            default:
                return (<Youtube/>)
        }
    }

    console.log(socket, "Main")

    return (
        <div>
            {mainFrame()}
            <FaceCam/>
            <Chat socket={socket}/>
        </div>
    )
}

export default Main;
import React, {useEffect, useState} from "react";
import {
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Input,
    IconButton,
    Typography,
} from "@material-tailwind/react";
import {useLocation} from "react-router-dom";

const Chat = ({socket})=>{
    const location = useLocation()

    //Loading from session
    let name = sessionStorage.getItem("name")
    let {roomId} = location.state

    //Open state for menu button
    const [menuOpen, setMenuOpen] = useState(false)
    const set_menu_open = ()=>{
        setMenuOpen(!menuOpen)
    }

    //Previous message state
    const [prevMessages, setPrevMessages] = useState(["Welcome to chat"])
    const set_prev_messages = ()=>{
        setPrevMessages([...prevMessages, currentMessage])
        console.log(prevMessages, "prevMessages")
    }

    //message the user is going to send
    const [currentMessage, setCurrentMessage] = useState("")
    const set_current_message = (event)=>{
        setCurrentMessage(event.target.value)
    }

    //Check for enter in input and space in messages
    const keyPress = (event)=>{
        if (event.key==="Enter"){
            set_prev_messages()
            console.log("before sending", roomId, sessionStorage.getItem("room"))
            socket.emit("message", roomId, currentMessage)
            event.target.value=""
            setCurrentMessage("")
        } else if(event.key===" "){
            event.target.value+=" "
            setCurrentMessage(event.target.value)
        }
        console.log(currentMessage, "- current message")
    }

    // basic socket connection
    const runInInterval= () =>{
        setTimeout(()=>{
            console.log(socket.id, "chat")
            socket.emit("join-room", roomId, sessionStorage.getItem("room"))
            console.log("Joining request sent")

            socket.on("connect", ()=>{
                console.log("socket connected")
            })

            socket.on("chat-bot", message=>{
                setPrevMessages([...prevMessages, message])
            })
        }, 0)
    }
    //rejoins the room when changed
    useEffect(()=>{
        runInInterval()
    }, [roomId])


    return(
        <div >
            <Menu open={menuOpen} placement={"top"}>
                <div onClick={set_menu_open}>
                <MenuHandler>
                    <IconButton>
                        <i className="fas fa-heart" />
                    </IconButton>
                </MenuHandler>
                </div>
                <MenuList>
                    <MenuItem>
                    {prevMessages.map(message=>{
                        return (<Typography>{message}</Typography>)
                    })}
                    </MenuItem>
                    <Input variant={"standard"} label={"Type a message"} onChange={set_current_message} onKeyDown={keyPress} color={"pink"}/>
                </MenuList>
            </Menu>
        </div>
    )
}

export default Chat;
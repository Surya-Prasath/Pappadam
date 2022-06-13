/* This example requires Tailwind CSS v2.0+ */
import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Popover} from '@headlessui/react'
import {
    ChartBarIcon,
    CursorClickIcon,
    PlayIcon,
    RefreshIcon,
    ShieldCheckIcon,
    ViewGridIcon,
} from '@heroicons/react/outline'
import {Button, Input, Menu, MenuHandler, MenuItem, MenuList, Typography, Avatar} from "@material-tailwind/react";

//Features displayed on Features Navbar
const features = [
    {
        name: 'Youtube',
        href: '#',
        icon: ChartBarIcon,
    },
    {
        name: 'Spotify',
        href: '#',
        icon: CursorClickIcon,
    },
    { name: 'Netflix', href: '#', icon: ShieldCheckIcon },
    {
        name: 'Something',
        href: '#',
        icon: ViewGridIcon,
    },
    {
        name: 'Automations',
        href: '#',
        icon: RefreshIcon,
    },
    {
        name: "Try Demo",
        href: "#",
        icon: PlayIcon,
    }
]

const downIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 opacity-75"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
        />
    </svg>
);


export default function Example() {
    const navigate = useNavigate()
    const [id, setId] = useState("public");

    const roomChange = (event)=>{
        setId(event.target.value)
    }
    const roomPress = (event)=>{
        if (event.key==="Enter"){
            roomSubmit()
        }
    }
    const roomSubmit = ()=>{
        navigate("/testing", {state: {roomId: id}})
    }

    return (
        <Popover className="sticky top-3 z-10 backdrop-blur bg-opacity-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center border-b-2 border-b-pink-400 py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <a href="#">
                            <Avatar src="https://www.material-tailwind.com/img/face-2.jpg" about={"Logo"}/>
                        </a>
                    </div>
                    {/*-------------------------------------------------------------------*/}
                                                {/*=== Menu*/}
                    {/*-------------------------------------------------------------------*/}
                    <div className="-mr-2 -my-2 md:hidden">
                        <Menu>
                            <MenuHandler>
                                <Button variant="gradient" className={"flex"}>Menu&nbsp;{downIcon}</Button>
                            </MenuHandler>
                            <MenuList>
                                <MenuItem>
                                    <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                        <Typography>Docs</Typography>
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                        <Typography>Demo</Typography>
                                    </a>
                                </MenuItem>
                                <Menu placement="right-start" offset={15}>
                                    <MenuHandler>
                                        <MenuItem>
                                            <Typography className="text-base font-medium text-gray-500 hover:text-gray-900">Features</Typography>
                                        </MenuItem>
                                    </MenuHandler>
                                    <MenuList>
                                        {features.map(feature=>{
                                            return(
                                                <MenuItem>
                                                    <a href={feature.href} className={"flex items-center"}>
                                                        <Typography>{feature.name}</Typography>
                                                    </a>
                                                </MenuItem>)
                                        })}
                                    </MenuList>
                                </Menu>
                            </MenuList>
                        </Menu>
                    </div>
                    {/*-------------------------------------------------------------------*/}
                                                {/*Features*/}
                    {/*-------------------------------------------------------------------*/}
                    <Popover.Group as="nav" className="hidden md:flex space-x-10">
                        <Menu>
                            <MenuHandler>
                                <Button variant="gradient" size={"sm"} className={"flex"}>Features&nbsp;{downIcon}</Button>
                            </MenuHandler>
                            <MenuList>
                                {features.map(feature=>{
                                    return(
                                        <MenuItem>
                                            <a href={feature.href} className={"flex items-center"}>
                                                <Typography>{feature.name}</Typography>
                                            </a>
                                        </MenuItem>)
                                })}
                            </MenuList>
                        </Menu>
                        {/*-------------------------------------------------------------------*/}
                                                        {/*Pricing*/}
                        {/*-------------------------------------------------------------------*/}
                        <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                            <Typography>Demo</Typography>
                        </a>
                        {/*-------------------------------------------------------------------*/}
                                                        {/*Docs*/}
                        {/*-------------------------------------------------------------------*/}
                        <a href="https://www.github.com" className="text-base font-medium text-gray-500 hover:text-gray-900">
                            <Typography>Docs</Typography>
                        </a>


                    </Popover.Group>
                    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 gap-2 w-3">
                        <Input size="md" variant="outlined" label="Room ID" icon={<i className="fas fa-heart" />} onKeyDown={roomPress} onChange={roomChange}/>
                        <Button variant="gradient" size="sm" onClick={roomSubmit}>
                            Join
                        </Button>
                    </div>
                </div>
            </div>
        </Popover>
    )
}

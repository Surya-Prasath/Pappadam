import React, {useState} from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    Typography, Input, Button, PopoverHandler, PopoverContent, Popover, TabPanel
} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";

const HomePage = ()=>{
    const features = ["Youtube", "Spotify", "Netflix", "Something", "Nothing"]
    const navigate = useNavigate()
    const [id, setId] = useState("public");
    const [feature, setFeature] = useState("Youtube")

    const idChange = (event)=>{
        setId(event.target.value)
    }

    const featureChange = (event)=>{
        setFeature(event.target.innerHTML)
    }
    const press = (event)=>{
        if (event.key==="Enter"){
            submit()
        }
    }
    const submit = ()=>{
        navigate("/testing", {state: {feature: feature, roomId: id}})
    }
    return (
        <div className="home-page relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
                <img src="https://play.tailwindcss.com/img/beams.jpg" alt="" className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308"/>
                <div className="absolute inset-0 bg-[url(https://play.tailwindcss.com/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]">
                </div>
            <div className="relative bg-transparent px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                <div className="mx-auto max-w-md">
                    <div className="divide-y divide-gray-300/50">
                        <Popover >
                            <PopoverHandler className={"border-2"}>
                                <Button variant="gradient" size={"sm"}>Select the app you want to use</Button>
                            </PopoverHandler>
                            <PopoverContent>
                                Welcome to Paraplay.
                            </PopoverContent>
                        </Popover>
                        <div className="space-y-6 py-8 text-base leading-7 text-blue-600">
                            {/*-----------------------------------------------------------------------------*/}
                            {/*Features*/}
                            {/*-----------------------------------------------------------------------------*/}
                            <Tabs value="html">
                                <TabsHeader className={"gap-3 w-fit"} >
                                    {features.map(option=> (
                                        <Tab key={option} value={option} onClick={featureChange}>
                                            <Typography>{option}</Typography>
                                        </Tab>
                                    ))}
                                </TabsHeader>
                                <TabsBody className={"backdrop-blur"} >
                                    {features.map(option=> (
                                        <TabPanel key={option} value={option} className={"flex gap-2"} >
                                            <Input size="md" variant="outlined" label="Room ID" color="pink" icon={<i className="fas fa-heart" />} onChange={idChange} onKeyPress={press}/>
                                            <Button variant="gradient" size="sm" color={"pink"} onClick={submit}>
                                                Create
                                            </Button>
                                        </TabPanel>
                                    ))}
                                </TabsBody>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
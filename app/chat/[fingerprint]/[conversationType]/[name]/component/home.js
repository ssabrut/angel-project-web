'use client'
import { useState, useEffect, useRef } from "react";
import useSWR from 'swr';
import axios from "axios";
import { useRouter } from 'next/navigation'

import ChatArea from "./chat-area";


export default function HomeArea({name, fingerprint, conversationType}) {
    const router = useRouter()

    const [messages, setMessages] = useState([]);
    const bottomRef = useRef(null);
    const [nextMessage, setNextMessage] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
      }, [messages]);

    const { isLoading } = useSWR(`/api/conversation/${fingerprint}/${conversationType}`, (url) => {
        return axios.get(url, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(({data}) => {
            return data.data;
        }).then((data) => {
            setMessages(data.messages);
            return data;
        })
    });

    const handleSubmitNextMessage = () => {
        const bodyPayload = {
            "message": nextMessage
        };
        const messageArr = [
            {
                "role": "user",
                "content": nextMessage
            }
        ]
        setMessages([
            ...messages,
            ...messageArr
        ]);
        setNextMessage("");
        setLoading(true);
        axios.post(`/api/conversation/${fingerprint}/${conversationType}/message`, bodyPayload, {
            headers: {
                "Content-Type": "application/json", 
            }
        }).then(({data}) => {
            return data.data;
        }).then((data) => {
            setMessages([
                ...messages,
                ...[
                    {
                        "role": "user",
                        "content": nextMessage
                    },
                    {
                        "role": "assistant",
                        "content": data.message.content
                    }
                ]
            ]);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        })
    }

    const handleBacktoHome = () => {
        router.push(`/`);
    }   
    

    return (
        <>
            <div className="card block w-full flex bg-base-100 shadow-xl rounded-nonep-2">
                <button className="btn rounded-none" data-theme="cupcake" onClick={handleBacktoHome}>Home</button>
            </div>
            <div className="card block w-full h-5/6 flex bg-base-100 shadow-xl rounded-none overflow-y-auto p-2">
                <ChatArea name={name} messages={messages} isLoading={isLoading ? isLoading : loading} conversationType={conversationType} />
                <div ref={bottomRef} />
            </div>
            <div className="card block w-full h-1/6 flex bg-base-100 shadow-xl rounded-none" data-theme="cupcake">
                <div className="w-full flex flex-row card-body justify-center items-center align-center ">
                    <div className="w-3/4">
                        <input type="text" placeholder="Type here" className="input input-bordered input-lg w-full rounded-lg" value={nextMessage} onChange={(e) => {
                            setNextMessage(e.target.value);
                        }}/>
                    </div>
                    <div className="card-actions flex w-1/4 items-center align-center justify-center">
                        <button className="btn w-full btn-primary rounded-lg h-16" onClick={handleSubmitNextMessage}>Send</button>
                    </div>
                </div>
            </div>
        </>
    )
}
import { Queue } from "../domain/queue";
import { useEffect, useState } from "react";

type useQueueReturn =[Queue,(num:number)=>void]

const getQueue = () => {
    return localStorage.getItem('previousGuesses')?  JSON.parse(localStorage.getItem('previousGuesses')|| '{}') as [Array<number>,number]: null
}

export function useQueue():useQueueReturn{
    const [queue,setQueue] = useState<Queue>(new Queue(getQueue()));

    const updateQueue = (num:number) =>{
        queue.enqueue(num)
        console.log(queue.queue)
        setQueue(new Queue([queue.queue,queue.tail]))
    }


    useEffect(()=>{
        localStorage.setItem('previousGuesses',JSON.stringify([queue.queue,queue.tail]))
    },[queue.queue,queue.tail])

    return [
        queue,
        updateQueue
    ]
}
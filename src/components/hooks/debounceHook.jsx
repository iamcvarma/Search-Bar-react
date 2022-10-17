import { useEffect,useState } from "react";


export function useDebounce(value,timeout,callback){
    const [timer,setTimer] = useState(null);

    useEffect(()=>{
        clearTimer();
        if (value && callback){
            const newTimer= setTimeout(callback,timeout)
            setTimer(newTimer)
        }
    },[value])

    function clearTimer(){
        if (timer){
            clearTimeout(timer)
        }
    }

}
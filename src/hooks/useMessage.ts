import { useContext, useEffect } from "react"
import { MessageContext } from "@site/src/components/Providers/Message/MessageProvider"
import { toast } from "react-toastify";

const useMessage = () => {

    if(!MessageContext){
        return {}
    }

    const {message, setMessage} = useContext(MessageContext);

    useEffect(() => {
        if(message.text)
        {
           switch(message.type){
            case "error":
                toast["error"](message.text);
                break;
            case "info":
                toast["info"](message.text);
                break;
            case "success":
                toast["success"](message.text);
                break;
            case "warn":
                toast["warn"](message.text);
                break;
            case "warning":
                toast["warning"](message.text);
                break;
           }
        }
    }, [message])

    return {
        message,
        setMessage
    }

}

export {useMessage};
import { createContext, useState } from "react"
import { MESSAGE } from "./types"
import { DEFAULT_CONTEXT, DEFAULT_VALUE } from "./constants";

interface IMessageProvider {
    children: React.ReactNode
}

export const MessageContext = createContext(DEFAULT_CONTEXT);

const MessageProvider = ({children}:IMessageProvider) => {


    const [message, setMessage] = useState<MESSAGE>(DEFAULT_VALUE);
    return (
        <MessageContext.Provider value={{message, setMessage}}>
            {children}
        </MessageContext.Provider>
    )

}

export default MessageProvider;
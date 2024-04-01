import { useQuery } from "@tanstack/react-query";
import { useMessage } from "./useMessage";
import {DEFAULT_REACT_QUERY_OPTIONS} from "@site/src/configs/reactQuery.config";
import { useEffect } from "react";

export const useQueryConfigured = <T>(fnProps:Object, 
    queryKey?:string,
    fetchFn?: (fnProps:Object) => any,
    enabled: boolean = true ) => {

    const {setMessage, message} = useMessage();

    const {data, isError, error} = useQuery({queryKey:[queryKey, Object.values(fnProps)], 
        queryFn: () => fetchFn(fnProps), ...DEFAULT_REACT_QUERY_OPTIONS, enabled});

    useEffect(() => {
        if(isError && (message === null || message.text === null))
            setMessage({text:error.message, type:"error"});
        else if(!isError)
            setMessage({text:null, type:null});
    }, [isError])

    return {data: data as T};

}
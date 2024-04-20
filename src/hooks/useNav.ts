import useIsBrowser from "@docusaurus/useIsBrowser";
import { useEffect, useState } from "react";

const useNav = (items) => {
    const isBrowser = useIsBrowser();
    const [activatePageName, setActivatePageName] = useState(null);

    if(items?.length === 0)
      return {activatePageName}

    useEffect(() => {
      if(isBrowser)
      {
        const currentPathname = window.location.pathname;
        const foundActivePageName = items?.find(item => item.href === currentPathname)?.href;
  
        if(foundActivePageName)
          setActivatePageName(foundActivePageName)
      }
    }, [isBrowser])

    return {
        activatePageName
    }
}

export {useNav};
// eslint-disable-next-line import/no-unresolved
import useIsBrowser from "@docusaurus/useIsBrowser";
import { useEffect, useMemo, useState } from "react";
function useMediaQuery(query: string) {
  const isBrowser = useIsBrowser();
  const mediaQuery = useMemo<MediaQueryList | null>(() => {
    if (isBrowser) {
      return window.matchMedia(query);
    }
    return null;
  }, [isBrowser, query]);

  const [match, setMatch] = useState(mediaQuery?.matches);

  useEffect(() => {
    const onChange = () => setMatch(mediaQuery?.matches);
    mediaQuery?.addEventListener("change", onChange);

    return () => mediaQuery?.removeEventListener("change", onChange);
  }, [mediaQuery]);

  return match || mediaQuery?.matches;
}

export default useMediaQuery;

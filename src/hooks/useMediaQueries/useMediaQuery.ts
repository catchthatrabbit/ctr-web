import useIsBrowser from '@docusaurus/useIsBrowser';
import { useEffect, useMemo, useState } from 'react';

function useMediaQuery(query: string) {
  const isBrowser = useIsBrowser();
  const mediaQuery = useMemo<MediaQueryList | null>(() => {
    if (isBrowser) {
      return window.matchMedia(query);
    }
    return null;
  }, [isBrowser, query]);

  const [match, setMatch] = useState(mediaQuery?.matches || false);

  useEffect(() => {
    if (!mediaQuery) return;

    const onChange = () => {
      setMatch(mediaQuery.matches);
    };

    // Set the initial state
    setMatch(mediaQuery.matches);

    mediaQuery.addEventListener('change', onChange);

    return () => {
      mediaQuery.removeEventListener('change', onChange);
    };
  }, [mediaQuery, query]);

  return match;
}

export default useMediaQuery;

import useIsBrowser from '@docusaurus/useIsBrowser';
import { useEffect, useState } from 'react';

interface NavItem {
  href: string;
  [key: string]: any;
}

const useNav = (items: NavItem[]) => {
  const isBrowser = useIsBrowser();
  const [activatePageName, setActivatePageName] = useState<string | null>(null);

  useEffect(() => {
    if (isBrowser) {
      const currentPathname = window.location.pathname;
      const foundActivePageName = items?.find(
        (item: NavItem) => item.href === currentPathname
      )?.href;

      if (foundActivePageName) setActivatePageName(foundActivePageName);
    }
  }, [isBrowser, items]);

  if (items?.length === 0) return { activatePageName };

  return {
    activatePageName,
  };
};

export { useNav };

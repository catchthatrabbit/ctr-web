/* eslint-disable import/no-unresolved */
import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import isInternalUrl from "@docusaurus/isInternalUrl";
import IconExternalLink from "@theme/Icon/ExternalLink";

import clsx from "clsx";

import customStyles from "./customStyles.module.css";

export default function FooterLinkItem({ item }) {
  const { to, href, label, prependBaseUrlToHref, ...props } = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
  return (
    <>
      <Link
        className={clsx("footer__link-item", customStyles.footerLink)}
        {...(href
          ? {
              href: prependBaseUrlToHref ? normalizedHref : href,
            }
          : {
              to: toUrl,
            })}
        {...props}
      >
        {label}
        {href && !isInternalUrl(href) && <IconExternalLink />}
      </Link>
    </>
  );
}

import React from "react";
import LinkItem from "@theme/Footer/LinkItem";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import clsx from "clsx";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";

import customStyles from "./customStyles.module.css";

function ColumnLinkItem({ item }) {
  return item.html ? (
    <li
      className="footer__item"
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: item.html }}
    />
  ) : (
    <li key={item.href ?? item.to} className="footer__item">
      <LinkItem item={item} />
    </li>
  );
}
function Column({ column }) {
  const { mobile, desktop } = useMediaQueries();
  return (
    <div
      className={clsx("col", customStyles.removePaddingInline, {
        footer__col: desktop,
        [customStyles.alignCenter]: mobile,
      })}
    >
      <Spacer variant="md" />
      <div className={clsx("footer__title", customStyles.title)}>
        {column.title}
      </div>
      <ul
        className={clsx("footer__items clean-list", customStyles.footerItem, {
          [customStyles.footerItemMobile]: mobile,
        })}
      >
        {column.items.map((item, i) => (
          <ColumnLinkItem key={i} item={item} />
        ))}
      </ul>
    </div>
  );
}
export default function FooterLinksMultiColumn({ columns }) {
  return (
    <div className="">
      {columns.map((column, i) => (
        <Column key={i} column={column} />
      ))}
    </div>
  );
}

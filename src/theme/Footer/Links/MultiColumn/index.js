import React from "react";
// eslint-disable-next-line import/no-unresolved
import LinkItem from "@theme/Footer/LinkItem";
import clsx from "clsx";

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
  return (
    <div className={clsx("col footer__col", customStyles.removePaddingInline)}>
      <div className={clsx("footer__title", customStyles.title)}>
        {column.title}
      </div>
      <ul
        className={clsx(["footer__items clean-list", customStyles.footerItem])}
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
    <div className="grid grid-col--3 grid-col-gap">
      {columns.map((column, i) => (
        <Column key={i} column={column} />
      ))}
    </div>
  );
}

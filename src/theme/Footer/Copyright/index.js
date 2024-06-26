import React from "react";
import clsx from "clsx";

import customStyles from "./customStyles.module.css";

export default function FooterCopyright({ copyright }) {
  return (
    <div
      className={clsx(customStyles.customLogoCopyWrite, "footer__copyright")}
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: copyright }}
    />
  );
}

import React from "react";
import clsx from "clsx";

import customStyles from "./customStyles.module.css";

export default function FooterCopyright({ copyright }) {
  return (
    <div
      className={clsx(customStyles.customLogoCopyWrite, "footer__copyright")}
      dangerouslySetInnerHTML={{ __html: copyright }}
    />
  );
}

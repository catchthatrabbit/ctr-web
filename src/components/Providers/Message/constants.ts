import React from "react";
import { MESSAGE } from "./types";

export const DEFAULT_VALUE = { text: null, type: "info" } as MESSAGE;

export const DEFAULT_CONTEXT = {
  message: {} as MESSAGE,
  setMessage: (() => null) as React.Dispatch<React.SetStateAction<MESSAGE>>,
};

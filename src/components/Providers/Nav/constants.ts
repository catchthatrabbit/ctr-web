import React from "react";
import { NAV } from "./types";

export const DEFAULT_VALUE = {activePageName:""} as NAV;

export const DEFAULT_CONTEXT = {message:{} as NAV, setMessage:(() => null) as React.Dispatch<React.SetStateAction<NAV>>}
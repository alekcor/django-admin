import { createContext } from "react";
import {Registered} from "../types/types";

export const RegisteredContext = createContext<Registered[]>([]);

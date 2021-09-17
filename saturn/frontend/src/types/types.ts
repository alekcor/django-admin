import { ReactChild, ReactChildren } from "react";

export interface ChildrenProps {
  children: ReactChild | ReactChildren;
}

export interface MatchParams {
  appName?: string;
  modelName?: string;
  id?: string;
}

export interface IAddChangeForm {
  [key: string]: string;
}

export interface Registered {
  name: string;
  app_label: string;
  app_url: string;
  models: [];
}

export interface Items {
  items:Registered[]
}

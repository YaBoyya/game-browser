import { ReactNode } from "react";

export interface CredentialsProps {
  username: string;
  // email is missing because it's not a necessary prop so it's be typed as undefined
  // and mapped index type cannot be undefined
  password: string;
  [key: string]: string;
}

export interface ChildrenProps {
  children: ReactNode;
}

export interface FormWrapperProps {
  children: ReactNode;
  label: string | null;
}

export interface RenderFormProps {
  data: CredentialsProps;
  handleInput: Function
}

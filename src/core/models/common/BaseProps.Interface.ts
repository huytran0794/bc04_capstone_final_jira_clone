import { FormInstance } from "antd";
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface FormComponentProps extends BaseProps {
  name?: string;
}

export interface EditorProps extends FormComponentProps {
  formInstance?: FormInstance;
}

export interface ButtonLocalProps extends BaseProps {
  baseColor?:
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "teal"
    | "blue"
    | "indigo"
    | "purple"
    | "pink";
  handleOnClick: () => void;
}

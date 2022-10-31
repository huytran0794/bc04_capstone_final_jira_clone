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

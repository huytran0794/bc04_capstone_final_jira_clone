import { SizeType } from "antd/lib/config-provider/SizeContext";
import { FormLayout } from "antd/lib/form/Form";

// import local interface
import { InterfaceProject } from "../Project/Project.interface";

export interface FormProps {
  layout?: FormLayout;
  size?: SizeType;
}

export interface InterfaceProjectFormComponent extends FormProps {
  project?: InterfaceProject;
  confirmText: string;
  handleOnFinish: (value: any) => void;
}

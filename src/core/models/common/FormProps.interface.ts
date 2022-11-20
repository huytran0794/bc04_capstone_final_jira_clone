import { SizeType } from "antd/lib/config-provider/SizeContext";
import { FormLayout } from "antd/lib/form/Form";
// import local interface
import { InterfaceProject, IProjectDetail } from "../Project/Project.interface";
import { ITask } from "../Task/Task.Interface";

export interface FormProps {
  layout?: FormLayout;
  size?: SizeType;
}

export interface InterfaceFromEditComponent extends FormProps {
  project: InterfaceProject;
}
export interface InterfaceProjectFormComponent extends FormProps {
  project?: InterfaceProject;
  confirmText: string;
  handleOnFinish: (value: any) => void;
}

export interface ITaskForm extends FormProps {
  project?: InterfaceProject;
  task?: ITask;
  buttonText?: string;
  handleOnFinish: (value: any) => void;
}

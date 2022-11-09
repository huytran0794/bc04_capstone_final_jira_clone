import { User } from "../User/User.interface";

export interface InterfaceCreator {
  name: string;
  id: number;
}

export interface InterfaceProject {
  id: number;
  alias: string;
  categoryId: number;
  categoryName: string;
  projectName: string;
  description: string;
  creator: InterfaceCreator;
  members: Partial<User>[];
  deleted: boolean;
}

export interface InterfaceProjectUpdate {
  id: number;
  projectName: string;
  creator: number;
  description: string;
  categoryId: string;
}

export interface InterfaceProjectEditComponent {
  project: InterfaceProject;
}

export interface InterfaceProjectActionButtonsComponent {
  project: InterfaceProject;
}

export interface InterfaceProjectMembersComponent {
  projectID: number;
  projectName: string;
  members: Partial<User>[];
}

export interface InterfaceProjectMembersShowAllComponent {
  projectID: number;
  members: Partial<User>[];
}

export interface InterfaceProjectMembersAddNewComponent {
  projectID: number;
  projectName: string;
}

export interface InterfaceProjectMobileSetting {
  project: InterfaceProject;
}

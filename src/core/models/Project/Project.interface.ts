import { User } from "../User/User.interface";

export interface InterfaceCreator {
  name: string;
  id: number;
}

export interface InterfaceMember {
  userId: number;
  name: string;
  avatar: number;
}

export interface InterfaceProject {
  id: number;
  alias: string;
  categoryId: number;
  categoryName: string;
  projectName: string;
  description: string;
  creator: InterfaceCreator;
  members: InterfaceMember[];
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
  // setAllProjects: React.Dispatch<
  //   React.SetStateAction<InterfaceProject[] | undefined>
  // >;
}

export interface InterfaceProjectMembersComponent {
  projectID: number;
  projectName: string;
  members: InterfaceMember[];
}

export interface InterfaceProjectMembersShowAllComponent {
  projectID: number;
  members: InterfaceMember[];
}

export interface InterfaceProjectMembersAddNewComponent {
  projectID: number;
  projectName: string;
}

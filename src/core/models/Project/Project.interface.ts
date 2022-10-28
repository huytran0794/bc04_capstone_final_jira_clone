import { User } from "../User/User.interface";

export interface InterfaceMember {
  avatar: string;
  name: string;
  userId: number;
}

export interface InterfaceProject {
  id: number;
  alias: string;
  categoryId: number;
  categoryName: string;
  projectName: string;
  description: string;
  creator: Partial<User>;
  // creator (only id and name)
  members: Array<InterfaceMember>;
  deleted: boolean;
}

export interface InterfaceProjectEditComponent {
  project: InterfaceProject;
}

export interface InterfaceProjectActionButtonsComponent {
  project: InterfaceProject;
  setAllProjects: React.Dispatch<
    React.SetStateAction<InterfaceProject[] | undefined>
  >;
}

export interface InterfaceProjectMembersComponent {
  projectID: number;
  members: Array<InterfaceMember>;
}

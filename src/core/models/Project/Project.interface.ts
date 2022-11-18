import { User } from "../User/User.interface";

export interface InterfaceCreator {
  name: string;
  id: number;
}

interface InterfaceProjectCategory {
  name: string;
  id: number;
}

export interface InterfaceProject {
  id: number;
  alias: string;
  categoryId: number;
  categoryName: string;
  projectCategory: InterfaceProjectCategory;
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
  members: Partial<User>[];
  handleDeleteMember: (memberID: number) => void;
  containerStyle?: string;
  title?: string;
}

export interface InterfaceProjectMembersAddNewComponent {
  isMobile?: boolean;
  title?: string;
  projectName?: string;
  containerClassName?: string;
  userListClassName?: string;
  handleAssignUser: (userID: number) => void;
}

export interface InterfaceProjectMobileSetting {
  projectID: number;
  setOpenModalSetting: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface InterfaceProjectMobileMembers {
  project: InterfaceProject;
  setProject: React.Dispatch<React.SetStateAction<InterfaceProject | null>>;
}

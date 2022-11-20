export interface User {
  userId?: number;
  email: string;
  passWord: string;
  name: string;
  phoneNumber: string;
  accessToken?: string;
  avatar?: string;
}

export interface UserInterface extends User {
  action?: React.ReactNode;
}

export interface InterfaceUserTableProps {
  userList: UserInterface[];
}

export interface InterfaceUserActionProps {
  user: UserInterface;
  onSuccess: () => void;
}

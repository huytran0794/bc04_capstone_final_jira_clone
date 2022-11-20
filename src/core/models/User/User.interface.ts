export interface User {
  userId?: number;
  email: string;
  passWord: string;
  name: string;
  phoneNumber: string;
  accessToken?: string;
  avatar?: string;
  action?: React.ReactNode;
}

export interface InterfaceUserTableProps {
  userList: User[];
}

export interface InterfaceUserActionProps {
  userId: any;
  onSuccess: () => void;
}

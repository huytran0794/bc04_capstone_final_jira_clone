import React from "react";
import USER_SERVICE from "./../../../core/services/userServ";
import { InterfaceUserActionProps } from "./../../../core/models/User/User.interface";
import toastify from "./../../../core/utils/toastify/toastifyUtils";
import { Popconfirm } from "antd";
import {
  DeleteOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

export default function UserAction({
  userId,
  onSuccess,
}: InterfaceUserActionProps) {
  let handleDeleteUser = () => {
    USER_SERVICE.deleteUser(userId)
      .then((res) => {
        toastify("success", "Delete user successfully!");
        onSuccess();
      })
      .catch((err) => {
        toastify("error", err.response.data.message);
      });
  };

  return (
    <div className="space-x-2">
      <button>
        <FormOutlined className="text-blue-500 text-2xl" />
      </button>

      <Popconfirm
        title={
          <span className="text-lg pl-1">
            Are you sure you want to delete this user?
          </span>
        }
        onConfirm={handleDeleteUser}
        okText="Yes"
        cancelText="No"
        icon={<QuestionCircleOutlined className="top-1 text-red-500 text-xl" />}
      >
        <DeleteOutlined className="text-red-500 text-2xl" />
      </Popconfirm>
    </div>
  );
}

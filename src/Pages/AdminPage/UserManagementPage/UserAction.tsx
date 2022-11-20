import React from "react";
import USER_SERVICE from "./../../../core/services/userServ";
import { InterfaceUserActionProps } from "./../../../core/models/User/User.interface";
import toastify from "./../../../core/utils/toastify/toastifyUtils";

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
      <button
        onClick={handleDeleteUser}
        className="px-5 py-2 rounded bg-red-500 text-white"
      >
        Delete
      </button>
      <button className="px-5 py-2 rounded bg-blue-500 text-white">Edit</button>
    </div>
  );
}

import React from "react";

/* import antd components */
import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

/* import react router dom packages */
import { NavLink } from "react-router-dom";

/* import local components */
import Label from "./Label/Label";

/* import local interface */
import { FormProps } from "../../constant/Intefaces/FormProps.interface";

const LoginForm = ({ layout = "horizontal", size = "large" }: FormProps) => {
  const onFinish = () => {
    // login function
  };
  const onFinishFailed = () => {};
  const labelItem = (labelText: string) => (
    <Label className="text-lg font-medium text capitalize">{labelText}</Label>
  );
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout={layout}
      size={size}
    >
      <Form.Item
        label={labelItem("Email")}
        name="email"
        rules={[
          {
            required: true,
            message: "Please do not leave ${name} empty",
          },
          {
            type: "email",
            message: "Please input correct email format for ${name}",
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Johndoe@email.com"
        />
      </Form.Item>
      <Form.Item
        name="passWord"
        label={labelItem("Passwords")}
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Enter your passwords"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button mr-4"
        >
          Sign in
        </Button>
        <span className="txt">Or</span>
        <NavLink
          to="register"
          className="link inline-block ml-4 underline text-lg text-indigo-400 hover:text-red-500 transition-all duration-1000"
        >
          Register now
        </NavLink>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;

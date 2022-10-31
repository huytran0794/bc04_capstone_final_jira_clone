import { useEffect } from "react";

/* import antd components */
import { Button, Form, Input, Select } from "antd";

/* import local interface */
import { FormProps } from "../../models/common/FormProps.interface";

import { useAppDispatch, useAppSelector } from "../../hooks/redux/useRedux";
import { InterfaceProject } from "../../models/Project/Project.interface";
import Label from "./Label/Label";
import CustomEditor from "../tinyEditor/CustomEditor";
import { useFetchProjectCatList } from "../../hooks/ProjectHooks/useFetchProjectCatList";
import { createAlias } from "../../utils/string.utils";

import { spinnerActions } from "../../redux/slice/spinnerSlice";
import { useNavigate } from "react-router-dom";
import { projectActions } from "../../redux/slice/projectSlice";
import toastify from "../../utils/toastify/toastifyUtils";
import PROJECT_SERVICE from "../../services/projectServ";

const ProjectFormEdit = ({
  layout = "horizontal",
  size = "large",
}: FormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useFetchProjectCatList(dispatch);
  const projectCategoryList = useAppSelector(
    (state) => state.projectCategoryReducer.projectCategoryArr
  );

  const [form] = Form.useForm();
  const { Option } = Select;
  const onFinish = (values: InterfaceProject) => {
    values.alias = createAlias(values.projectName);

    dispatch(spinnerActions.setLoadingOn());
    PROJECT_SERVICE.createProject(values)
      .then((res) => {
        dispatch(projectActions.createProject(res.content));
        toastify("success", "Create project successfully !");
        setTimeout(() => {
          navigate("/projectmanagement", { replace: true });
          dispatch(spinnerActions.setLoadingOff());
        }, 2500);
      })
      .catch((err) => {
        setTimeout(() => {
          toastify("error", err.response.data.message);
          dispatch(spinnerActions.setLoadingOff());
        }, 2500);
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  const initialValues = {
    categoryId: projectCategoryList[0]?.id || 1,
  };

  const formProps = { form, onFinish, layout, size, initialValues };
  const labelItem = (labelText: string) => (
    <Label className="text-sm font-medium text-pickled-bluewood-400 capitalize">
      {labelText}
    </Label>
  );

  return (
    <Form name="project_form" className="myform projectForm" {...formProps}>
      <Form.Item
        name="projectName"
        rules={[
          {
            required: true,
            message: "Please do not leave ${name} empty",
          },
          { max: 80, message: "Project name can't extend 80 characters." },
        ]}
        label={labelItem("name")}
      >
        <Input
          placeholder="My project..."
          className="py-2 px-5 rounded-md"
          name="projectName"
        />
      </Form.Item>
      <Form.Item name="description" label={labelItem("description")}>
        <CustomEditor formInstance={form} />
      </Form.Item>
      <Form.Item name="categoryId" label={labelItem("Project Category")}>
        <Select className="select-category">
          {/* map project category list */}
          {projectCategoryList.map((cat, idx) => {
            return (
              <Option key={cat.id.toString() + idx} value={cat.id}>
                {cat.projectCategoryName}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item className="form-btn-group">
        <Button
          type="primary"
          htmlType="submit"
          className="btn-login bg-science-blue-500 text-white border-none rounded-[4px] hover:bg-[#0065ff] font-semibold text-base transition-all duration-[400ms] order-2"
        >
          Update project
        </Button>
        <Button
          htmlType="button"
          onClick={onReset}
          className="btn-reset btn-txt--underlined border-none text-[#6B778C] text-base order-1"
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProjectFormEdit;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux/useRedux";
import { spinnerActions } from "../../redux/slice/spinnerSlice";
import { generalActions } from "../../redux/slice/generalSlice";

// import custom Hooks
import { useFetchProjectCatList } from "../../hooks/ProjectHooks/useFetchProjectCatList";

// import local services
import PROJECT_SERVICE from "../../services/projectServ";

/* import local interface */
import { InterfaceFromEditComponent } from "../../models/common/FormProps.interface";
import { InterfaceProjectUpdate } from "../../models/Project/Project.interface";

// import local component
import Label from "./Label/Label";
import toastify from "../../utils/toastify/toastifyUtils";

/* import antd components */
import { Button, Form, Input, Select } from "antd";

// import other component
import CustomEditor from "../tinyEditor/CustomEditor";

const ProjectFormEdit = ({
  layout = "horizontal",
  size = "large",
  project,
}: InterfaceFromEditComponent) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const projectCategoryList = useAppSelector(
    (state) => state.projectCategoryReducer.projectCategoryArr
  );

  const [form] = Form.useForm();
  const { Option } = Select;
  const initialValues = {
    categoryId: project.categoryId,
    projectName: project.projectName,
    description: project.description,
  };

  useFetchProjectCatList(dispatch);
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const onFinish = (values: InterfaceProjectUpdate) => {
    dispatch(spinnerActions.setLoadingOn());
    const updateProject = {
      ...values,
      id: project.id,
      creator: project.creator.id,
    };
    PROJECT_SERVICE.update(project.id, updateProject)
      .then((res) => {
        toastify("success", "Updated project successfully !");
        dispatch(generalActions.closeDrawer());
        dispatch(PROJECT_SERVICE.getAllAndDispatch(null));
        dispatch(spinnerActions.setLoadingOff());
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

  const formProps = { form, onFinish, layout, size };
  const labelItem = (labelText: string) => (
    <Label className="text-sm font-medium text-pickled-bluewood-400 capitalize">
      {labelText}
    </Label>
  );

  // console.log("Edit Form Rendered");
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
        <CustomEditor formInstance={form} initialValue={project.description} />
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

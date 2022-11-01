import { useNavigate } from "react-router-dom";

// import redux
import { useAppDispatch } from "../../../core/hooks/redux/useRedux";
import { projectActions } from "../../../core/redux/slice/projectSlice";
import { spinnerActions } from "../../../core/redux/slice/spinnerSlice";

// import local component
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";
import ProjectForm from "../../../core/Components/Forms/ProjectForm";

// import local Services
import PROJECT_SERVICE from "../../../core/services/projectServ";

// import utils
import toastify from "../../../core/utils/toastify/toastifyUtils";

const CreateProjectPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOnFinish = (values: any) => {
    dispatch(spinnerActions.setLoadingOn());
    PROJECT_SERVICE.createProject(values)
      .then((res) => {
        dispatch(projectActions.createProject(res.content));
        toastify("success", "Create project successfully !");
        setTimeout(() => {
          navigate("/", { replace: true });
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

  const pageContent = (
    <div className="form-wrapper">
      <div className="form-body">
        <ProjectForm
          layout="vertical"
          size="large"
          confirmText="Create Project"
          handleOnFinish={handleOnFinish}
        />
      </div>
    </div>
  );
  return (
    <div className="create-project-page h-full">
      <SectionWrapper
        title="Add project-details"
        subTitle="You can change these details anytime in your project settings."
        content={pageContent}
      />
    </div>
  );
};

export default CreateProjectPage;
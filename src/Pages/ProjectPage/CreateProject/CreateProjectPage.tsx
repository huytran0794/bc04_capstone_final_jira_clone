import ProjectForm from "../../../core/Components/Forms/ProjectForm";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";

const CreateProjectPage = () => {
  const pageContent = (
    <div className="form-wrapper">
      <div className="form-body">
        <ProjectForm layout="vertical" size="large" />
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

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
      {/* <Container className="h-full">
        <div
          className={clsx(
            "wrapper",
            "flex justify-center items-center flex-col gap-10",
            "h-full",
            "max-w-xl mx-auto"
          )}
        >
          <h2 className="page-title font-bold tracking-wide text-center sm:text-5xl md:text-4xl text-4xl text-[#172B4D]">
            Add project details
          </h2>
          <div className="content w-full max-w-md">
            <div className="form-wrapper py-8 px-9">
              <div className="form-body mb-8">
                <ProjectForm layout="vertical" size="large" />
              </div>
            </div>
          </div>
        </div>
      </Container> */}
      <SectionWrapper
        title="Add project-details"
        subTitle="You can change these details anytime in your project settings."
        content={pageContent}
      />
    </div>
  );
};

export default CreateProjectPage;

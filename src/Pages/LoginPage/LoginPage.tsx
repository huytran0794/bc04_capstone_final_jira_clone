import clsx from "clsx";
import React from "react";
import Container from "../../core/Components/Container/Container";
import LoginForm from "../../core/Components/Forms/LoginForm";

/* import local components */

const LoginPage = () => {
  return (
    <div className="login-page h-full">
      <Container className="h-full">
        <div
          className={clsx(
            "wrapper",
            "flex justify-center items-center flex-col gap-10",
            "h-full",
            "max-w-[80%] mx-auto"
          )}
        >
          <h2 className="title font-bold uppercase tracking-wide text-center sm:text-5xl md:text-4xl text-4xl">
            Welcome to JIRA
          </h2>
          <div className="content w-[700px] max-w-full">
            <div className="form-header text-xl text-center uppercase font-semibold tracking-wide mb-10">
              login form
            </div>
            <LoginForm layout="vertical" size="large" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;

/* import react router dom v6 packages */
import { Route, Routes } from "react-router-dom";

import PrivateRoutes from "./core/routes/PrivateRoutes/PrivateRoutes";
import Spinner from "./core/Components/Spinner/Spinner";
import ProjectManagement from "./Pages/ProjectPage/ProjectManagement/ProjectManagement";

/* import local components */
import Layout from "./core/Layout/Layout";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import CreateProjectPage from "./Pages/ProjectPage/CreateProject/CreateProjectPage";

import GeneralDrawer from "./core/Components/Drawer/GeneralDrawer";

function App() {
  return (
    <>
      <Spinner />
      <GeneralDrawer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* Private routes */}
          <Route element={<PrivateRoutes />}>
            <Route index element={<ProjectManagement />} />
            <Route path="create-project" element={<CreateProjectPage />} />
            <Route path="profile" element={<ProfilePage />} />

          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

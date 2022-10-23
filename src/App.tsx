/* import react router dom v6 packages */
import { Route, Routes } from "react-router-dom";

/* import local components */
import Layout from "./core/Layout/Layout";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import PrivateRoutes from "./core/routes/PrivateRoutes/PrivateRoutes";
import Spinner from "./core/Components/Spinner/Spinner";

function App() {
  return (
    <>
      <Spinner />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* Private routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

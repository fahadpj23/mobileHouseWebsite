import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "pages/Home";
import MainLayout from "layout/mainLayout";

const PageRoute = () => {
  return (
    <div>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route index path="/" element={<HomePage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </div>
  );
};
export default PageRoute;

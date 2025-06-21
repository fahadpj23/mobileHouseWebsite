import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "layout/mainLayout";
import HomePage from "pages/home";
import Brand from "pages/brand";
import SingleItem from "pages/singleItem";
import SeriesList from "pages/seriesList";
import PageNotFound from "pages/404Page";
import SpecCreator from "pages/specCreator";
import Phones from "pages/phones";
import Products from "pages/adminPanel/products";
import AdminMainLayout from "layout/adminLayout";

const PageRoute = () => {
  return (
    <div>
      <BrowserRouter>
        {/* website Routes */}
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="brand/:brandName" element={<Brand />} />
            <Route path="series/:seriesList" element={<SeriesList />} />
            <Route path="specCreator" element={<SpecCreator />} />
            <Route path="Phones/:phoneType" element={<Phones />} />
            <Route
              path="phone/:productId/:productName"
              element={<SingleItem />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminMainLayout />}>
            <Route path="admin/products" element={<Products />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default PageRoute;

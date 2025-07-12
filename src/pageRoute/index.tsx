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
import Banner from "pages/adminPanel/banner";
import WhatsappAds from "pages/adminPanel/whatsappAds";
import Upcoming from "pages/adminPanel/upcoming";
import NewArrival from "pages/adminPanel/newArrival";
import Series from "pages/adminPanel/phoneSeries";
import Login from "pages/login";
import ProtectedRoute from "components/protectedRoute";
import { AuthRedirect } from "components/authRedirect";

const PageRoute = () => {
  return (
    <div>
      <BrowserRouter>
        {/* website Routes */}
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="brand/:brandName" element={<Brand />} />
            <Route path="series/:seriesId" element={<SeriesList />} />
            <Route path="specCreator" element={<SpecCreator />} />
            <Route path="Phones/:phoneType" element={<Phones />} />
            <Route
              path="phone/:productId/:productVariantId/:productColorId/:productName"
              element={<SingleItem />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route element={<AuthRedirect />}>
            <Route path="login" element={<Login />} />
          </Route>
          {/* Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminMainLayout />}>
              <Route path="admin/products" element={<Products />} />
              <Route path="admin/newArrival" element={<NewArrival />} />
              <Route path="admin/upcoming" element={<Upcoming />} />
              <Route path="admin/whatsappAds" element={<WhatsappAds />} />
              <Route path="admin/banner" element={<Banner />} />
              <Route path="admin/series" element={<Series />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default PageRoute;

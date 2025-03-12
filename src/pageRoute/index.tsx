import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "layout/mainLayout";
import HomePage from "pages/home";
import Brand from "pages/brand";
import SingleItem from "pages/singleItem";
import SeriesList from "pages/seriesList";
import PageNotFound from "pages/404Page";
import SpecCreator from "pages/specCreator";
import Phones from "pages/phones";
import PlaceOrder from "pages/placeOrder";

const PageRoute = () => {
  return (
    <div>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route path="brand/:brandName" element={<Brand />} />
              <Route path="series/:seriesList" element={<SeriesList />} />
              <Route path="specCreator" element={<SpecCreator />} />
              <Route path="Phones/:phoneType" element={<Phones />} />
              <Route
                path="phone/placeOrder/:productId"
                element={<PlaceOrder />}
              />
              <Route
                path="phone/:productId/:productName"
                element={<SingleItem />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </div>
  );
};
export default PageRoute;

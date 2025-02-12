import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "layout/mainLayout";
import HomePage from "pages/home";
import Brand from "pages/brand";
import SingleItem from "pages/singleItem";
import SeriesList from "pages/seriesList";
import PageNotFound from "pages/404Page";
import SpecCreator from "pages/specCreator";
import Phones from "pages/phones";
import { useEffect, useState } from "react";
import SplashScreen from "components/splashScreen";

const PageRoute = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return isLoading ? (
    <SplashScreen />
  ) : (
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

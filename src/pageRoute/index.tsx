import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import MainLayout from "layout/mainLayout";

// const HomePage = React.lazy(() => import("pages/home"));
// const NewArrival = React.lazy(() => import("pages/newArrival"));
// const SpecialOffer = React.lazy(() => import("pages/specialOffer"));
// const Brand = React.lazy(() => import("pages/brand"));
// const SingleItem = React.lazy(() => import("pages/singleItem"));
// const TrendingPhones = React.lazy(() => import("pages/trendingPhone"));
// const SeriesList = React.lazy(() => import("pages/SeriesList"));
// const SpecCreator = React.lazy(() => import("pages/specCreator"));
import HomePage from "pages/home";
import NewArrival from "pages/newArrival";
import SpecialOffer from "pages/specialOffer";
import Brand from "pages/brand";
import SingleItem from "pages/singleItem";
import TrendingPhones from "pages/trendingPhone";
import SeriesList from "pages/seriesList";
import PageNotFound from "pages/404Page";
import SpecCreator from "pages/specCreator";
const PageRoute = () => {
  return (
    <div>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route index path="/newArrival" element={<NewArrival />} />
            <Route index path="/specialOffer" element={<SpecialOffer />} />
            <Route index path="/trendingPhones" element={<TrendingPhones />} />
            <Route index path="brand/:brandName" element={<Brand />} />
            <Route index path="series/:seriesList" element={<SeriesList />} />
            <Route index path="specCreator" element={<SpecCreator />} />
            <Route
              index
              path="phone/:productId/:productName"
              element={<SingleItem />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </div>
  );
};
export default PageRoute;

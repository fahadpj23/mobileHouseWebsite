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
import SpecCreator from "pages/specCreator";
import SeriesList from "pages/seriesList";
import PageNotFound from "pages/404Page";
const PageRoute = () => {
  return (
    <div>
      <BrowserRouter>
        {/* <Suspense fallback={<div></div>}> */}
        <MainLayout>
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route index path="/newArrival" element={<NewArrival />} />
            <Route index path="/specialOffer" element={<SpecialOffer />} />
            <Route index path="/trendingPhones" element={<TrendingPhones />} />
            <Route index path="brand/:brandName" element={<Brand />} />
            <Route index path="series/:seriesList" element={<SeriesList />} />
            <Route path="*" element={<PageNotFound />} />
            <Route
              index
              path="phone/:productId/:productName"
              element={<SingleItem />}
            />
            <Route index path="specCreator" element={<SpecCreator />} />
          </Routes>
        </MainLayout>
        {/* </Suspense> */}
      </BrowserRouter>
    </div>
  );
};
export default PageRoute;

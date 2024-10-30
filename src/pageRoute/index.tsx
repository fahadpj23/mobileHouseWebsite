import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "pages/home";
import MainLayout from "layout/mainLayout";
import NewArrival from "pages/newArrival";
import SpecialOffer from "pages/specialOffer";
import Brand from "pages/brand";
import SingleItem from "pages/singleItem";
import SpecCreator from "pages/specCreator";

const PageRoute = () => {
  return (
    <div>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route index path="newArrival" element={<NewArrival />} />
            <Route index path="specialOffer" element={<SpecialOffer />} />
            <Route index path="brand/:brandName" element={<Brand />} />
            <Route index path="phone/:phoneName" element={<SingleItem />} />
            <Route index path="specCreator" element={<SpecCreator />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </div>
  );
};
export default PageRoute;

// import React, { Suspense, useEffect } from "react";
// import ImageSlider from "components/Home/imageSlider";
// import Brands from "components/Home/Brands";
// import { getSpecialOfferPhones } from "utils/getSpecialOfferPhone";
// import { getTrendingPhones } from "utils/getTrendingPhones";
// import { MAINBANNER } from "constants/mainBanner";

// import { getNewArrivalPhones } from "utils/getNewArrival";
// import AvailableEmi from "components/Home/availableEmi";
// import HomeSkeleton from "components/skeleton/homeSkeleton";
// import { useScreenSize } from "hooks/useScreenSize";
// import PopupAds from "components/commonComponents/popupAds";
// import { removeDuplicateSeries } from "utils/removeDuplicateSeries";
// import LazyLoad from "components/ScrollLoad";

// // const ProductMiniList = React.lazy(
// //   () => import("components/Home/productMiniList")
// // );
// // const WhatsappAds = React.lazy(() => import("components/Home/whatsappAds"));
// // const Banner = React.lazy(() => import("components/Home/banner"));
// // const Footer = React.lazy(() => import("components/Home/footer"));

// import ProductMiniList from "components/Home/productMiniList";
// import WhatsappAds from "components/Home/whatsappAds";
// import Banner from "components/Home/banner";
// import Footer from "components/Home/footer";
// import Upcoming from "components/Home/upcoming";
// import NewArrival from "components/Home/newArrival";

// const HomePage = () => {
//   const { isMobile } = useScreenSize();
//   const hasSeenPopup = localStorage.getItem("hasSeenPopup");

//   useEffect(() => {
//     fetch("/.netlify/functions/hello")
//       .then((response) => response.json())
//       .then((data) => console.log(data.message));
//   }, []);

//   return (
//     <div className="w-screen flex justify-center pb-6 ">
//       <div className=" w-full md:w-11/12 flex flex-col space-y-4 md:space-y-6">
//         {/* {isMobile && !hasSeenPopup && <PopupAds />} */}

//         <ImageSlider bannerItems={MAINBANNER} />

//         <Brands />
//         <AvailableEmi />
//         {/* <Suspense fallback={<HomeSkeleton />}> */}
//         <div className="p-2 bg-white ">
//           <ProductMiniList
//             title="New Arrival"
//             listItems={removeDuplicateSeries(getNewArrivalPhones())?.slice(
//               0,
//               7
//             )}
//             link="/newArrival"
//           />
//         </div>
//         <LazyLoad>
//           <Upcoming />
//         </LazyLoad>
//         <LazyLoad>
//           <NewArrival />
//         </LazyLoad>
//         <LazyLoad>
//           <div className="p-2 bg-white ">
//             <ProductMiniList
//               title="Trending Phones"
//               listItems={removeDuplicateSeries(getTrendingPhones())?.slice(
//                 0,
//                 7
//               )}
//               link="/trendingPhones"
//             />
//           </div>
//         </LazyLoad>
//         <LazyLoad>
//           <WhatsappAds />
//         </LazyLoad>
//         <LazyLoad>
//           <div>
//             <div className="p-2 bg-white ">
//               <ProductMiniList
//                 title="Special Offer"
//                 listItems={removeDuplicateSeries(
//                   getSpecialOfferPhones()
//                 )?.slice(0, 7)}
//                 link="/specialOffer"
//               />
//             </div>

//             <Footer />
//           </div>
//         </LazyLoad>

//         {/* </Suspense> */}
//       </div>
//     </div>
//   );
// };
// export default HomePage;
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";

interface Product {
  id?: string;
  name: string;
  price: string | number;
  description: string;
  images: string[];
}

interface HomePageProps {
  product?: Product | null;
}

const HomePage: React.FC<HomePageProps> = ({ product = null }) => {
  const [formData, setFormData] = useState<Product>({
    name: product?.name || "",
    price: product?.price || "",
    description: product?.description || "",
    images: product?.images || [],
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("Fd");
      try {
        const response = await axios.get("/.netlify/functions/products");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        console.log(false);
      }
    };

    fetchProducts();
  }, []);
  const handleImageUpload = async (files: File[]) => {
    setIsLoading(true);
    try {
      const newImages = [...formData.images];
      const newPreviews = [...previewImages];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onloadend = async () => {
          const base64Image = reader.result as string;
          const response: any = await axios.post(
            "/.netlify/functions/upload",
            `image=${encodeURIComponent(base64Image)}`,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          newImages.push(response.data.imageUrl);
          newPreviews.push(response.data.imageUrl);

          setFormData({ ...formData, images: newImages });
          setPreviewImages(newPreviews);
        };

        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const productData: Product = {
        ...formData,
        price: parseFloat(formData.price as string),
      };

      const url = "/.netlify/functions/products";
      const method = product ? "PUT" : "POST";
      const response = await axios({
        method,
        url,
        data: productData,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{product ? "Edit Product" : "Add New Product"}</h2>

      <div className="form-group">
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          step="0.01"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Product Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            e.target.files && handleImageUpload(Array.from(e.target.files))
          }
          disabled={isLoading}
        />

        <div className="image-previews">
          {previewImages.map((img, index) => (
            <div key={index} className="image-preview">
              <img src={img} alt={`Preview ${index}`} />
              <button
                type="button"
                onClick={() => {
                  const updatedImages = [...formData.images];
                  updatedImages.splice(index, 1);
                  setFormData({ ...formData, images: updatedImages });
                  setPreviewImages(updatedImages);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Processing..." : "Save Product"}
      </button>
    </form>
  );
};

export default HomePage;

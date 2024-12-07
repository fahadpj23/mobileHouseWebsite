import { useScreenSize } from "hooks/useScreenSize";

const HomeSkeleton = () => {
  const { isMobile } = useScreenSize();
  return (
    <div className=" grid grid-cols-2 md:grid-cols-5 gap-3 items-center">
      {[...Array(isMobile ? 2 : 5)]?.map((item, key) => (
        <div
          key={key}
          className="w-36 md:w-48 h-full animate-pulse shadow-xl p-2 bg-white space-y-2"
        >
          <div className="h-32 w-full bg-gray-200"></div>
          <h1 className="w-1/3 h-4 bg-gray-200"></h1>
          <div className="flex space-x-4 bg-gray-200">
            <h1 className="w-1/2 h-4 bg-gray-200"></h1>
            <h1 className="w-1/2 h-4 bg-gray-200"></h1>
          </div>
          <h1 className="w-1/3 h-4 bg-gray-200"></h1>
        </div>
      ))}
    </div>
  );
};
export default HomeSkeleton;

// <div className=" flex flex-col space-y-4 bg-white items-center ">
// <div className="w-screen bg-gray-200 h-[50vw] md:h-[30vw] mt-3"></div>
// <div className="grid grid-cols-3 md:grid-cols-6 gap-5 bg-white">
//   {[...Array(6)]?.map((key) => (
//     <div
//       key={key}
//       className="w-20 md:w-48 h-10 animate-pulse bg-gray-200 space-y-2"
//     ></div>
//   ))}
// </div>

// <div className="grid grid-cols-3 gap-5 bg-white p-2 ">
//   {[...Array(3)]?.map((key) => (
//     <div
//       key={key}
//       className="w-36 md:w-48 h-10 animate-pulse  bg-gray-200 "
//     ></div>
//   ))}
// </div>

// <div className="grid grid-cols-2 md:grid-cols-5  bg-gray-200">
//   {[...Array(isMobile ? 2 : 5)]?.map((key) => (
//     <div
//       key={key}
//       className="w-36 md:w-48 h-full animate-pulse shadow-xl p-2 bg-white space-y-2"
//     >
//       <div className="h-32 w-full bg-gray-200"></div>
//       <h1 className="w-1/3 h-4 bg-gray-200"></h1>
//       <div className="flex space-x-4 bg-gray-200">
//         <h1 className="w-1/2 h-4 bg-gray-200"></h1>
//         <h1 className="w-1/2 h-4 bg-gray-200"></h1>
//       </div>
//       <h1 className="w-1/3 h-4 bg-gray-200"></h1>
//     </div>
//   ))}
// </div>
// </div>

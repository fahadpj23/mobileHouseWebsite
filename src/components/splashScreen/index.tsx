import MOBILEHOUSELOGO from "assets/mobileHouseLogo.png";
const SplashScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img
        src={MOBILEHOUSELOGO}
        alt="mobileHouseLogo"
        className="w-[70vw] md:w[50vw] h-[20vw] md:h[10vw]"
      />
    </div>
  );
};
export default SplashScreen;

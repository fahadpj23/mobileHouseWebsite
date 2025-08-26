import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchwhatsappAds } from "store/slice/whatsappAdsSlice";
import { useEffect, useMemo } from "react";
import ServerLazyImage from "components/commonComponents/serverImageLazyLoading";
import { useScreenSize } from "hooks/useScreenSize";

const WhatsappAds = () => {
  const dispatch = useAppDispatch();
  const { entities: whatsappAds } = useAppSelector(
    (state) => state.user.whatsappAds
  );
  const { isMobile } = useScreenSize();

  useEffect(() => {
    dispatch(fetchwhatsappAds());
  }, [dispatch]);

  // Memoized responsive configuration
  const responsive = useMemo(
    () => ({
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 1024, min: 768 },
        items: 3,
      },
      tablet: {
        breakpoint: { max: 768, min: 464 },
        items: 2,
        slidesToSlide: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
        slidesToSlide: 2,
      },
    }),
    []
  );

  // Memoized ads data check
  const hasAds = useMemo(
    () => Array.isArray(whatsappAds) && whatsappAds.length > 0,
    [whatsappAds]
  );

  // Early return if no ads
  if (!hasAds) return null;

  // Render individual ad item
  const renderAdItem = (item: any) => {
    const content = (
      <div
        className={
          isMobile ? "w-[98%] h-[50vh]" : "w-[93%] h-[60vw] md:h-[22vw]"
        }
      >
        <ServerLazyImage src={item?.image} alt="WhatsApp Ad" fill={true} />
      </div>
    );

    return item?.seriesId ? (
      <Link
        to={`series/${item.seriesId}`}
        key={item.id}
        style={!isMobile ? { margin: "3px 8px" } : undefined}
      >
        {content}
      </Link>
    ) : (
      <div key={item.id} style={!isMobile ? { margin: "3px 8px" } : undefined}>
        {content}
      </div>
    );
  };

  return (
    <div className="p-2">
      {isMobile ? (
        <div className="space-y-2">{whatsappAds.map(renderAdItem)}</div>
      ) : (
        <Carousel
          responsive={responsive}
          infinite={true}
          arrows={false}
          autoPlay={true}
        >
          {whatsappAds.map(renderAdItem)}
        </Carousel>
      )}
    </div>
  );
};

export default WhatsappAds;

import BannerSlider from './BannerSlider';
import BannerDownload from './BannerDownload';

const Banner = () => (
  <div className="h-[285px] border-b-[1px] w-full flex mt-[-1px] overflow-hidden">
    <BannerSlider />
    <BannerDownload />
  </div>
);

export default Banner;

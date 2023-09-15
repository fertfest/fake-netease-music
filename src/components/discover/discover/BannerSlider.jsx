import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bannerService from '../../../services/banner';

const BannerSlider = () => {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    bannerService
      .getBanners()
      .then((newBanners) => {
        setBanners(newBanners);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const banner = banners[7];

  return (
    <div className="h-full w-[730px] border-r-[1px]">
      {banner
        && (
          <Link to={`/song/${banner.targetId}`}>
            <img src={`${banner.imageUrl}?param=730y284`} alt={banner.targetId} className="h-[284px]" />
          </Link>
        )}
    </div>
  );
};

export default BannerSlider;

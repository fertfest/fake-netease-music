import { useLocation, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/header/Header';
import Discover from './views/Discover';
import TopList from './views/TopList';
import PlayList from './views/PlayList';
import DJRadio from './views/DJRadio';
import ArtList from './views/ArtList';
import Album from './views/Album';
import MyMusic from './views/MyMusic';
import Friend from './views/Friend';
import DiscoverNav from './components/discover/DiscoverNav';
import Footer from './components/footer/Footer';
import Player from './components/player/Player';
import SongDetail from './views/SongDetail';
import Login from './components/login/Login';
import loginService from './services/login';
import { setLogged, setUnlogged } from './reducers/loginReducer';

const App = () => {
  const location = useLocation();
  const { pathname } = location;
  const loginVisible = useSelector((state) => state.login.loginVisible);

  return (
    <>
      <div className="bg-[#f5f5f5] text-['Arial, Helvetica, sans-serif']">
        <Header />
        {
          pathname.startsWith('/discover') || pathname === '/' || pathname.startsWith('/song')
            ? <DiscoverNav />
            : ''
        }
        <div className="border-solid border-[1px] border-[#d3d3d3]">
          <div className="mx-auto w-[982px] bg-white ">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/song" element={<SongDetail />} />
              <Route path="/discover/toplist" element={<TopList />} />
              <Route path="/discover/playlist" element={<PlayList />} />
              <Route path="/discover/djratio" element={<DJRadio />} />
              <Route path="/discover/artlist" element={<ArtList />} />
              <Route path="/discover/album" element={<Album />} />
              <Route path="/my" element={<MyMusic />} />
              <Route path="/friend" element={<Friend />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
      <Player />
      {
        loginVisible
          ? <Login />
          : ''
      }
    </>
  );
};

export default App;

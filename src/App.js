import { useGlobalContext } from './context/global';
// BrowserRouter is a component that wraps around the entire app.
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import AnimeItem from './Components/AnimeItem';
import Homepage from './Components/Homepage';
import Gallery from './Components/Gallery';


function App() {
  const global = useGlobalContext();
  // console.log(global);
  return (
    <BrowserRouter>
      {/* make pages for each anime */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/character/:id" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

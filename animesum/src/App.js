import logo from './logo.svg';
import './App.css';
import { useGlobalContext } from './context/global';
// BrowserRouter is a component that wraps around the entire app.
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import Popular from './Components/Popular';
import AnimeItem from './Components/AnimeItem';
import Homepage from './Components/Homepage';


function App() {
  const global = useGlobalContext();
  // console.log(global);
  return (
    <BrowserRouter>
      {/* make pages for each anime */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

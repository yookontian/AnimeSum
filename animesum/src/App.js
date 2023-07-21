import logo from './logo.svg';
import './App.css';
import { useGlobalContext } from './context/global';
// BrowserRouter is a component that wraps around the entire app.
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Popular from './Components/Popular';

function App() {
  const global = useGlobalContext();
  console.log(global);
  return (
    <BrowserRouter>
      <div className="App">
        <Popular />
      </div>
    </BrowserRouter>
  );
}

export default App;

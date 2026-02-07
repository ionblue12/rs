
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import Registeriation from './pages/Registeriation';
import NewRecipe from './pages/NewRecipe';
import Login from './pages/Login';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/recipe" element={<RecipeDetails />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/registeration" element={<Registeriation />}/>
          <Route path='/newrecipe' element={<NewRecipe />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

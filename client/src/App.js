
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import Registeriation from './pages/Registeriation';
import NewRecipe from './pages/NewRecipe';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/recipe" element={<RecipeDetails />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/register" element={<Registeriation />}/>
          <Route path='/newrecipe' element={<NewRecipe />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

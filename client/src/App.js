
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

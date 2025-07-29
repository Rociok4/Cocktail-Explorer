import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CocktailDetail from "./pages/CocktailDetail";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";




function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cocktail/:id" element={<CocktailDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:name" element={<CategoryDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      
        
      </Routes>
    </Router>
  );
}

export default App;
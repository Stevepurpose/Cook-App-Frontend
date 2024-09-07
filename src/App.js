import './index.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Recipes from './Recipes';
import RecipeDetails from './RecipeDetails'

function App() {
  return (
    <div>
      <Router>
      <Routes>
      <Route path="/"  element={<Recipes/>}/>
      
      <Route path="/recipes/:id"  element={<RecipeDetails/>}/>
    

      </Routes>
      </Router>



    
        
    </div>
  );
}

export default App;

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalStateContext } from './GlobalStateProvider';
import SupportForm from './SupportForm';
import './index.css';
import { baseURL } from './Baseurl';

function Recipes() {
    const { state, dispatch } = useContext(GlobalStateContext);
    const [selectedOrigin, setSelectedOrigin] = useState(null); // State to track selected origin
    

    useEffect(() => {
        async function fetchRecipes() {
            const response = await fetch(`${baseURL}/recipes/`);
            const data = await response.json();
            dispatch({
                type: 'SET_RECIPES',
                field: 'recipes', 
                value: data,
            });
        }
        fetchRecipes();
    }, [dispatch]);

    const toggleOrigin = (origin) => {
        setSelectedOrigin((prevOrigin) => (prevOrigin === origin ? null : origin));
    };

    return (
        <div className='text-center text-amber-100 h-screen grid grid-rows-[1fr_4fr]'>
            <header className='border border-solid border-green-300 bg-green-900  bg-[rgba(0,230,0,0.6)] bg-[url("../pics/donuts.jpeg")] bg-blend-overlay bg-right'>
                <h1 className='m-auto justify-center  text-red-800  bg-green-300 text-5xl below-md:text-3xl font-extrabold p-4 h-3/4 shadow'>The Cook App</h1>
            </header>
            <div className=' grid grid-cols-1 md:grid-cols-2 gap-4 p-4  bg-amber-300'>
            <div className='p-4'>
                <h1 className='text-green-900 text-2xl font-extrabold'>Click Nationality To view Meal Recipes</h1>
                <ul>
                    {state.recipes &&
                        [...new Set(state.recipes.map((recipe) => recipe.origin))]
                        .sort((a, b) => a.localeCompare(b)) // Sort origins alphabetically
                        .map((origin) => (
                        <li key={origin}>
                            <button onClick={() => toggleOrigin(origin)} className='font-extrabold text-green-900'>
                                {origin}
                            </button>
                            {selectedOrigin === origin && (
                                <ul>
                                    {state.recipes
                                        .filter((recipe) => recipe.origin === origin)
                                        .sort((a, b) => a.food_name.localeCompare(b.food_name)) // Sort food names alphabetically
                                        .map((recipe) => (
                                            <li key={recipe.id}>
                                                <Link to={`/recipes/${recipe.id}`} className='text-red-500 underline'>{recipe.food_name}</Link>
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className='p-4'>
                <p className='text-start text-red-800'>Your recipe suggestions are very welcome. You can suggest new recipes or improve existing ones by sending a message here. Details 
                like food name, origin(nationality), what it is eaten with. Is it an appetizer,  main meal or dessert. Ingredients, directions and nutritional benefits. Also send us your name.    
                </p>
                <SupportForm />
            
            </div>
            </div>
        </div>
    );
}

export default Recipes;

import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalStateContext } from './GlobalStateProvider';
import {baseURL} from './Baseurl'

function RecipeDetails() {
    const { id } = useParams(); // Get the recipe id from the URL
    const { state, dispatch } = useContext(GlobalStateContext);

    useEffect(() => {
        // Reset the current recipe state when the component mounts or the id changes
        dispatch({
            type: 'SET_FIELD',
            field: 'currentRecipe',
            value: null,
        });

        async function fetchRecipe() {
            const response = await fetch(`${baseURL}/recipes/${id}`);
            const data = await response.json();
            dispatch({
                type: 'SET_FIELD',
                field: 'currentRecipe',
                value: data,
            });
        }
        fetchRecipe();
    }, [id, dispatch]);

    const recipe = state.currentRecipe;

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className='text-center text-red-800 bg-amber-300 h-screen'>
            <div className='h-1/6 '>
            <button className='p-4'> <Link to="/">Back to Home</Link></button>
            </div>
            <div className='h-3/6 m-auto'>
                <h1 className='text-3xl'>{recipe.food_name}</h1>
                <p><span className='font-extrabold'>Origin: </span> {recipe.origin}</p>
                <p><span className='font-extrabold'>Eaten With: </span>{recipe.eaten_with}</p>
                <p><span className='font-extrabold'> Appetizer: </span>{recipe.as_appetizer ? 'Yes' : 'No'}</p>
                <p><span className='font-extrabold'>Main: </span> {recipe.as_main ? 'Yes' : 'No'}</p>
                <p><span className='font-extrabold'>Dessert: </span> {recipe.as_dessert ? 'Yes' : 'No'}</p>
                <p><span className='font-extrabold'>Ingredients: </span>{recipe.ingredients}</p>
                <p><span className='font-extrabold'>Directions: </span> {recipe.directions}</p>
                <p><span className='font-extrabold'>Nutritional Benefits: </span>{recipe.nutritional_benefits}</p>
                <p><span className='font-extrabold'>Chef: </span>{recipe.chef}</p>
            </div>
            <div className=' bg-[rgba(0,230,0,0.6)] bg-[url("../pics/trees.svg")] bg-blend-overlay bg-right h-2/6'>
            </div>
        </div>
    );
}

export default RecipeDetails;

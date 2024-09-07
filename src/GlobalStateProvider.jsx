import React from 'react'
import { createContext, useReducer } from 'react';


let GlobalStateContext = createContext()


const initialState = {
    recipes: [],
    food_name: '',
    origin: '',
    eaten_with: '',
    as_appetizer: false,
    as_main: false,
    as_dessert: false,
    ingredients: '',
    directions: '',
    nutritional_benefits: '',
    chef:''
};


function recipeReducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                [action.field]: action.value
            };
        case 'ADD_TO_ARRAY':
            return {
                ...state,
                [action.field]: [...state[action.field], action.value]
            };


       case 'SET_RECIPES':
                return {
                    ...state,
                    recipes: action.value 
                };



      /*  case 'REMOVE_FROM_ARRAY':
            return {
                ...state,
                [action.field]: state[action.field].filter(item => item !== action.value)
            };*/
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}




const GlobalStateProvider = ({children}) => {
    const [state, dispatch] = useReducer(recipeReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{state, dispatch}}>
        {children}
    </GlobalStateContext.Provider>
  )
}

export{GlobalStateContext, GlobalStateProvider}
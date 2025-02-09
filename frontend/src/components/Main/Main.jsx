import React from 'react';
import styles from './Main.module.css'
import RecipeAI from '../RecipeAI/RecipeAI'
import IngredientsList from '../IngredientsList/IngredientsList';
export default function Main() {
    
    let [ingredients, setIngredients] = React.useState([])
    
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient").trim()
        if (newIngredient && !ingredients.includes(newIngredient)){
            setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        }
    }

    function handleSubmit(event) {
        // Prevents page reload
        event.preventDefault(); 
        const formData = new FormData(event.currentTarget);
        addIngredient(formData);
    }
    
    async function model(ingredients) {
    
        const response = await fetch(`http://localhost:5000/get-recipe`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ingredients}),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch recipe from backend");
        }

        const data = await response.json();
        return data.recipe;
    }


    const len=ingredients.length
    let [recipeShown, setRecipeShown] = React.useState(null)
    let [loading, setLoading] = React.useState(false);

    async function getRecipe(){
        setLoading(true);
        setRecipeShown(null);
        const recipeMarkdown = await model(ingredients)
        setRecipeShown(recipeMarkdown)
        setLoading(false);
    }
    return (
        <main className={styles.main}>
            
            <form  onSubmit={handleSubmit} className={styles.search}>
                <input 
                    type="text"
                    name="ingredient"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    />
                <button>Add Ingredient</button>
            </form>
            <br/>

            {len>0 ? <IngredientsList ingredients={ingredients} getRecipe={getRecipe}/> : null}
            {loading && <p>Cooking recipes...</p>}
            {recipeShown !==null && <RecipeAI recipe={recipeShown}/>}
        </main>
    )
}
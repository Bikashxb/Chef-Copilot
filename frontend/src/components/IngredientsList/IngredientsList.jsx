import styles from './IngredientsList.module.css'
export default function ingredientsList(props){
    const ingredients=props.ingredients
    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))
    const len=ingredients.length
    return(
        <section>
                <h2>Ingredients on hand:</h2>
                <ul className={styles.list} aria-live="list-on-hand">
                {ingredientsListItems}</ul>
                
                {len>3 && <div className={styles.recipe}>
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={() => props.getRecipe()}>Get a recipe</button>
                </div> 
                }
            
            </section>
    )
}
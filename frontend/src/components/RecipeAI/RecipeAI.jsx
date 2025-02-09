import ReactMarkdown from 'react-markdown';
import styles from './RecipeAI.module.css'

export default function recipeShown(props){
    return(
        <section className={styles.recipeAI}>
             <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    )
}
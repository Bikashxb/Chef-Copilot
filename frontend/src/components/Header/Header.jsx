import chef from "../../assets/images/chef.png"
import styles from './Header.module.css'
export default function Header() {
    return (
        <header className={styles.header}>
            <img src={chef} alt="Chef-logo" className={styles.chefImage}/>
            <h1>Chef Copilot</h1>
        </header>
    )
}
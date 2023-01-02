import React from 'react'
import styles from "../styles/Header.module.css"


const Header = () => {
    return (
        <>

    <div className="navbar container-md border-bottom border-dark-subtle mb-3">
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 fw-semibold">
        <li><a href="./" className={styles.button} >Home</a></li>
        <li><a href="../categories" className={styles.button} >Categories</a></li>
        </ul>
        <div className="text-end">
        <a href="./" className="d-block link-dark text-decoration-none" aria-expanded="true">
            <img src="./wriality.png" alt="" width="50" height="50"/>
        </a>
        </div>
    </div>
    </>
    )
}

export default Header;

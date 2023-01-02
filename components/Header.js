import React from 'react'
import Link from 'next/link';
import styles from "../styles/Header.module.css"

const Header = () => {
    return (
        <>

    <div className="navbar container border-bottom border-dark-subtle mb-3">
        <ul className="nav col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 fw-semibold">
            <li><Link href="../" className={styles.button}>Home</Link></li>
            <li><Link href="../categories" className={styles.button} >Categories</Link></li>
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

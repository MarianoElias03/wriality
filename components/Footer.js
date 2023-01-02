import React from 'react'

const Footer = () => {
    return (
        <>
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item"><a href="./" className="nav-link px-2 text-muted">Home</a></li>
          <li className="nav-item"><a href="/categories" className="nav-link px-2 text-muted">Categories</a></li>
        </ul>
        <p className="text-center text-muted">&copy; 2022 Wriality, Inc</p>
    </>
    )
}

export default Footer;

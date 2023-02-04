import React from 'react'
import Link from 'next/link';

const Footer = () => {
    return (
        <>
        <div className='container'>
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><Link href="/index" className="nav-link px-2 text-muted">Home</Link></li>
            <li className="nav-item"><Link href="/categories" className="nav-link px-2 text-muted">Categories</Link></li>
          </ul>
          <p className="text-center text-muted">2022 Wriality</p>
        </div>
    </>
    )
}

export default Footer;

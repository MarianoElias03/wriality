import React from 'react'
import Head from 'next/head';
import styles from "../styles/CategoriesPage.module.css"
import { CategoriesWidgets } from '../components';

import { getCategories } from '../services';


const CategoriesPage = () => {
    return (
        <>
        <Head>
            <title>Categories</title>
        </Head>
        <main className={styles.body}>  
            <div className="container">
                <h1>Categories</h1>
                <div>
                    <CategoriesWidgets />
                </div>
            </div>         
        </main>
        </>
    )
};

export default CategoriesPage;
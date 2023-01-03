import React from 'react'
import Head from 'next/head';
import styles from "../styles/CategoriesPage.module.css"
import { Categories } from '../components';

import { getCategories } from '../services';


const CategoriesPage = () => {
    return (
        <>
        <Head>
            <title>Categories</title>
        </Head>
        <main className={styles.body}>   
            <div className="container-sm">
            <Categories slug={undefined}  />
            </div>         
        </main>
        </>
    )
};

export default CategoriesPage;
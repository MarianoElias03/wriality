import styles from '../../styles/SlugPost.module.css'
import { GraphQLClient, gql } from 'graphql-request'
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { getCategories } from '../../services';
import Head from 'next/head';

const Categories = ({ slug }) => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories))
  }, []);

  return (
    <>
    <div className='container-md card mb-3 h-100vh'>
      
    <Head>
      <title>Test</title>
    </Head>
      <h3 className=' card-body card-title mb-0 pb-2'>
        Categories
      </h3>
          {categories.map((category) => (

          <div className='card-body'key={category.name}>
          <span className='cursor-pointer card-text text-capitalize border border-dark-subtle p-2 rounded fw-semibold'>
            {category.name}
          </span>
          </div>
      ))}
    </div>
    </>
  );
};

export default Categories;
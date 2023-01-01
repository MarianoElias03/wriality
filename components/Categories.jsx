import React, { useState, useEffect } from 'react';
import Link from 'next/link'

import { getCategories } from '../services';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories))
  }, []);

  return (
    <div className='card mb-3'>
      <h3 className=' card-body card-title'>
        Categories
      </h3>
      {categories.map((category) => (
        <Link href={`/category/${category.slug}`} key={category.slug}>
          
        </Link>
      ))}
    </div>
  );
};

export default Categories;

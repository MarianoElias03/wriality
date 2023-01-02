import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import CategoriesPage from '../pages';

import { getCategories } from '../services';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories))
  }, []);

  return (
    <div className='card mb-3'>
      <Link href={`/CategoriesPage`} key={CategoriesPage}>
      <h3 className=' card-body card-title mb-0 pb-2'>
        Categories
      </h3>
      </Link>
      {categories.map((category) => (
        <Link href={`/categories/${category.slug}`} key={category.slug}>
          <div className='card-body'>
          <span className='cursor-pointer card-text text-capitalize border border-dark-subtle p-2 rounded fw-semibold'>
            {category.name}
          </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;

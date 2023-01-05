import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";

export default function CategoryWidgets(){
    const [categories, setCategories] = useState([])

    useEffect(() =>{
        getCategories().then((newCategories) => setCategories(newCategories))
    }, []);
    return(
        <>
            {categories.map((category) => (
            <Link href={`/categories/${category.slug}`} key={category.slug}>
            <div className='btn btn-light m-3 ms-0 p-5'>
            <span className='cursor-pointer card-text text-capitalize p-2 fw-semibold'>
                {category.name}
            </span>
            </div>
            </Link>
            ))}
        </>
    )
}
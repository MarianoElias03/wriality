import styles from '../../styles/SlugPost.module.css'
import { GraphQLClient, gql } from 'graphql-request'
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { getCategories } from '../../services';
import Head from 'next/head';

const graphcmds = new GraphQLClient("https://api-ap-southeast-2.hygraph.com/v2/clc9rtx4y225601t8acvshp51/master")

const QUERY = gql`
query Category($slug: String!){
  category(where: {slug: $slug}){
    name,
    slug
  }
}
`;


const SLUGLIST = gql`
    {
        categories{
            slug
        }
    }
`;

export async function getStaticPaths(){
  const { categories } = await graphcmds.request(SLUGLIST);
  return{
      paths: categories.map((category) => ({params: { slug: category.slug } })),
      fallback: false,
  };
}

export async function getStaticProps({params}){
  const slug = params.slug;
  const data = await graphcmds.request(QUERY, {slug});
  const category = data.category;
  return {
      props: {
          category,
      },
      revalidate: 10, 
};
}

const Categories = ({category}) => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories))
  }, []);

  return (
    <>
    <Head className="text-capitalize">
      <title className='text-capitalize'>{category.name}</title>
    </Head>
    <div className='container-md vh-100'>
    
    <h1 className='text-capitalize'>
      {category.name}
    </h1>
          <div className='card-body'key={category.name}>

          </div>
    </div>
    </>
  );
};

export default Categories;
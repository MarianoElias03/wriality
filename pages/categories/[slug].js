import styles from '../../styles/SlugPost.module.css'
import { GraphQLClient, gql } from 'graphql-request'
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { getCategories, getCategoryPost } from '../../services';
import Head from 'next/head';
import { BlogCard } from "../../components"

const graphcmds = new GraphQLClient("https://api-ap-southeast-2.hygraph.com/v2/clc9rtx4y225601t8acvshp51/master")

const QUERY = gql`
query Category($slug: String!){
  category(where: {slug: $slug}){
    name,
    slug
  }
}
`;

export async function getStaticPaths(){
  const categories = await getCategories();
  return{
      paths: categories.map(({ slug }) => ({params: { slug } })),
      fallback: false,
  };
}

export async function getStaticProps({params}){
  const slug = params.slug;
  const data = await graphcmds.request(QUERY, {slug});
  const posts = await getCategoryPost(params.slug);
  const category = data.category;
  return {
      props: {
          category,
          posts
      },
      revalidate: 10, 
};
}

export default function Categories({category, posts}) {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories))
  }, []);

  return (
    <>
    <Head className="text-capitalize">
      <title className='text-capitalize'>{category.name}</title>
    </Head>
    <main className={styles.main}>
      <div className='container-md'>
        <h1 className='text-capitalize pb-3'>
          {category.name}
        </h1>
              <div className='card-body'key={category.name}>
                {posts.map((post, index) => (
                  <BlogCard key={index} post={post.node} />
                ))}
              </div>
      </div>
    </main>
    </>
  );
};


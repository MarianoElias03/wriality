import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Script from "next/script"
import { GraphQLClient, gql } from 'graphql-request'
import BlogCard from "../components/BlogCard.js"

const graphcmds = new GraphQLClient("https://api-ap-southeast-2.hygraph.com/v2/clc9rtx4y225601t8acvshp51/master")

const QUERY = gql`
query Posts {
  posts {
    createdAt
    datePublished
    id
    slug
    title
    updatedAt
    content {
      html
    }
    author {
      name
      avatar {
        url
      }
    }
    coverPhoto {
      url
    }
  }
}
`;

type Posts = Post[]

type Post = {
  createdAt: string;
  datePublished: string;
  id: string;
  slug: string;
  title: string;
  updatedAt: string;
  content: {
    html: string;
  }
  author: {
    name: string;
    avatar: {
      url: string;
    }
  }
  coverPhoto: {
    url: string;
  }
}


export async function getStaticProps(){
  const { posts } = await graphcmds.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10, 
  };
}

const inter = Inter({ subsets: ['latin'] })

export default function Home({posts}: {posts: Posts}): JSX.Element {
  return (
    <>
      <Head>
        <title>Wriality</title>
      </Head>
      <main className={styles.main}>
        <div className="container-fluid">
        {posts.map((post) => (
          <BlogCard 
          title={post.title} 
          author={post.author} 
          coverPhoto={post.coverPhoto} 
          key={post.id} 
          datePublished={post.datePublished} 
          slug={post.slug} 
          />
        ))}          
        </div>
      </main>
</>
  )
}

import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { GraphQLClient, gql } from 'graphql-request'
import { BlogCard, Categories, PostWidget, Header } from '../components';
import { getPosts } from '../services';


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
    description
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
  description: string;
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

export const getRecentPosts = async () => {
  const query = gql`
  query GetPostDetails() {
    posts(
      orderBy: createdAt_ASC
      last: 3
      ){
        title
        featuredImage {
          url
        }
        createdAt
        slug 
      }
  }
  `
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
        <div className="container">
          <div>
            {posts.map((post) => (
          <BlogCard 
            title={post.title} 
            author={post.author} 
            coverPhoto={post.coverPhoto} 
            key={post.id} 
            datePublished={post.datePublished} 
            slug={post.slug}
            description={post.description} 
          />
          ))}
          </div>
          <div>
            <PostWidget categories={undefined} slug={undefined} />
            <Categories slug={undefined} />
            
          </div>
        </div>
      </main>
    </>
  )
}

import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { GraphQLClient, gql } from 'graphql-request'
import { BlogCard, Categories, PostWidget, Header } from '../components';
import { getPosts } from '../services';

type Posts = Post[]

type Post = {
  node: string,
  createdAt: string;
  datePublished: string;
  id: string;
  slug: string;
  title: string;
  updatedAt: string;
  description: string;
  categories: {
    name: string;
  }
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
  const posts = (await getPosts()) || [];
  return {
    props: {
      posts
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
        <div className='container'>
          <div className={styles.flex}>
            <div className='p-4'>
              <Categories slug={undefined} />
              <PostWidget categories={undefined} slug={undefined} />
            </div>
            <div className='p-4'>
              {posts.map((post) => (
            <BlogCard post={post} key={post.title}/>
            ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

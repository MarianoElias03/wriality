import styles from '../../styles/SlugPost.module.css'
import { GraphQLClient, gql } from 'graphql-request'
import Head from 'next/head';
import moment from "moment";

const graphcmds = new GraphQLClient("https://api-ap-southeast-2.hygraph.com/v2/clc9rtx4y225601t8acvshp51/master")

const QUERY = gql`
    query Post($slug: String!){
        post(where: {slug: $slug}){
            id,
            title,
            slug,
            datePublished,
            categories {
                name
            }
            author{
                id,
                name,
                avatar{
                    url
                }
            }
            content{
                html
            }
            coverPhoto{
                id,
                url
            }
        }
    }
`;

const SLUGLIST = gql`
    {
        posts{
            slug
        }
    }
`;

export async function getStaticPaths() {
    const { posts } = await graphcmds.request(SLUGLIST);
    return {
      paths: posts.map((post) => ({ params: { slug: post.slug } })),
      fallback: 'blocking', // Change this value to 'blocking'
    };
  }
  

export async function getStaticProps({params}){
    const slug = params.slug;
    const data = await graphcmds.request(QUERY, { slug });
    return {
        props: {
            post: data.post
        },
        revalidate: 4,
  };
}
export default function BlogPost({post}){
    console.log(post)
    return (
    <>
        <Head>
        <title className='text-capitalize'>{post.title}</title>
        </Head>
        <main className={styles.main}>
            <div className="container-md">
                <img src={post.author.avatar.url} className={styles.avatar} alt=''/>
                <h6 className={styles.name}>Written by {post.author.name} Published on: {moment(post.datePublished).format('MMM DD, YYYY')}</h6>
                <h6 className={styles.date}></h6>
                <h1 className='text-capitalize fw-bold'>{post.title}</h1>
                <div className='badge text-bg-primary fs-6 fw-semibold'>
                    {post.categories.map((category) => (
                        <div key={category.name}>{category.name}</div>
                    ))}
                </div> 
                <p>
                    <div className="lh-lg fs-5" dangerouslySetInnerHTML={{ __html: post.content.html }}></div>
                </p>
            </div>
        </main>
    </>
    )
}
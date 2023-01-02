import styles from '../../styles/SlugPost.module.css'
import { GraphQLClient, gql } from 'graphql-request'
import Head from 'next/head';
import moment from "moment";
import Categories from "../../components"

const graphcmds = new GraphQLClient("https://api-ap-southeast-2.hygraph.com/v2/clc9rtx4y225601t8acvshp51/master")

const QUERY = gql`
    query Post($slug: String!){
        post(where: {slug: $slug}){
            id,
            title,
            slug,
            datePublished,
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

export async function getStaticPaths(){
    const { posts } = await graphcmds.request(SLUGLIST);
    return{
        paths: posts.map((post) => ({params: { slug: post.slug } })),
        fallback: false,
    };
}

export async function getStaticProps({params}){
    const slug = params.slug;
    const data = await graphcmds.request(QUERY, {slug});
    const post = data.post;
    return {
        props: {
            post,
        },
        revalidate: 10, 
  };
}
export default function CategoriesPage({post}){
    return (
    <>
        <Head>
        <title className='text-capitalize'>{post.title}</title>
        </Head>
        <main className={styles.main}>
             <Categories />
        </main>
    </>
    )
}
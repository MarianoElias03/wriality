import styles from '../../styles/Slug.module.css'
import { GraphQLClient, gql } from 'graphql-request'
import Head from 'next/head';

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
export default function BlogPost({post}){
    return (
    <>
        <Head>
        <title>{post.title}</title>
        </Head>
        <main className={styles.blog}>
            <img src={post.coverPhoto.url} className={styles.cover} alt=''/>
            <div className={styles.title}>
                <img src={post.author.avatar.url} alt=''/>
                <div className={styles.authtext}>
                    <h6>By {post.author.name}</h6>
                    <h6 className={styles.date}>{post.datePublished}</h6>
                </div>
            </div>
            <h2>{post.title}</h2>
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content.html }}></div>
        </main>
    </>
    )
}
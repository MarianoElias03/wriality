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
        <main className={styles.main}>
            <div className="container-md">
                <img src={post.coverPhoto.url} className={styles.cover} alt=''/>
                <img src={post.author.avatar.url} className={styles.avatar} alt=''/>
                <h6 className={styles.name}>Written by {post.author.name} Published on: {post.datePublished}</h6>
                <h6 className={styles.date}></h6>
                <h1 className='text-capitalize fw-bold'>{post.title}</h1>
                <p>
                    <div class="lh-lg fs-5" dangerouslySetInnerHTML={{ __html: post.content.html }}></div>
                </p>
            </div>
        </main>
    </>
    )
}
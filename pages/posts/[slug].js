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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/wriality.png" />
        <link href="https://fonts.googleapis.com/css?family=Playfair&#43;Display:700,900&amp;display=swap" rel="stylesheet"/>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossOrigin="anonymous"/>
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
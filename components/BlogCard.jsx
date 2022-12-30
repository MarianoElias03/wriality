import Head from 'next/head'
import Link from 'next/link'
import styles from "../styles/BlogCard.module.css"


export default function BlogPost({title, author, coverPhoto, datePublished, slug, description}){
    return(
      <>
        <div className={styles.card}>
            <Link href={"/posts/" + slug}>
                <div className={styles.imgContainer}>
                    <img src={coverPhoto.url} alt=''/>
                </div>
            </Link>
            <div className={styles.text}>
                <h2>{title}</h2>
                <p>{description}</p>
                <div className={styles.details}>
                    <div style={styles.author}>
                        <img src={author.avatar.url} alt="" />
                        <h3>{author.name}</h3>
                    </div>
                    <div className={styles.date}>
                        <h3>{datePublished}</h3>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
}
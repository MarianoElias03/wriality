import Head from 'next/head'
import Link from 'next/link'
import styles from "../styles/BlogCard.module.css"


export default function BlogPost({title, author, coverPhoto, datePublished, slug, description}){
    return(
      <>
      <Link href={"/posts/" + slug}>
        <div className="card mb-3">
          <div className='row g-0'>
            <div className="col-md-4">
                      <img src={coverPhoto.url} className={styles.coverPhoto} alt=''/>
              </div>
                  <div className="col-md-8">
                    <div className='card-body'>
                      <div className={styles.author}>
                              <img src={author.avatar.url} alt="" className={styles.avatar}/>
                              <h6 className={styles.name}>Written by {author.name}</h6>
                          </div>
                      <h2 className='card-title'>{title}</h2>
                      <p className="card-text">{description}</p>
                      <div className="card-text" styles={styles.details}>
                        <div className={styles.date}>
                        <p className='mb-0 pb-0'><small className="text-muted">{datePublished}</small></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </>
    )
}
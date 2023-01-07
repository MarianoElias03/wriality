import Head from 'next/head'
import Link from 'next/link'
import styles from "../styles/BlogCard.module.css"
import moment from 'moment'
import React from 'react'



export default function BlogPost({ post }){
  console.log(post)
    return(
      <>
      <Link href={`/posts/${post.slug}`}>
        <div className="card mb-3 mw-10vw">
          <div className='row g-0'>
            <div className="col-md-4">
                      <img src={post.coverPhoto.url} className={styles.coverPhoto} alt=''/>
              </div>
                  <div className="col-md-8">
                    <div className='card-body'>
                      <div className={styles.author}>
                              <img src={post.author.avatar.url} alt="" className={styles.avatar}/>
                              <h6 className={styles.name}>Written by {post.author.name}</h6>
                          </div>
                      <h2 className='card-title text-capitalize'>{post.title}</h2>
                      <div className='badge text-bg-primary fs-6 fw-semibold'>
                        {post.categories.map((category) => (
                          <div key={category.name}>{category.name}</div>
                        ))}
                      </div>                    <p className="card-text">{post.description}</p>
                      <div className="card-text" styles={styles.details}>
                        <div className={styles.date}>
                        <p className='mb-0 pb-0'><small className="text-muted">{moment(post.datePublished).format('MMM DD, YYYY')}</small></p>
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
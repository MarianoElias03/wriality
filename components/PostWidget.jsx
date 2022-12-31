import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import { userAgent } from 'next/server';
import { getRecentPosts, getSimilarPosts } from "../services"
import moment from 'moment'
import styles from '../styles/PostWidget.module.css'

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState ([]);
  useEffect(() => {
    if(slug) {
      getSimilarPosts(categories, slug).then((result) => setRelatedPosts(result))
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result))
    }
  }, [slug])

  console.log(relatedPosts)

  return (
    <div className='card mb-3'>
      <h3 className=' card-body card-title'>
        {slug ? 'Related Posts' : "Recent posts"}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title}>
          <Link href={`/posts/${post.slug}`} key={post.title} className={styles.photo}>
            <img alt={post.title}
            height="60px"
            width='60px'
            src={post.coverPhoto.url}
            className={styles.cover}
            />
            <p className={styles.title}>
              <div className='text-capitalize'>
                <h6 className="card-title">{post.title}</h6>
              </div> 
              {moment(post.createdAt).format('MMM, DD YYYY')}
            </p>
            <br/>
            </Link> 
        </div>
        ))} 
         
    </div>
  );
};

export default PostWidget;
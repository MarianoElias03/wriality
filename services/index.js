import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
    query Posts {
        postsConnection {
          edges {
            node {
              author {
                name
                id
                avatar {
                  url
                }
              }
              createdAt
              slug
              title
              coverPhoto {
                url
              }
            }
          }
        }
      }
      
    `
    const results = await request(graphqlAPI, query)

    return results.postsConnection.edges;
}
export type Post = {
    createdAt: string;
    datePublished: string;
    id: string;
    slug: string;
    title: string;
    updatedAt: string;
    content: {
      html: string;
    }
    author: {
      name: string;
      avatar: {
        url: string;
      }
    }
    coverPhoto: {
      url: string;
    }
  };

export type Posts = Post[];
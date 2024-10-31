export type RedditApiResponse = {
  data: {
    children: {
      kind: string;
      data: RedditPostData;
    }[];
  };
};

export type RedditPostData = {
  id: string;
  title: string;
  author: string;
  created_utc: number;
  ups: number;
  num_comments: number;
};


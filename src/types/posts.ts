export interface PostBO {
  _id: string;
  url: string;
  title: string;
  createdAt: string;
  updateAt: string;
  userId: {
    _id: string;
    name: string;
    url: string;
  };
  likedBy: string[];
}

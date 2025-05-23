import { Col, Row } from "antd";
import { useEffect, useState, type CSSProperties } from "react";
import AddPost from "../../components/add-post";
import PostCard from "../../components/post-card";
import { HttpStatus } from "../../helpers/enums/http-status";
import { getAllPosts } from "../../service/posts";
import type { PostBO } from "../../types/posts";

export const PostsPage = () => {
  const [posts, setPosts] = useState<PostBO[]>([]);
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await getAllPosts();

    if (response.status === HttpStatus.SUCCESS && response.data) {
      setPosts(response.data);
    }
  };

  return (
    <>
      <Col style={styles.container}>
        <Col style={styles.appBar}>
          <p style={styles.feedText}>New Feeds</p>
          <AddPost
            onComplete={function (file: File | Blob): void {
              console.log(file);
              throw new Error("Function not implemented.");
            }}
          />
        </Col>
        <Row gutter={[16, 16]} style={{ padding: 10 }}>
          {posts.map((p) => (
            <Col xs={12} sm={12} md={8} key={p._id}>
              <PostCard post={p} />
            </Col>
          ))}
        </Row>
      </Col>
    </>
  );
};

const styles: { [x: string]: CSSProperties } = {
  container: {
    width: "100vw",
    height: "100vh",
    overflow: "auto",
    backgroundColor: "#fff",
  },
  appBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  feedText: {
    fontSize: 24,
    margin: "20px 10px 10px 10px",
    fontWeight: "700",
    color: "#000",
  },
};

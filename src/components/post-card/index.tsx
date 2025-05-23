import { Card, Typography } from "antd";
import type { PostBO } from "../../types/posts";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useState, type CSSProperties } from "react";
import LikedAnimation from "../../assets/animations/liking.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { likeAPost } from "../../service/posts";
import { HttpStatus } from "../../helpers/enums/http-status";
const { Text } = Typography;

const PostCard = ({ post }: { post: PostBO }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleClick = async () => {
    const previousValue = liked;
    if (!liked) {
      setShowAnimation(true);
    }
    setLiked(!liked);

    const response = await likeAPost(post._id, !previousValue);

    if (response.status !== HttpStatus.SUCCESS) {
      setLiked(previousValue);
    }
  };

  return (
    <Card style={styles.container} bodyStyle={{ padding: 0 }}>
      <div style={styles.innerWrapper}>
        <img src={post.url} alt={post.title} style={styles.image} />
        <div style={styles.profileWrapper}>
          <div style={styles.profileInfoWrapper}>
            <img
              src={post.userId.url}
              alt={post.userId.name}
              style={styles.profileImage}
            />
            <Text style={styles.profileNameText} strong>
              {post.userId.name}
            </Text>
          </div>
          <Card hoverable style={styles.likeWrapper} onClick={handleClick}>
            {!liked ? (
              <HeartOutlined style={{ fontSize: 20, marginTop: 3 }} />
            ) : (
              <HeartFilled
                style={{ fontSize: 20, marginTop: 3, color: "red" }}
                color="red"
              />
            )}
          </Card>
        </div>
        {showAnimation && (
          <div style={styles.lottieContainer}>
            <Player
              autoplay
              keepLastFrame
              src={LikedAnimation}
              style={{ height: "200px", width: "200px" }}
              onEvent={(event) => {
                if (event === "complete") {
                  setShowAnimation(false);
                }
              }}
            />
          </div>
        )}
      </div>
      <div style={{ padding: "12px 16px", textAlign: "center" }}>
        <Text strong>{post.title}</Text>
      </div>
    </Card>
  );
};

const styles: { [x: string]: CSSProperties } = {
  container: {
    width: "100%",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  innerWrapper: {
    width: "100%",
    position: "relative",
    paddingBottom: "100%",
    overflow: "hidden",
  },
  lottieContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  likeWrapper: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff9a",
    backdropFilter: "blur(10px)",
    marginRight: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  profileWrapper: {
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileInfoWrapper: {
    display: "flex",
    alignItems: "center",
    padding: "5px 30px 5px 5px",
    backdropFilter: "blur(10px)",
    backgroundColor: "#ffffff9a",
    borderRadius: 30,
    margin: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    objectFit: "cover",
    borderRadius: 20,
  },
  profileNameText: {
    marginLeft: 10,
    color: "#000",
    fontSize: "0.8rem",
  },
};

export default PostCard;

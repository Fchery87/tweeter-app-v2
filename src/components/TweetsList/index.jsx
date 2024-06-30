import { Suspense, useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Tweet from "../Tweet";
import CreateTweetForm from "../CreateTweetForm";
import axios from "axios";
import "./TweetsList.module.css";

const serverUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000"
    : "https://twitter-backend-zr6i.onrender.com";

function TweetsList() {
  const [tweets, setTweets] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${serverUrl}/tweets`);
        console.log("Fetched tweets:", res.data);
        setTweets([...res.data]);
      } catch (error) {
        console.log("Error fetching tweets:", error);
      }
    };

    fetchData();
  }, []);

  const addTweet = async (formData) => {
    try {
      const res = await axios.post(`${serverUrl}/tweets`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Added tweet:", res.data);
      setTweets([res.data, ...tweets]);
    } catch (error) {
      console.log("Error adding tweet:", error);
    }
  };

  const removeTweet = async (tweetId) => {
    try {
      const res = await axios.delete(`${serverUrl}/tweets/${tweetId}`);
      if (res.status === 200) {
        console.log("Deleted tweet with ID:", tweetId);
        setTweets(tweets.filter((t) => t._id !== tweetId));
      } else {
        throw Error("Error deleting tweet");
      }
    } catch (error) {
      console.log("Error deleting tweet:", error);
    }
  };

  const updateTweet = async (tweetId, newTweetContent) => {
    try {
      const res = await axios.put(`${serverUrl}/tweets/${tweetId}`, { newTweetContent });
      if (res.status === 200) {
        console.log("Updated tweet:", res.data);
        setTweets(
          tweets.map((t) => (t._id === tweetId ? res.data : t))
        );
      } else {
        throw Error("Error updating tweet");
      }
    } catch (error) {
      console.log("Error updating tweet:", error);
    }
  };

  const handleLike = async (tweetId) => {
    try {
      const res = await axios.patch(`${serverUrl}/tweets/${tweetId}/like`);
      if (res.status === 200) {
        console.log("Liked tweet:", res.data);
        setTweets(
          tweets.map((t) => (t._id === tweetId ? res.data : t))
        );
      } else {
        throw Error("Error liking tweet");
      }
    } catch (error) {
      console.log("Error liking tweet:", error);
    }
  };

  const handleRetweet = async (tweetId) => {
    try {
      const res = await axios.patch(`${serverUrl}/tweets/${tweetId}/retweet`);
      if (res.status === 200) {
        console.log("Retweeted tweet:", res.data);
        setTweets(
          tweets.map((t) => (t._id === tweetId ? res.data : t))
        );
      } else {
        throw Error("Error retweeting");
      }
    } catch (error) {
      console.log("Error retweeting:", error);
    }
  };

  return (
    <div className="mt-4">
      <CreateTweetForm addTweet={addTweet} />

      <ErrorBoundary fallback={<div>Error loading Tweets!</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <section>
            {tweets &&
              tweets.map((item) => (
                <Tweet
                  tweet={item}
                  key={item._id}
                  removeTweet={removeTweet}
                  updateTweet={updateTweet}
                  handleLike={handleLike}
                  handleRetweet={handleRetweet}
                />
              ))}
          </section>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default TweetsList;

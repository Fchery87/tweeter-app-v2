// src/components/TweetsList/index.jsx

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

  const addTweet = async (newTweet) => {
    try {
      const res = await axios.post(`${serverUrl}/tweets`, {
        newTweet,
        username: "hush123",
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

  const handleLike = (tweetId) => {
    console.log("Liking tweet with ID:", tweetId);
    setTweets(
      tweets.map((t) => {
        if (t._id === tweetId) {
          return { ...t, likes: t.likes + 1 };
        }
        return t;
      })
    );
  };

  const handleRetweet = (tweetId) => {
    console.log("Retweeting tweet with ID:", tweetId);
    setTweets(
      tweets.map((t) => {
        if (t._id === tweetId) {
          return { ...t, retweets: t.retweets + 1 };
        }
        return t;
      })
    );
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

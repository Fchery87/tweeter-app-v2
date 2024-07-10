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
    : "https://twitter-backend-zr6i.onrender.com"; // Ensure this URL is correct

function TweetsList() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${serverUrl}/tweets`);
        setTweets(res.data);
      } catch (error) {
        console.error("Error fetching tweets:", error);
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
      setTweets([res.data, ...tweets]); // Add new tweet to the top of the list
    } catch (error) {
      console.error("Error adding tweet:", error);
    }
  };

  const removeTweet = async (tweetId) => {
    try {
      const res = await axios.delete(`${serverUrl}/tweets/${tweetId}`);
      if (res.status === 200) {
        setTweets(tweets.filter((t) => t._id !== tweetId));
      } else {
        throw new Error("Error deleting tweet");
      }
    } catch (error) {
      console.error("Error deleting tweet:", error);
    }
  };

  const updateTweet = async (tweetId, newTweetContent) => {
    try {
      const res = await axios.put(`${serverUrl}/tweets/${tweetId}`, { newTweetContent });
      if (res.status === 200) {
        setTweets(tweets.map((t) => (t._id === tweetId ? res.data : t)));
      } else {
        throw new Error("Error updating tweet");
      }
    } catch (error) {
      console.error("Error updating tweet:", error);
    }
  };

  const handleLike = async (tweetId) => {
    try {
      const res = await axios.patch(`${serverUrl}/tweets/${tweetId}/like`);
      if (res.status === 200) {
        setTweets(tweets.map((t) => (t._id === tweetId ? res.data : t)));
      } else {
        throw new Error("Error liking tweet");
      }
    } catch (error) {
      console.error("Error liking tweet:", error);
    }
  };

  const handleRetweet = async (tweetId) => {
    try {
      const res = await axios.patch(`${serverUrl}/tweets/${tweetId}/retweet`);
      if (res.status === 200) {
        setTweets(tweets.map((t) => (t._id === tweetId ? res.data : t)));
      } else {
        throw new Error("Error retweeting");
      }
    } catch (error) {
      console.error("Error retweeting:", error);
    }
  };

  return (
    <div className="mt-4">
      <CreateTweetForm addTweet={addTweet} />
      <ErrorBoundary fallback={<div>Error loading Tweets!</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <section>
            {tweets.map((item) => (
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

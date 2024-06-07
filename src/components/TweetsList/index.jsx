import { useState } from 'react';
import Tweet from '../Tweet';
import CreateTweetForm from '../CreateTweetForm';

import { v4 as uuidv4 } from 'uuid';
import { data } from '../../data/data';

import './TweetsList.module.css';

function TweetsList() {
  const [tweets, setTweets] = useState(data);

  const addTweet = (newTweet, image) => {
    const tweetDoc = {
      content: newTweet,
      username: 'abe123',
      likes: 0,
      retweets: 0,
      timestamp: new Date(),
      id: uuidv4(),
      image: image ? URL.createObjectURL(image) : null, // Create an object URL for the image
    };

    setTweets([tweetDoc, ...tweets]);
  };

  const removeTweet = (tweetId) => {
    setTweets(tweets.filter((t) => t.id !== tweetId));
  };

  const updateTweet = (tweetId, newTweetContent) => {
    setTweets(
      tweets.map((t) => {
        if (t.id === tweetId) {
          return {
            ...t,
            content: newTweetContent,
          };
        } else return t;
      })
    );
  };

  const handleLike = (tweetId) => {
    setTweets(
      tweets.map((t) => {
        if (t.id === tweetId) {
          return {
            ...t,
            likes: t.likes + 1,
          };
        } else return t;
      })
    );
  };

  const handleRetweet = (tweetId) => {
    setTweets(
      tweets.map((t) => {
        if (t.id === tweetId) {
          return {
            ...t,
            retweets: t.retweets + 1,
          };
        } else return t;
      })
    );
  };

  return (
    <div className='mt-4'>
      <CreateTweetForm addTweet={addTweet} />

      <section>
        {tweets.map((item) => (
          <Tweet
            tweet={item}
            key={item.id}
            removeTweet={removeTweet}
            updateTweet={updateTweet}
            handleLike={handleLike}
            handleRetweet={handleRetweet}
          />
        ))}
      </section>
    </div>
  );
}

export default TweetsList;

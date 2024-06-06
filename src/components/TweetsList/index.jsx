import { useState } from 'react';
import Tweet from '../Tweet';
import { v4 as uuidv4 } from 'uuid';
import { data } from '../../data/data';
import styles from './TweetsList.module.css';


import './TweetsList.module.css';
import CreateTweetForm from '../CreateTweetForm';

function TweetsList() {
  const [tweets, setTweets] = useState(data);

  const addTweet = (newTweet) => {
    const tweetDoc = {
      content: newTweet,
      username: 'abc123',
      likes: 0,
      retweets: 0,
      timestamp: new Date(),
      id: uuidv4(),
    };

    setTweets([tweetDoc, ...tweets]);
  };

  const removeTweet = (tweetId) => {
    setTweets(tweets.filter((t) => t.id !== tweetId));
  };

  return (
    <div className={styles.mainContainer}>
      <h2>Tweeter App</h2>
  
      <CreateTweetForm addTweet={addTweet} />
  
      <section>
        {tweets.map((item) => (
          <Tweet tweet={item} key={item.id} removeTweet={removeTweet} />
        ))}
      </section>
    </div>
  );
  
}


export default TweetsList;
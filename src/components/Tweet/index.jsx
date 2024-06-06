import PropTypes from 'prop-types';
import styles from './Tweet.module.css';
import { FaHeart } from 'react-icons/fa';
import { LiaRetweetSolid } from 'react-icons/lia';
import Button from 'react-bootstrap/Button';

function Tweet({ tweet, removeTweet }) {
  return (
    <div className={styles.container}>
      <div className={styles.username}>{tweet.username}</div>
      <div className={styles.content}>{tweet.content}</div>
      <div className={styles.actions}>
        <div className={styles.buttons}>
          <div className={styles.heartButton}>
            <FaHeart /> {tweet.likes}
          </div>
          <div className={styles.retweetButton}>
            <LiaRetweetSolid /> {tweet.retweets}
          </div>
        </div>
        <Button
          variant='danger'
          onClick={() => removeTweet(tweet.id)}
          className={styles.deleteButton}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
  removeTweet: PropTypes.func.isRequired,
};

export default Tweet;
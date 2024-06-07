import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaHeart } from 'react-icons/fa';
import { LiaRetweetSolid } from 'react-icons/lia';
import Button from 'react-bootstrap/Button';
import UpdateTweetForm from '../UpdateTweetForm';

function Tweet({ tweet, removeTweet, updateTweet, handleLike, handleRetweet }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='border p-3 my-3 Tweet_container__-hXXI'>
        <div className='username'>@{tweet.username}</div>
        <div className='h6'>{tweet.content}</div>

        <div className='d-flex'>
          <div className='mx-2' onClick={() => handleLike(tweet.id)} style={{ cursor: 'pointer' }}>
            <FaHeart /> {tweet.likes}
          </div>
          <div onClick={() => handleRetweet(tweet.id)} style={{ cursor: 'pointer' }}>
            <LiaRetweetSolid size={22} /> {tweet.retweets}
          </div>
        </div>

        <div className='mt-2'>
          <Button
            className='mx-2 custom-button'
            variant='danger'
            onClick={() => removeTweet(tweet.id)}
          >
            Delete
          </Button>

          <Button variant='info' className='custom-button' onClick={() => setShowModal(true)}>
            Update
          </Button>
        </div>
        {showModal && (
          <UpdateTweetForm
            tweet={tweet}
            setShowModal={setShowModal}
            updateTweet={updateTweet}
          />
        )}
      </div>
    </>
  );
}

Tweet.propTypes = {
  tweet: PropTypes.object,
  removeTweet: PropTypes.func,
  updateTweet: PropTypes.func,
  handleLike: PropTypes.func,
  handleRetweet: PropTypes.func,
};

export default Tweet;

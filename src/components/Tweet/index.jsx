import { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { FaHeart } from "react-icons/fa";
import { LiaRetweetSolid } from "react-icons/lia";
import Button from "react-bootstrap/Button";
import UpdateTweetForm from "../UpdateTweetForm";

function Tweet({ tweet, removeTweet, updateTweet, handleLike, handleRetweet }) {
  const [isEditing, setIsEditing] = useState(false);

  const formattedDate = format(new Date(tweet.createdAt), "MMM d, yyyy");

  return (
    <div className="Tweet_container__-hXXI">
      <div className="username">
        @{tweet.username} <span className="date">{formattedDate}</span>
      </div>
      <div className="h6">{tweet.content}</div>
      {tweet.image && <img src={`http://localhost:4000/${tweet.image}`} alt="Tweet Image" className="tweet-image" />} {/* Adjust URL if needed */}

      <div className="d-flex">
        <div className="mx-2" onClick={() => handleLike(tweet._id)} style={{ cursor: 'pointer' }}>
          <FaHeart /> {tweet.likes}
        </div>
        <div onClick={() => handleRetweet(tweet._id)} style={{ cursor: 'pointer' }}>
          <LiaRetweetSolid size={22} /> {tweet.retweets}
        </div>
      </div>

      <div className="mt-2">
        <Button
          variant="danger"
          className="mx-2 custom-button"
          onClick={() => removeTweet(tweet._id)}
        >
          Delete
        </Button>
        <Button
          variant="info"
          className="mx-2 custom-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Close" : "Update"}
        </Button>
      </div>

      {isEditing && (
        <UpdateTweetForm
          tweet={tweet}
          updateTweet={updateTweet}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
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

import { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { FaHeart } from "react-icons/fa";
import { LiaRetweetSolid } from "react-icons/lia";
import UpdateTweetForm from "../UpdateTweetForm";

function Tweet({ tweet, removeTweet, updateTweet, handleLike, handleRetweet }) {
  const [isEditing, setIsEditing] = useState(false);

  const formattedDate = format(new Date(tweet.createdAt), "MMM d, yyyy");

  return (
    <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800 mt-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-600 dark:text-gray-400">{formattedDate}</span>
      </div>

      <div className="mt-2">
        <p className="text-xl font-bold text-gray-700 dark:text-white">{tweet.content}</p>
        {tweet.image && (
          <img
            src={`http://localhost:4000/${tweet.image}`}
            alt="Tweet Image"
            className="mt-2 rounded"
          />
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex space-x-4">
          <div
            className="flex items-center cursor-pointer text-purple-600 dark:text-purple-400"
            onClick={() => handleLike(tweet._id)}
          >
            <FaHeart /> {tweet.likes}
          </div>
          <div
            className="flex items-center cursor-pointer text-purple-600 dark:text-purple-400"
            onClick={() => handleRetweet(tweet._id)}
          >
            <LiaRetweetSolid size={22} /> {tweet.retweets}
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex space-x-2">
            <button
              className="inline-block px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Close" : "Edit"}
            </button>
            <button
              className="inline-block px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => removeTweet(tweet._id)}
            >
              Delete
            </button>
          </div>
        </div>
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
  tweet: PropTypes.object.isRequired,
  removeTweet: PropTypes.func.isRequired,
  updateTweet: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRetweet: PropTypes.func.isRequired,
};

export default Tweet;

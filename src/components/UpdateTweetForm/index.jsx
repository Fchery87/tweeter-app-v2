import { useState } from "react";
import PropTypes from "prop-types";

function UpdateTweetForm({ tweet, updateTweet, onClose }) {
  const [newContent, setNewContent] = useState(tweet.content);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTweet(tweet._id, newContent);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md mt-4">
      <label htmlFor="newContent" className="block text-lg font-medium text-gray-700">
        Edit your tweet
      </label>

      <textarea
        id="newContent"
        className="mb-4 w-full p-2 border border-gray-300 rounded resize-none"
        rows="6"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Update
        </button>
      </div>
    </form>
  );
}

UpdateTweetForm.propTypes = {
  tweet: PropTypes.object.isRequired,
  updateTweet: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateTweetForm;

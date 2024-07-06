import { useState, useRef } from "react";
import PropTypes from "prop-types";

function CreateTweetForm({ addTweet }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputRef.current.value === '') {
      inputRef.current.focus();
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("username", "hush123"); // Hardcoded username for now
    if (image) {
      formData.append("image", image);
    }

    await addTweet(formData);
    setContent("");
    setImage(null);
    setImagePreview(null);
  };

  const handleClear = () => {
    setContent("");
    setImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <label htmlFor="OrderNotes" className="sr-only">Order notes</label>

      <div className="overflow-hidden">
        <textarea
          id="OrderNotes"
          className="w-full resize-none border-x-0 border-t-0 border-gray-200 px-0 align-top sm:text-sm"
          rows="4"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          ref={inputRef}
        ></textarea>

        {imagePreview && (
          <div className="my-4">
            <img src={imagePreview} alt="Selected" className="max-w-full h-auto" />
          </div>
        )}

        <div className="flex items-center justify-end gap-2 py-3">
          <input
            className="hidden"
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="cursor-pointer rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
          >
            Choose File
          </label>

          <button
            type="button"
            className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
            onClick={handleClear}
          >
            Clear
          </button>

          <button
            type="submit"
            className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}

CreateTweetForm.propTypes = {
  addTweet: PropTypes.func.isRequired,
};

export default CreateTweetForm;

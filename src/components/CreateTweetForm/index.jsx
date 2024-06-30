import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";

function CreateTweetForm({ addTweet }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
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
  };

  return (
    <Form onSubmit={handleSubmit} className="CreateTweetForm_container__-hXXI">
      <Form.Label htmlFor="content">
        <h4>What's on your mind?</h4>
      </Form.Label>

      <Form.Control
        className="mb-4"
        type="text"
        name="content"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        ref={inputRef}
      />

      <Form.Control
        className="mb-4"
        type="file"
        name="image"
        id="image"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <Button type="submit" className="custom-button">Tweet</Button>
    </Form>
  );
}

CreateTweetForm.propTypes = {
  addTweet: PropTypes.func,
};

export default CreateTweetForm;

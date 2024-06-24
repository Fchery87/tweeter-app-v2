// src/components/CreateTweetForm/index.jsx

import { useState, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./CreateTweetForm.module.css"; // Assuming you have this CSS module
import { Button, Form } from "react-bootstrap";

function CreateTweetForm({ addTweet }) {
  const [content, setContent] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputRef.current.value === '') {
      inputRef.current.focus();
      return;
    }

    await addTweet(content);
    setContent("");
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

      <Button type="submit" className="custom-button">Tweet</Button>
    </Form>
  );
}

CreateTweetForm.propTypes = {
  addTweet: PropTypes.func,
};

export default CreateTweetForm;

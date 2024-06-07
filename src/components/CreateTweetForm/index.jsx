import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './CreateTweetForm.module.css';
import { Button, Form } from 'react-bootstrap';

function CreateTweetForm({ addTweet }) {
  const [content, setContent] = useState('');
  const contentInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contentInputRef.current.value === '') {
      contentInputRef.current.focus();
      return;
    }

    addTweet(content);
    setContent('');
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.container}>
      <Form.Label htmlFor="content">
        <h4>What's on your mind? Share your thoughts.</h4>
      </Form.Label>

      <Form.Control
        className="mb-4"
        type="text"
        name="content"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        ref={contentInputRef}
      />

      <Button type="submit" className="custom-button">
        Tweet
      </Button>
    </Form>
  );
}

CreateTweetForm.propTypes = {
  addTweet: PropTypes.func,
};

export default CreateTweetForm;

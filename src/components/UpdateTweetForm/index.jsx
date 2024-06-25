import PropTypes from "prop-types";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function UpdateTweetForm({ tweet, updateTweet, onClose }) {
  const [newContent, setNewContent] = useState(tweet.content);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTweet(tweet._id, newContent);
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-2">
      <Form.Group>
        <Form.Control
          type="text"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
      </Form.Group>
      <Button type="submit" className="mt-2" variant="primary">
        Update
      </Button>
      <Button onClick={onClose} className="mt-2 ml-2" variant="secondary">
        Cancel
      </Button>
    </Form>
  );
}

UpdateTweetForm.propTypes = {
  tweet: PropTypes.object.isRequired,
  updateTweet: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateTweetForm;

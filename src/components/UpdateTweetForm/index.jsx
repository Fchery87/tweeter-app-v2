// src/components/UpdateTweetForm/index.jsx

import { Modal, Form, Button } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import PropTypes from "prop-types";

function UpdateTweetForm({ onClose, tweet, updateTweet }) {
  const [newTweetContent, setNewTweetContent] = useState(tweet.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTweet(tweet._id, newTweetContent);
    onClose();
  };

  return (
    <div className="Modal_body">
      <Modal.Dialog style={{ minWidth: '500px' }}>
        <div>
          <IoMdClose onClick={onClose} />
        </div>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              className="mb-4"
              type="text"
              name="content"
              id="content"
              value={newTweetContent}
              onChange={(e) => setNewTweetContent(e.target.value)}
            />
            <Button type="submit" className="custom-button">Update</Button>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

UpdateTweetForm.propTypes = {
  tweet: PropTypes.object,
  onClose: PropTypes.func,
  updateTweet: PropTypes.func,
};

export default UpdateTweetForm;

import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './CreateTweetForm.module.css';
import { Button, Form } from 'react-bootstrap';
import { IoCloudUploadOutline } from 'react-icons/io5';

function CreateTweetForm({ addTweet }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const contentInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contentInputRef.current.value === '') {
      contentInputRef.current.focus();
      return;
    }

    addTweet(content, image);
    setContent('');
    setImage(null);
    setImageName('');
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageName(e.target.files[0].name);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.container}>
      <Form.Label htmlFor='content'>
        <h4>What's on your mind? Share your thoughts.</h4>
      </Form.Label>

      <Form.Control
        className='mb-4'
        type='text'
        name='content'
        id='content'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        ref={contentInputRef}
      />

      <div className={styles.fileInputContainer}>
        <label htmlFor='image-upload' className={styles.fileInputLabel}>
          <IoCloudUploadOutline size={24} />
          <span>{imageName || 'Upload Image'}</span>
        </label>
        <input
          id='image-upload'
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          className={styles.fileInput}
        />
      </div>

      <Button type='submit' className='custom-button'>Tweet</Button>
    </Form>
  );
}

CreateTweetForm.propTypes = {
  addTweet: PropTypes.func,
};

export default CreateTweetForm;

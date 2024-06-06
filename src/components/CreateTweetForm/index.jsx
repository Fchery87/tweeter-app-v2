import { useState } from 'react';
import styles from './CreateTweetForm.module.css';

function CreateTweetForm({ addTweet }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(), addTweet(content), setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <label htmlFor='content'>Whats on your mind?</label>
      <input
        type='text'
        name='content'
        id='content'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input type='submit' value='Post' />
    </form>
  );
}

export default CreateTweetForm;
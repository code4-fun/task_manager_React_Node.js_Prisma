import React, {useState} from 'react'
import './CommentForm.scss'

const CommentForm = ({loading, error, onSubmit, autoFocus = false, initialValue = ""}) => {
  const [message, setMessage] = useState(initialValue)

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(message)
    setMessage("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-form-row">
        <textarea
          className="message-input"
          autoFocus={autoFocus}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Loading" : "Post"}
        </button>
      </div>
      <div className="error-msg">{error}</div>
    </form>
  );
};

export default CommentForm

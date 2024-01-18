import React, {useEffect, useRef, useState} from 'react'
import './CommentForm.scss'

const CommentForm = ({loading, error, onSubmit, autoFocus = false, initialValue = ""}) => {
  const message = useRef()

  useEffect(() => {
    message.current.value = initialValue
  })

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(message.current.value)
    message.current.value = ""
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-form-row">
        <textarea
          ref={message}
          className="message-input"
          autoFocus={autoFocus}
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

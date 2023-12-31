import React from 'react'
import './CommentList.scss'
import Comment from '../comment/Comment'

const CommentList = ({comments}) => {
  return comments.map(comment => (
    <div key={comment.id} className='comment-stack'>
      <Comment {...comment} />
    </div>
  ))
};

export default CommentList

import React, {useState} from 'react';
import './Comment.scss'
import {FaReply, FaEdit, FaTrash} from 'react-icons/fa'
import IconBtn from "../ui/iconBtn/IconBtn";
import {useDispatch, useSelector} from "react-redux"
import CommentList from "../commentList/CommentList"
import {getCommentsByParentId, getCookie} from "../../utils"
import CommentForm from "../commentForm/CommentForm"
import {addCommentRequested, editCommentRequested, deleteCommentRequested} from "../../store/actions/commentActions"

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
  hour12: false
})

const Comment = ({id, message, user, createdAt}) => {
  const [areChildrenHidden, setAreChildrenHidden] = useState(true)
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useDispatch()
  const {comments, loading} = useSelector(store => store.comments)
  const {task} = useSelector(store => store.tasks)
  const childComments = getCommentsByParentId(comments)[id]

  function onCommentReply(message){
    dispatch(addCommentRequested({taskId: task.id, message, parentId: id}))
    setAreChildrenHidden(false)
    setIsReplying(false)
  }

  function onCommentUpdate(message){
    dispatch(editCommentRequested({taskId: task.id, message, id}))
    setIsEditing(false)
  }

  function onCommentDelete(){
    dispatch(deleteCommentRequested({taskId: task.id, id}))
  }

  return (
    <>
      <div className="comment">
        <div className="comment-header">
          <span className="name">{user.name}</span>
          <span className="date">
            {dateFormatter.format(Date.parse(createdAt))}
          </span>
        </div>
        {
          isEditing
            ?
            <CommentForm autoFocus onSubmit={onCommentUpdate} initialValue={message} />
            :
            <div className="message">{message}</div>
        }
        <div className="comment-footer">
          <IconBtn onClick={() => setIsReplying(prev => !prev)} isActive={isReplying} Icon={FaReply} aria-label={isReplying ? "Cancel Reply" : "Reply"} />
          {
            user.id === getCookie('userId') && <>
              <IconBtn onClick={() => setIsEditing(prev => !prev)} isActive={isEditing} Icon={FaEdit} aria-label={isEditing ? "Cancel Edit" : "Reply"} />
              <IconBtn onClick={onCommentDelete} disabled={loading} Icon={FaTrash} aria-label="Delete" color="danger" />
            </>
          }
        </div>
      </div>
      {
        isReplying && <div className="mt-1 ml-3">
          <CommentForm autoFocus onSubmit={onCommentReply} />
        </div>
      }
      {
        childComments?.length > 0 && (
          <>
            <div className={`nested-comments-stack ${areChildrenHidden ? 'hide' : ''}`}>
              <button
                className="collapse-line" aria-label="Hide Replies"
                onClick={() => setAreChildrenHidden(true)}/>
              <div className="nested-comments">
                <CommentList comments={childComments} />
              </div>
            </div>
            <button
              className={`btn mt-1 ${!areChildrenHidden ? 'hide' : ''}`}
              onClick={() => setAreChildrenHidden(false)}>Show Replies</button>
          </>
        )
      }
    </>
  );
};

export default Comment

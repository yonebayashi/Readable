import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, Button } from 'react-bootstrap'
import ArrowUp from 'react-icons/lib/go/arrow-up'
import ArrowDown from 'react-icons/lib/go/arrow-down'
import {removeComment, editComment, openEditCommentForm} from "../actions/index";
import { deleteComment, upVoteComment, downVoteComment } from "../utils/api";
import EditCommentForm from './EditCommentForm'

class Comment extends Component {
    handleDelete = () => {
        const { comment } = this.props
        deleteComment(comment.id).then(
            this.props.dispatch(removeComment(comment))
        )
    }

    handleUpVote = () => {
        const { comment } = this.props
        upVoteComment(comment.id).then(comment => this.props.dispatch(editComment(comment)))
    }

    handleDownVote = () => {
        const { comment } = this.props
        downVoteComment(comment.id).then(comment => this.props.dispatch(editComment(comment)))
    }

    handleOpenEditCommentForm = () => {
        this.props.dispatch(openEditCommentForm(this.props.comment.id))
    }

    render() {
        const { comment } = this.props
        return (
            <Panel>
                <p>
                    by <strong>{comment.author} </strong>
                </p>
                <p>
                    on {new Date(comment.timestamp).toDateString()} at {new Date(comment.timestamp).toLocaleTimeString()}
                </p>
                <p>{comment.body}</p>
                <div className="voteGroup">
                    <span>
                        <ArrowUp onClick={this.handleUpVote}/>
                    </span>
                    <span>| {comment.voteScore} |</span>
                    <span>
                        <ArrowDown onClick={this.handleDownVote}/>
                    </span>
                </div>
                <div className="buttonGroup">
                    {this.props.editCommentFormOpen ? (
                        <span>
                            <EditCommentForm commentId={comment.id}/>
                        </span>
                    ) : (
                        this.handleOpenEditCommentForm()
                    )}
                    <span>
                        <Button onClick={this.handleDelete}>Delete</Button>
                    </span>
                </div>
            </Panel>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const commentId = ownProps.commentId
    console.log("comment @", commentId)
    return {
        comment: state.comments[commentId],
        editCommentFormOpen: state.editCommentForms[commentId] ? state.editCommentForms[commentId].editCommentFormOpen : false
    }
}
export default connect(mapStateToProps)(Comment);
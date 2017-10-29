import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, Button, ButtonGroup } from 'react-bootstrap'
import ArrowUp from 'react-icons/lib/go/arrow-up'
import ArrowDown from 'react-icons/lib/go/arrow-down'
import { removeComment, editComment } from "../actions/index";
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
                    <span>
                        <EditCommentForm commentId={comment.id}/>
                    </span>
                    <span>
                        <Button onClick={this.handleDelete}>Delete</Button>
                    </span>
                </div>
            </Panel>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        comment: state.comments[ownProps.comment.id]
    }
}
export default connect(mapStateToProps)(Comment);
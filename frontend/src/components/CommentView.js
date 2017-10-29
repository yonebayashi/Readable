import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import Comment from './Comment'
import AddCommentForm from './AddCommentForm'

class CommentView extends Component {
    state = {
        showComments: false
    }
    handleClick = () => {
        this.setState({ showComments: true })
    }
    render() {
        const { postId, comments, comment_count } = this.props
        return (
            <div>
                <Button bsStyle='link' onClick={this.handleClick}>Comments ({comment_count}) </Button>
                {this.state.showComments ? (
                    comments.sort(function (a, b){return(b.voteScore - a.voteScore)}).map(comment =>
                        <Comment comment={comment}/>
                    )
                ) : null }
                <AddCommentForm postId={postId}/>
            </div>
        )
    }
}

function mapStateToProps (state, ownProps) {
    const postId = ownProps.postId
    const post = state.posts[postId]
    const comment_keys = Object.keys(state.comments);
    const comments = comment_keys
        .map(comment_key => state.comments[comment_key])
        .filter(comment => comment.parentId === postId)
        .filter(comment => comment.deleted === false);

    return {
        post,
        comments,
        comment_count: comments.length
    }
}
export default connect(mapStateToProps)(CommentView);
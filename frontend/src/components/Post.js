import React, { Component } from 'react'
import { Panel, Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ArrowUp from 'react-icons/lib/go/arrow-up'
import ArrowDown from 'react-icons/lib/go/arrow-down'
import { removePost, editPost } from "../actions/index"
import { deletePost, upVotePost, downVotePost } from "../utils/api";
import { connect } from 'react-redux'
import EditPostForm from './EditPostForm'
import CommentView from './CommentView'

class Post extends Component {

    handleDelete = () => {
        const { post } = this.props
        deletePost(post.id).then(
            this.props.dispatch(removePost(post))
        )
    }

    handleUpVote = () => {
        const { post } = this.props
        upVotePost(post.id).then(post => this.props.dispatch(editPost(post)))
    }

    handleDownVote = () => {
        const { post } = this.props
        downVotePost(post.id).then(post => this.props.dispatch(editPost(post)))
    }

    render() {
        const { post } = this.props
        return (
            <Panel>
                <p><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></p>
                <p>
                    by <strong>{post.author} </strong> in <strong>{post.category}</strong>
                </p>
                <p>
                    on {new Date(post.timestamp).toDateString()} at {new Date(post.timestamp).toLocaleTimeString()}
                </p>
                <p>{post.body}</p>
                <div className="voteGroup">
                    <span>
                        <ArrowUp onClick={this.handleUpVote}/>
                    </span>
                    <span>| {post.voteScore} |</span>
                    <span>
                        <ArrowDown onClick={this.handleDownVote}/>
                    </span>
                </div>
                <div className="buttonGroup">
                    <span>
                        <EditPostForm postId={post.id}/>
                    </span>
                    <span>
                        <Button onClick={this.handleDelete}>Delete</Button>
                    </span>
                </div>
                <div className="comment-form">
                    <CommentView postId={post.id}/>
                </div>
            </Panel>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        post: state.posts[ownProps.post.id]
    }
}
export default connect(mapStateToProps)(Post)
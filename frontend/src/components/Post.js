import React, { Component } from 'react'
import { Panel, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ArrowUp from 'react-icons/lib/go/arrow-up'
import ArrowDown from 'react-icons/lib/go/arrow-down'
import { removePost, editPost, openEditPostForm, addComment } from "../actions/index"
import { deletePost, upVotePost, downVotePost, getComments } from "../utils/api";
import { connect } from 'react-redux'
import EditPostForm from './EditPostForm'
import CommentView from './CommentView'

class Post extends Component {
    state = {
        showPost: true
    }

    componentDidMount () {
        getComments(this.props.post.id).then(comments => {
            comments.map(comment => {
                this.props.dispatch(addComment(comment))
            })
        })
    }

    handleDelete = () => {
        const { post } = this.props
        deletePost(post.id).then(
            this.props.dispatch(removePost(post))
        )
        this.setState({
            showPost: false
        })
    }

    handleUpVote = () => {
        upVotePost(this.props.post.id).then(post => this.props.dispatch(editPost(post)))
    }

    handleDownVote = () => {
        downVotePost(this.props.post.id).then(post => this.props.dispatch(editPost(post)))
    }

    handleOpenEditForm = () => {
        this.props.dispatch(openEditPostForm(this.props.post.id))
    }

    render() {
        const { post } = this.props
        return (
            <div>
                {this.state.showPost === true ?
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
                            {this.props.editPostFormOpen ? (
                                <span>
                            <EditPostForm postId={post.id}/>
                        </span>
                            ) : (
                                this.handleOpenEditForm()
                            )}
                            <span>
                        <Button onClick={this.handleDelete}>Delete</Button>
                    </span>
                        </div>
                        <div className="comment-form">
                            <CommentView postId={post.id}/>
                        </div>
                    </Panel> : null}
            </div>

        )
    }
}

function mapStateToProps(state, ownProps) {
    const postId = ownProps.postId
    const post = state.posts[postId]
    const editPostFormOpen = state.editPostForms[postId] ? state.editPostForms[postId].editPostFormOpen : false;
    const comment_keys = Object.keys(state.comments);
    const comments = comment_keys
        .map(comment_key => state.comments[comment_key])
        .filter(comment => comment.parentId === postId)
        .filter(comment => comment.deleted === false);
    return {
        post,
        comment_count: comments.length,
        editPostFormOpen
    }
}
export default connect(mapStateToProps)(Post);
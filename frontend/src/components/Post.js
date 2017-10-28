import React, { Component } from 'react'
import { Panel, Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ArrowUp from 'react-icons/lib/go/arrow-up'
import ArrowDown from 'react-icons/lib/go/arrow-down'
import { removePost, editPost } from "../actions/index"
import { deletePost, updatePost } from "../utils/api";
import { connect } from 'react-redux'
import EditPostForm from './EditPostForm'

class Post extends Component {

    handleDelete = () => {
        const { post } = this.props
        deletePost(post.id).then(
            this.props.dispatch(removePost(post))
        )
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
                        <ArrowUp/>
                    </span>
                    <span>| {post.voteScore} |</span>
                    <span>
                        <ArrowDown/>
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
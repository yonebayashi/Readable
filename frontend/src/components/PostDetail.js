import React, { Component } from 'react'
import Post from "./Post";
import { connect } from 'react-redux'
import { addPost } from "../actions/index";
import { getPost } from "../utils/api";

class PostDetail extends Component {
    componentDidMount() {
        const postId = this.props.match.params.id
        getPost(postId).then(post => {
            this.props.dispatch(addPost(post))
        })
    }

    render() {
        return (
            <Post postId={this.props.post.id}/>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const postId = ownProps.match.params.id
    const post = state.posts[postId]
    return {
        post
    }
}

export default connect(mapStateToProps)(PostDetail);
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from "./Post";
import { getPosts } from "../utils/api";
import { addPost } from "../actions/index";

class PostView extends Component {
    componentDidMount () {
        getPosts().then(posts => {
            posts.map(post => {
                this.props.dispatch(addPost(post))
            })
        })
    }

    render() {
        const { posts, sortOrder } = this.props
        return (
            <div>
                {sortOrder === 'voteScore' && (
                    posts.sort(function (a, b){return(b.voteScore - a.voteScore)}).map(post =>
                        <Post key={post.id} postId={post.id}/>
                    ))}
                {sortOrder === 'timestamp' && (
                    posts.sort(function (a, b){return(b.timestamp - a.timestamp)}).map(post =>
                        <Post key={post.id} postId={post.id}/>
                    ))}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const post_keys = Object.keys(state.posts)
    const allPosts = post_keys.map(postId => state.posts[postId])
    const filteredPosts = state.categoryFilter === 'all' ? allPosts : allPosts.filter(post => post.category === state.categoryFilter)
    const posts = filteredPosts.filter(post => post.deleted === false)
    const sortOrder = state.categorySort[state.categoryFilter] || 'voteScore'

    return {
        posts,
        sortOrder
    }
}
export default connect(mapStateToProps)(PostView)

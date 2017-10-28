import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from "./Post";

class PostView extends Component {
    render() {
        const { posts, sortOrder } = this.props
        return (
            <div>
                {sortOrder === 'voteScore' && (
                    posts.sort(function (a, b){return(b.voteScore - a.voteScore)}).map(post =>
                        <Post post={post}/>
                    ))}
                {sortOrder === 'timestamp' && (
                    posts.sort(function (a, b){return(b.timestamp - a.timestamp)}).map(post =>
                        <Post post={post}/>
                    ))}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const allPosts = Object.keys(state.posts).map(postId => state.posts[postId])
    const filteredPosts = state.categoryFilter === 'all' ? allPosts : allPosts.filter(post => post.category === state.categoryFilter)
    const posts = filteredPosts.filter(post => post.deleted === false)
    const sortOrder = state.categorySort[state.categoryFilter] || 'voteScore'

    return {
        posts,
        sortOrder
    }
}
export default connect(mapStateToProps)(PostView)

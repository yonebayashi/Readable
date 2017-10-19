import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ArrowUp from 'react-icons/lib/go/arrow-up'
import ArrowDown from 'react-icons/lib/go/arrow-down'

class Post extends Component {
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
                <span>
                    <ArrowUp/>
                    <p>| {post.voteScore} |</p>
                    <ArrowDown/>
                </span>
            </Panel>
        )
    }
}

export default Post
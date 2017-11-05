import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Modal, Button, FormGroup, FormControl } from 'react-bootstrap'
import { createPost } from "../utils/api";
import { addPost, openPostForm, closePostForm, updatePostForm, clearPostForm } from "../actions/index"
import { connect } from 'react-redux'

class AddPostForm extends Component {
    state = {
        showModal: false,
    }

    closeModal = () => {
        this.props.dispatch(clearPostForm())
        this.setState({ showModal: false });
    }

    openModal = () => {
        this.props.dispatch(openPostForm())
        this.setState({ showModal: true });
    }

    getInputValue = () => {
    // Get the underlying <input> DOM element
        return {
            author: ReactDOM.findDOMNode(this.refs.author),
            title:  ReactDOM.findDOMNode(this.refs.title),
            body:  ReactDOM.findDOMNode(this.refs.body),
            category:  ReactDOM.findDOMNode(this.refs.category)
        }
    }

    handleAuthorChange = () => {
        const data = this.getInputValue().author
        this.props.dispatch(updatePostForm({
            [data.name]: data.value
        }))
    }

    handleTitleChange = () => {
        const data = this.getInputValue().title
        this.props.dispatch(updatePostForm({
            [data.name]: data.value
        }))
    }

    handleBodyChange = () => {
        const data = this.getInputValue().body
        this.props.dispatch(updatePostForm({
            [data.name]: data.value
        }))
    }

    handleCategoryChange = () => {
        const data = this.getInputValue().category
        this.props.dispatch(updatePostForm({
            [data.name]: data.value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { title, author, body, category } = this.props
        createPost({
            id: Date.now().toString(36) + Math.random().toString(36).substr(2, 14),
            timestamp: Date.now(),
            author: author,
            body: body,
            title: title,
            category: category
        }).then(post => {
            this.props.dispatch(addPost(post))
            this.props.dispatch(closePostForm())
        })
    }

    render() {
        const { categories } = this.props
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Opinion goes here</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                Name:
                                <FormControl
                                             name="author"
                                             type="text"
                                             label="text"
                                             ref="author"
                                             onChange={this.handleAuthorChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                Title:
                                <FormControl name="title"
                                             type="text"
                                             label="text"
                                             ref="title"
                                             onChange={this.handleTitleChange} />
                            </FormGroup>
                            <FormGroup>
                                Body:
                                <FormControl name="body"
                                             componentClass="textarea"
                                             ref="body"
                                             onChange={this.handleBodyChange} />
                            </FormGroup>
                            <FormGroup>
                                Category:
                                <FormControl name="category"
                                             componentClass="select"
                                             placeholder="select"
                                             ref="category"
                                             onChange={this.handleCategoryChange}
                                >
                                    <option value="all">all</option>
                                    {categories.map((category) => (
                                        <option key={category.name}>{category.name}</option>
                                    ))}
                                </FormControl>
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleSubmit}>Post</Button>
                    </Modal.Footer>
                </Modal>
                <Button type='submit' onClick={this.openModal}>Add post</Button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const post = state.postForms
    const category_keys = Object.keys(state.categories);

    return {
        categories: category_keys.map(category_key => state.categories[category_key]),
        title: post.title,
        author: post.author,
        body: post.body,
        category: post.category

    }
}

export default connect(mapStateToProps)(AddPostForm);
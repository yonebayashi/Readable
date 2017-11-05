import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Modal, FormGroup, FormControl, Button } from 'react-bootstrap'
import { updatePost, getPost } from "../utils/api";
import { closeEditPostForm, updateEditPostForm, editPost } from "../actions/index";

class EditPostForm extends Component {
    state = {
        modalIsOpen: false
    }

    componentDidMount() {
        getPost(this.props.postId).then(post => {
            this.props.dispatch(updateEditPostForm(post.id, 'title', post.title));
            this.props.dispatch(updateEditPostForm(post.id, 'body', post.body));
            this.props.dispatch(updateEditPostForm(post.id, 'category', post.category));
        })
    }

    closeModal = () => {
        this.setState({
            modalIsOpen: false
        })
    }

    openModal = () => {
        this.setState({
            modalIsOpen: true
        })
    }

    getInputValue = () => {
        return {
            title:  ReactDOM.findDOMNode(this.refs.title),
            body:  ReactDOM.findDOMNode(this.refs.body),
            category:  ReactDOM.findDOMNode(this.refs.category)
        }
    }

    handleTitleChange = () => {
        const { post } = this.props
        const data = this.getInputValue().title
        this.props.dispatch(updateEditPostForm(post.id, data.name, data.value))
    }

    handleBodyChange = () => {
        const { post } = this.props
        const data = this.getInputValue().body
        this.props.dispatch(updateEditPostForm(post.id, data.name, data.value))
    }

    handleCategoryChange = () => {
        const { post } = this.props
        const data = this.getInputValue().category
        this.props.dispatch(updateEditPostForm(post.id, data.name, data.value))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { post, title, body, category } = this.props
        updatePost(post.id, {
            title: title,
            body: body,
            category: category
        }).then(post => {
                this.props.dispatch(editPost(post))
                this.props.dispatch(closeEditPostForm(post.id))
                this.closeModal()
            }
        )
    }

    render() {
        const { categories, title, body, category } = this.props
        return (
            <div>
                <Button onClick={this.openModal}>Edit</Button>
                <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                Title:
                                <FormControl name="title"
                                             type="text"
                                             label="text"
                                             ref="title"
                                             defaultValue={title}
                                             onChange={this.handleTitleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                Body:
                                <FormControl name="body"
                                             componentClass="textarea"
                                             ref="body"
                                             defaultValue={body}
                                             onChange={this.handleBodyChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                Category:
                                <FormControl name="category"
                                             componentClass="select"
                                             placeholder="select"
                                             ref="category"
                                             defaultValue={category}
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
                        <Button onClick={this.closeModal}>Cancel</Button>
                        <Button bsStyle="primary" type="submit" onClick={this.handleSubmit}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const categories = Object.keys(state.categories).map(key => state.categories[key])
    const postId = ownProps.postId
    const post = state.posts[postId]
    return {
        post,
        categories,
        title: state.editPostForms[postId].title || '',
        body: state.editPostForms[postId].body || '',
        category: state.editPostForms[postId].category || 'all'
    }
}

export default connect(mapStateToProps)(EditPostForm)
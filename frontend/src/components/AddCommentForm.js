import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Modal, Button, FormGroup, FormControl } from 'react-bootstrap'
import { createComment } from "../utils/api";
import { addComment, openCommentForm, closeCommentForm, updateCommentForm } from "../actions/index"
import { connect } from 'react-redux'

class AddCommentForm extends Component {
    state = {
        showModal: false,
    }

    closeModal = () => {
        this.setState({ showModal: false });
    }

    openModal = () => {
        const { postId } = this.props
        this.props.dispatch(openCommentForm(postId))
        this.setState({ showModal: true });
    }

    getInputValue = () => {
    // Get the underlying <input> DOM element
        return {
            author: ReactDOM.findDOMNode(this.refs.author),
            body:  ReactDOM.findDOMNode(this.refs.body)
        }
    }

    handleAuthorChange = () => {
        const data = this.getInputValue().author
        console.log(data.value)
        this.props.dispatch(updateCommentForm({
            [data.name]: data.value
        }))
    }

    handleBodyChange = () => {
        const data = this.getInputValue().body
        this.props.dispatch(updateCommentForm({
            [data.name]: data.value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { postId, author, body } = this.props
        console.log(author, body)
        createComment({
            id: Date.now().toString(36) + Math.random().toString(36).substr(2, 14),
            parentId: postId,
            timestamp: Date.now(),
            author: author,
            body: body
        }).then(comment => {
            this.props.dispatch(addComment(comment))
            this.props.dispatch(closeCommentForm(postId))
            this.closeModal()
        })
    }

    render() {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Write comment</Modal.Title>
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
                                Body:
                                <FormControl name="body"
                                             componentClass="textarea"
                                             ref="body"
                                             onChange={this.handleBodyChange} />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleSubmit}>Post</Button>
                    </Modal.Footer>
                </Modal>
                <Button type='submit' onClick={this.openModal}>Add comment</Button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const commentForm = state.commentForms
    return {
        author: commentForm.author,
        body: commentForm.body
    }
}

export default connect(mapStateToProps)(AddCommentForm);
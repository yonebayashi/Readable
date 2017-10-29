import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Modal, FormControl, Button } from 'react-bootstrap'
import { updateComment } from "../utils/api";
import {openEditCommentForm, closeEditCommentForm, updateEditCommentForm, editComment } from "../actions/index";

class EditCommentForm extends Component {
    state = {
        modalIsOpen: false
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
            body:  ReactDOM.findDOMNode(this.refs.body)
        }
    }

    handleBodyChange = () => {
        const { comment } = this.props
        const data = this.getInputValue().body
        this.props.dispatch(updateEditCommentForm(comment.id, data.name, data.value))
    }

    handleOpenEditForm = () => {
        const { comment } = this.props
        this.props.dispatch(openEditCommentForm(comment.id))
        this.openModal()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { comment, body } = this.props
        updateComment(comment.id, {
            body: body,
        }).then(comment => {
                this.props.dispatch(editComment(comment))
                this.props.dispatch(closeEditCommentForm(comment.id))
                this.closeModal()
            }
        )
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleOpenEditForm}>Edit</Button>
                <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            Body:
                            <FormControl name="body"
                                         componentClass="textarea"
                                         ref="body"
                                         defaultValue={this.props.body}
                                         onChange={this.handleBodyChange}
                            />
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
    const commentId = ownProps.commentId
    const comment = state.editCommentForms[commentId]
    console.log(commentId, comment)
    return {
        comment,
        body: comment.body || ''
    }
}

export default connect(mapStateToProps)(EditCommentForm)
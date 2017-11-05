import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Modal, FormControl, Button } from 'react-bootstrap'
import { updateComment, getComment } from "../utils/api";
import { closeEditCommentForm, updateEditCommentForm, editComment } from "../actions/index";

class EditCommentForm extends Component {
    state = {
        modalIsOpen: false
    }

    componentDidMount () {
        getComment(this.props.commentId).then(comment => {
            this.props.dispatch(updateEditCommentForm(comment.id, 'body', comment.body))
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

    handleChange = () => {
        const value = ReactDOM.findDOMNode(this.refs.body).value
        this.props.dispatch(updateEditCommentForm(this.props.commentId, 'body', value))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        updateComment(this.props.commentId, { body: this.props.body }).then(comment => {
                this.props.dispatch(editComment(comment))
                this.props.dispatch(closeEditCommentForm(comment.id))
                this.closeModal()
            }
        )
    }

    render() {
        return (
            <div>
                <Button onClick={this.openModal}>Edit</Button>
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
                                         onChange={this.handleChange}
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
    return {
        comment,
        body: comment.body || ''
    }
}

export default connect(mapStateToProps)(EditCommentForm)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostView from './PostView'
import Navigation from './Navigation'
import { filterByCategory } from "../actions/index"
import { sortByOrder } from "../actions/index"
import Modal from 'react-modal'

class CategoryView extends Component {
    state = {
        modalIsOpen: false
    }

    componentDidMount() {
        const category = this.props.match.params.category || 'all'
        this.props.dispatch(filterByCategory(category))
    }

    handleSort = (e) => {
        this.props.dispatch(sortByOrder(this.props.categoryName, e.target.value))
    }

    openModal = () => {
        this.setState(() => ({
           modalIsOpen: true
        }))
    }

    closeModal = () => {
        this.setState(() => ({
            modalIsOpen: false
        }))
    }

    render() {
        const { modalIsOpen } = this.state
        return (
            <div className='container'>
                <div>
                    <nav className='App-header'>
                        <Navigation />
                        <div>
                            <label>
                                Sort by &nbsp;
                                <select value={this.props.categorySortBy} onChange={this.handleSort}>
                                    <option value="voteScore">Popular</option>
                                    <option value="timestamp">Recent</option>
                                </select>
                            </label>
                        </div>
                    </nav>
                    <article>
                        <PostView />
                    </article>
                    <button onClick={this.openModal}>Add post</button>
                </div>
                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={ modalIsOpen }
                    onRequestClose={this.closeModal}
                    contentLabel='Modal'
                >
                    <div> Write something </div>
                </Modal>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        categoryName: state.categoryFilter,
        categorySortBy: state.categorySort[state.categoryFilter] || 'voteScore'
    }
}

export default connect(mapStateToProps)(CategoryView)
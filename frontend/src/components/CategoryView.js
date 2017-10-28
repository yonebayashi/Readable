import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostView from './PostView'
import Navigation from './Navigation'
import { filterByCategory } from "../actions/index"
import { sortByOrder } from "../actions/index"
import AddPostForm from './AddPostForm'

class CategoryView extends Component {
    componentDidMount() {
        const category = this.props.match.params.category || 'all'
        this.props.dispatch(filterByCategory(category))
    }

    handleSort = (e) => {
        this.props.dispatch(sortByOrder(this.props.categoryName, e.target.value))
    }
    render() {
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
                        <AddPostForm />
                    </article>
                </div>
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
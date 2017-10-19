import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { filterByCategory } from "../actions/index"

class Navigation extends Component {
    render () {
        const { categories } = this.props
        return (
            <div>
                <h2>Readable</h2>
                <nav>
                    <a onClick={() => {this.props.updateCategory('all')}}>
                        <Link to='/'>
                            <p className='navItem'>All</p>
                        </Link>
                    </a>
                    {categories.map(category => (
                        <a key={category.name} onClick={() => {this.props.updateCategory(category.name)}}>
                            <Link to={`/${category.path}`}>
                                <p className='navItem'>{category.name}</p>
                            </Link>
                        </a>
                    ))}
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateCategory: (data) => dispatch(filterByCategory(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
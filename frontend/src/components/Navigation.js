import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategories } from "../utils/api";
import { addCategory, filterByCategory } from "../actions/index"

class Navigation extends Component {
    componentDidMount() {
        getCategories().then((categories) => {
            categories.map((category) => {
                this.props.dispatch(addCategory(category));
            })
        });
    }
    render () {
        return (
            <div>
                <h2>Readable</h2>
                <nav>
                    <a onClick={() => {this.props.dispatch(filterByCategory('all'))}}>
                        <Link to='/'>
                            <p className='navItem'>All</p>
                        </Link>
                    </a>
                    {this.props.categories.map(category => (
                        <a key={category.name} onClick={() => {this.props.dispatch(filterByCategory(category.name))}}>
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

function mapStateToProps (state) {
    const category_keys = Object.keys(state.categories);
    return {
        categories: category_keys.map(category_key => state.categories[category_key]),
    }
}

export default connect(mapStateToProps)(Navigation)
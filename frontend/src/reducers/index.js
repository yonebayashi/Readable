import { combineReducers } from 'redux'
import sortBy from 'sort-by'
import {
    ADD_CATEGORY,
    ADD_POST,
    EDIT_POST,
    DELETE_POST, FILTER_BY_CATEGORY, GET_POSTS_BY_CATEGORY, FETCH_POST, SORT_BY_ORDER
} from "../actions/index";

const defaultCategoryData = [
        {
            name: 'react',
            path: 'react'
        },
        {
            name: 'redux',
            path: 'redux'
        },
        {
            name: 'udacity',
            path: 'udacity'
        }
    ]

const defaultPostData = {
    "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
        voteScore: 6,
        deleted: false,
        commentCount: 2
    },
    "6ni6ok3ym7mf1p33lnez": {
        id: '6ni6ok3ym7mf1p33lnez',
        timestamp: 1468479767190,
        title: 'Learn Redux in 10 minutes!',
        body: 'Just kidding. It takes more than 10 minutes to learn technology.',
        author: 'thingone',
        category: 'redux',
        voteScore: -5,
        deleted: false,
        commentCount: 0
    }
}

function categories(state = defaultCategoryData, action) {
    switch (action.type) {
        case ADD_CATEGORY :
            const { category } = action
            return {
                ...state,
                [category.name]: category
            };
        default :
            return state
    }
}

function posts(state = defaultPostData, action) {
    const { post } = action
    switch (action.type) {
        case ADD_POST :
            return {
                ...state,
                [post.id]: post
            };
        case EDIT_POST :
            return {
                ...state,
                [post.id]: post
            };
        case DELETE_POST :
            return state.filter(p => p.id !== post.id)
        default :
            return state
    }
}

function categoryFilter(state = 'all', action) {
    const { category } = action
    switch (action.type) {
        case FILTER_BY_CATEGORY :
            return category;
        default :
            return state
    }
}

function categorySort(state = {}, action) {
    const { category, order } = action
    switch (action.type) {
        case SORT_BY_ORDER :
            return {
                ...state,
                [category]: order
            }
        default :
            return state
    }
}

export default combineReducers({
    categories,
    posts,
    categoryFilter,
    categorySort
})
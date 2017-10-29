import { combineReducers } from 'redux'
import {
    ADD_CATEGORY,
    ADD_POST,
    EDIT_POST,
    REMOVE_POST,
    FILTER_BY_CATEGORY,
    SORT_BY_ORDER,
    OPEN_POST_FORM,
    CLOSE_POST_FORM,
    UPDATE_POST_FORM,
    CLEAR_POST_FORM,
    OPEN_EDIT_POST_FORM,
    CLOSE_EDIT_POST_FORM,
    UPDATE_EDIT_POST_FORM,
    ADD_COMMENT,
    EDIT_COMMENT,
    REMOVE_COMMENT, OPEN_COMMENT_FORM, UPDATE_COMMENT_FORM, CLOSE_COMMENT_FORM, OPEN_EDIT_COMMENT_FORM,
    CLOSE_EDIT_COMMENT_FORM, UPDATE_EDIT_COMMENT_FORM
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
        case REMOVE_POST :
            return {
                ...state,
                [post.id]: {
                    ...state[post.id],
                    deleted: true
                }
            }
        default :
            return state
    }
}

const defaultPostFormData = {
    postFormOpen: false,
    title: '',
    author: '',
    body: '',
    category: 'all'
}

function postForms(state = defaultPostFormData, action) {
    const { postForm } = action
    switch (action.type) {
        case OPEN_POST_FORM :
            return {
                ...state,
                postFormOpen: true
            }
        case CLOSE_POST_FORM :
            return {
                ...state,
                postFormOpen: false
            }
        case UPDATE_POST_FORM :
            return {
                ...state,
                ...postForm
            }
        case CLEAR_POST_FORM :
            return {
                ...state,
                defaultPostFormData
            }
        default :
            return state
    }
}

function editPostForms(state = defaultPostData, action) {
    const { postId } = action
    switch (action.type) {
        case OPEN_EDIT_POST_FORM :
            return {
                ...state,
                [postId]: {
                    ...state[postId],
                    editPostFormOpen: true
                }
            }
        case CLOSE_EDIT_POST_FORM :
            return {
                ...state,
                [postId]: {
                    ...state[postId],
                    editPostFormOpen: false
                }
            }
        case UPDATE_EDIT_POST_FORM :
            const { key, value } = action
            return {
                ...state,
                [postId]: {
                    ...state[postId],
                   [key]: value
                }
            };
        default :
            return state
    }
}

const defaultCommentData = {
    "894tuq4ut84ut8v4t8wun89g": {
        id: '894tuq4ut84ut8v4t8wun89g',
        parentId: "8xf0y6ziyjabvozdd253nd",
        timestamp: 1468166872634,
        body: 'Hi there! I am a COMMENT.',
        author: 'thingtwo',
        voteScore: 6,
        deleted: false,
        parentDeleted: false
    },
    "8tu4bsun805n8un48ve89": {
        id: '8tu4bsun805n8un48ve89',
        parentId: "8xf0y6ziyjabvozdd253nd",
        timestamp: 1469479767190,
        body: 'Comments. Are. Cool.',
        author: 'thingone',
        voteScore: -5,
        deleted: false,
        parentDeleted: false
    }
}

function comments(state = defaultCommentData, action) {
    const { comment } = action;

    switch (action.type) {
        case ADD_COMMENT :
            return {
                ...state,
                [comment.id]: comment
            };
        case EDIT_COMMENT :
            return {
                ...state,
                [comment.id]: comment
            };
        case REMOVE_COMMENT :
            return {
                ...state,
                [comment.id]: {
                    ...state[comment.id],
                    deleted: true
                }
            };
        default :
            return state;
    }
}

const defaultCommentFormData = {
    commentFormOpen: false,
    author: '',
    body: ''
}

function commentForms(state = defaultCommentFormData, action) {
    const { commentForm } = action
    switch (action.type) {
        case OPEN_COMMENT_FORM :
            return {
                ...state,
                commentFormOpen: true
            }
        case UPDATE_COMMENT_FORM :
            return {
                ...state,
                ...commentForm
            }
        case CLOSE_COMMENT_FORM :
            return {
                ...state,
                commentFormOpen: false
            }
        default :
            return state
    }
}

function editCommentForms(state = defaultCommentData, action) {
    const { commentId } = action
    switch (action.type) {
        case OPEN_EDIT_COMMENT_FORM :
            return {
                ...state,
                [commentId]: {
                    ...state[commentId],
                    editCommentFormOpen: true
                }
            }
        case CLOSE_EDIT_COMMENT_FORM :
            return {
                ...state,
                [commentId]: {
                    ...state[commentId],
                    editCommentFormOpen: false
                }
            }
        case UPDATE_EDIT_COMMENT_FORM :
            const { key, value } = action
            return {
                ...state,
                [commentId]: {
                    ...state[commentId],
                    [key]: value
                }
            }
        default :
            return state
    }
}

export default combineReducers({
    categories,
    posts,
    categoryFilter,
    categorySort,
    postForms,
    editPostForms,
    comments,
    commentForms,
    editCommentForms
})


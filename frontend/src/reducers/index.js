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


function categories(state = {}, action) {
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

function posts(state = {}, action) {
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

function editPostForms(state = {}, action) {
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

function comments(state = {}, action) {
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

function editCommentForms(state = {}, action) {
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


export const ADD_CATEGORY = 'ADD_CATEGORY'

export function addCategory(category) {
    return {
        type: ADD_CATEGORY,
        category
    }
}

export const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY'

export function filterByCategory(category) {
    return {
        type: FILTER_BY_CATEGORY,
        category
    }
}

export const ADD_POST = 'ADD_POST'

export function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}

export const EDIT_POST = 'EDIT_POST'

export function editPost(post) {
    return {
        type: EDIT_POST,
        post
    }
}

export const DELETE_POST = 'DELETE_POST'

export function deletePost(post) {
    return {
        type: DELETE_POST,
        post
    }
}

export const SORT_BY_ORDER = 'SORT_BY_ORDER'

export function sortByOrder(category, order) {
    return {
        type: SORT_BY_ORDER,
        category,
        order
    }
}
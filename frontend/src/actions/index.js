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

export const REMOVE_POST = 'REMOVE_POST'

export function removePost(post) {
    return {
        type: REMOVE_POST,
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

export const OPEN_POST_FORM = 'OPEN_POST_FORM'

export function openPostForm(postForm) {
    return {
        type: OPEN_POST_FORM,
        postForm
    }
}

export const CLOSE_POST_FORM = 'CLOSE_POST_FORM'

export function closePostForm(postForm) {
    return {
        type: CLOSE_POST_FORM,
        postForm
    }
}

export const UPDATE_POST_FORM = 'UPDATE_POST_FORM'

export function updatePostForm(postForm) {
    return {
        type: UPDATE_POST_FORM,
        postForm
    }
}

export const CLEAR_POST_FORM = 'CLEAR_POST_FORM'

export function clearPostForm(postForm) {
    return {
        type: CLEAR_POST_FORM,
        postForm
    }
}

export const OPEN_EDIT_POST_FORM = 'OPEN_EDIT_POST_FORM'

export function openEditPostForm(postId) {
    return {
        type: OPEN_EDIT_POST_FORM,
        postId
    }
}

export const CLOSE_EDIT_POST_FORM = 'CLOSE_EDIT_POST_FORM'

export function closeEditPostForm(postId) {
    return {
        type: CLOSE_EDIT_POST_FORM,
        postId
    }
}

export const UPDATE_EDIT_POST_FORM = 'UPDATE_EDIT_POST_FORM'

export function updateEditPostForm(postId, key, value) {
    return {
        type: UPDATE_EDIT_POST_FORM,
        postId,
        key,
        value
    }
}


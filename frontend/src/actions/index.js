// Category

export const ADD_CATEGORY = 'ADD_CATEGORY'
export const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY'

export function addCategory(category) {
    return {
        type: ADD_CATEGORY,
        category
    }
}

export function filterByCategory(category) {
    return {
        type: FILTER_BY_CATEGORY,
        category
    }
}

// Post

export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const SORT_BY_ORDER = 'SORT_BY_ORDER'
export const REMOVE_POST = 'REMOVE_POST'

export function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}

export function editPost(post) {
    return {
        type: EDIT_POST,
        post
    }
}

export function removePost(post) {
    return {
        type: REMOVE_POST,
        post
    }
}

export function sortByOrder(category, order) {
    return {
        type: SORT_BY_ORDER,
        category,
        order
    }
}

// Post Form

export const OPEN_POST_FORM = 'OPEN_POST_FORM'
export const CLOSE_POST_FORM = 'CLOSE_POST_FORM'
export const UPDATE_POST_FORM = 'UPDATE_POST_FORM'
export const CLEAR_POST_FORM = 'CLEAR_POST_FORM'

export function openPostForm(postForm) {
    return {
        type: OPEN_POST_FORM,
        postForm
    }
}

export function closePostForm(postForm) {
    return {
        type: CLOSE_POST_FORM,
        postForm
    }
}

export function updatePostForm(postForm) {
    return {
        type: UPDATE_POST_FORM,
        postForm
    }
}

export function clearPostForm(postForm) {
    return {
        type: CLEAR_POST_FORM,
        postForm
    }
}

// Edit Post Form

export const OPEN_EDIT_POST_FORM = 'OPEN_EDIT_POST_FORM'
export const CLOSE_EDIT_POST_FORM = 'CLOSE_EDIT_POST_FORM'
export const UPDATE_EDIT_POST_FORM = 'UPDATE_EDIT_POST_FORM'

export function openEditPostForm(postId) {
    return {
        type: OPEN_EDIT_POST_FORM,
        postId
    }
}

export function closeEditPostForm(postId) {
    return {
        type: CLOSE_EDIT_POST_FORM,
        postId
    }
}

export function updateEditPostForm(postId, key, value) {
    return {
        type: UPDATE_EDIT_POST_FORM,
        postId,
        key,
        value
    }
}

// Comment


export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export function editComment(comment) {
    return {
        type: EDIT_COMMENT,
        comment
    }
}

export function removeComment(comment) {
    return {
        type: REMOVE_COMMENT,
        comment
    }
}

// Comment Form

export const OPEN_COMMENT_FORM = 'OPEN_COMMENT_FORM';
export const CLOSE_COMMENT_FORM = 'CLOSE_COMMENT_FORM';
export const UPDATE_COMMENT_FORM = 'UPDATE_COMMENT_FORM';

export function openCommentForm (commentForm) {
    return {
        type: OPEN_COMMENT_FORM,
        commentForm
    }
}

export function closeCommentForm (commentForm) {
    return {
        type: CLOSE_COMMENT_FORM,
        commentForm
    }
}

export function updateCommentForm (commentForm) {
    return {
        type: UPDATE_COMMENT_FORM,
        commentForm
    }
}

// Edit Comment Form

export const OPEN_EDIT_COMMENT_FORM = 'OPEN_EDIT_COMMENT_FORM'
export const CLOSE_EDIT_COMMENT_FORM = 'CLOSE_EDIT_COMMENT_FORM'
export const UPDATE_EDIT_COMMENT_FORM = 'UPDATE_EDIT_COMMENT_FORM'

export function openEditCommentForm(commentId) {
    return {
        type: OPEN_EDIT_COMMENT_FORM,
        commentId
    }
}

export function closeEditCommentForm(commentId) {
    return {
        type: CLOSE_EDIT_COMMENT_FORM,
        commentId
    }
}

export function updateEditCommentForm(commentId, key, value) {
    return {
        type: UPDATE_EDIT_COMMENT_FORM,
        commentId,
        key,
        value
    }
}



export function addAccount() {
    return {
        type: 'ADD_ACCOUNT'
    }
}

export function deletePost(id) {
    return {
        type: 'DELETE_POST',
        id
    }
}
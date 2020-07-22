
const INITIAL_STATE = [{ id: 1, title: "Dummy todo" }]



const todoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TODO_ACTIONS.ADD_TODO:
            return action.payload.todos

        case TODO_ACTIONS.ADD_ALL_TODOS:
            return action.payload.todos

        case TODO_ACTIONS.EDIT_TODO:
            return action.payload.todos

        case TODO_ACTIONS.DELETE_TODO:
            return action.payload.todos

        default:
            return state
    }

}

export const TODO_ACTIONS = {
    ADD_TODO: "ADD_TODO",
    ADD_ALL_TODOS: "ADD_ALL_TODOS",
    EDIT_TODO: "EDIT_TODO",
    DELETE_TODO: "DELETE_TODO"
}

export default todoReducer
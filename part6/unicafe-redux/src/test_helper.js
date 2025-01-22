import deepFreeze from "deep-freeze"

const testIncrement = (actionType, initialState, reducer) => {
    const action = {
        type: actionType
    }

    const state = initialState

    deepFreeze(state)

    const newState = reducer(state, action)

    return newState
}

export { testIncrement }
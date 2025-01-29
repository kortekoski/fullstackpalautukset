import { createSlice } from "@reduxjs/toolkit"

const initialState = 'bienvenido amigo'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            const notification = action.payload
            return notification
        },
        killNotification() {
            return ''
        }
    }
})

export const { setNotification, killNotification } = notificationSlice.actions

export const createNotification = (content, waitTime) => {
    return dispatch => {
        dispatch(setNotification(content))
        
        setTimeout(() => {
            dispatch(killNotification())
        }, waitTime * 1000)
    }
}

export default notificationSlice.reducer
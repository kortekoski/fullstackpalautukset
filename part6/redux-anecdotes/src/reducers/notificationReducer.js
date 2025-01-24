import { createSlice } from "@reduxjs/toolkit"

const initialState = 'bienvenido amigo'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state, action) {
            const notification = action.payload
            return notification
        },
        killNotification() {
            return ''
        }
    }
})

export const { createNotification, killNotification } = notificationSlice.actions

export default notificationSlice.reducer
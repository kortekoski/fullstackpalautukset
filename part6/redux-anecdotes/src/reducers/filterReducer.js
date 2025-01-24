import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        createFilter(state, action) {
            const filter = action.payload
            return filter
        }
    }
})

export const { createFilter } = filterSlice.actions
1
export default filterSlice.reducer
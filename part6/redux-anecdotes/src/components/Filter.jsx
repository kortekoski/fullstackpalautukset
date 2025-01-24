import { useDispatch } from "react-redux"
import { createFilter } from "../reducers/filterReducer"

const Filter = () => {
    const style = {
        marginBottom: 10
    }

    const dispatch = useDispatch()

    const changeFilter = (filter) => {
        console.log(filter)
        dispatch(createFilter(filter))
    }

    return (
        <div style={style}>
            filter: <input type="textbox" name="filter"
            onChange={() => changeFilter(event.target.value)}>
            </input>
        </div>
    )
}

export default Filter
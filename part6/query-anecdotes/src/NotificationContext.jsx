import { useContext } from 'react'
import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch(action.type) {
        case "VOTE":
            return `you voted for ${action.content}`
        case "CREATE":
            return `${action.content} created`
        case "ERROR":
            return `error: the anecdote must be at least 5 characters long`
        case "CLEAR":
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, 'welcome')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
    const valueAndDispatch = useContext(NotificationContext)
    return valueAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const valueAndDispatch = useContext(NotificationContext)
    return valueAndDispatch[1]
}

export const clearNotification = (dispatch) => {
    setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
}

export default NotificationContext
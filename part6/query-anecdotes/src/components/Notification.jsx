import { useNotificationValue } from "../NotificationContext"

const Notification = () => {
  const notificationText = useNotificationValue()

  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (notificationText === ''){
    style.border = 'none'
    style.borderWidth = 0
  } else {
    style.border = 'solid'
    style.borderWidth = 1
  }

  return (
    <div style={style}>
      {useNotificationValue()}
    </div>
  )
}

export default Notification

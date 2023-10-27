import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointmentObj, onClickStar, id} = props
  const {titleIp, dateIp, isStarred} = appointmentObj
  const imageUrl = !isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
  const onClickStarButton = () => {
    onClickStar(id)
  }
  const formattedDate = format(new Date(dateIp), 'dd MMMM yyyy, EEEE')
  return (
    <li className="appointment-card">
      <div>
        <p className="appointment-card-title">{titleIp}</p>
        <p className="appointment-card-para">{formattedDate}</p>
      </div>
      <div>
        <button
          className="star-button"
          data-testid="star"
          type="button"
          onClick={onClickStarButton}
        >
          <img src={imageUrl} alt="star" />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem

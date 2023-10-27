import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleIp: '',
    dateIp: '',
    starred: false,
  }

  onClickStar = id => {
    const {appointmentList} = this.state
    this.setState({
      appointmentList: appointmentList.map(eachObj => {
        if (eachObj.id === id) {
          return {...eachObj, isStarred: !eachObj.isStarred}
        }
        return eachObj
      }),
    })
  }

  onChangeTitle = event => {
    this.setState({titleIp: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateIp: event.target.value})
  }

  onShowStarred = () => {
    this.setState(prevState => ({starred: !prevState.starred}))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleIp, dateIp, appointmentList} = this.state
    const appointmentObj = {
      id: uuidv4(),
      titleIp,
      dateIp,
      isStarred: false,
    }
    const newAppointmentList = [...appointmentList, appointmentObj]
    this.setState({
      appointmentList: newAppointmentList,
      titleIp: '',
      dateIp: '',
    })
  }

  render() {
    const {titleIp, dateIp, appointmentList, starred} = this.state
    let filteredList = appointmentList
    if (starred) {
      filteredList = appointmentList.filter(
        eachObj => eachObj.isStarred === true,
      )
    }
    return (
      <div className="main-container">
        <div className="card">
          <div className="upper-container">
            <form className="upper-text-container">
              <h1>Add appointment</h1>
              <label className="label-element" htmlFor="titleInput">
                TITLE
              </label>
              <br />
              <input
                placeholder="Title"
                className="input-element"
                value={titleIp}
                onChange={this.onChangeTitle}
                type="text"
                id="titleInput"
              />
              <br />
              <label className="label-element" htmlFor="dateInput">
                DATE
              </label>
              <br />
              <input
                className="input-element"
                value={dateIp}
                onChange={this.onChangeDate}
                type="date"
                id="dateInput"
              />
              <br />
              <button
                className="add-button"
                onClick={this.onAddAppointment}
                type="submit"
              >
                Add
              </button>
            </form>
            <div className="top-image-container">
              <img
                className="main-image"
                alt="appointments"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              />
            </div>
          </div>
          <div className="lower-container">
            <div className="lower-container-top">
              <h1 className="lower-container-main-heading">Appointments</h1>
              <button
                className="starred-button"
                onClick={this.onShowStarred}
                type="button"
              >
                Starred
              </button>
            </div>

            <ul className="appointments-container">
              {filteredList.map(eachItem => (
                <AppointmentItem
                  key={eachItem.id}
                  onClickStar={this.onClickStar}
                  id={eachItem.id}
                  appointmentObj={eachItem}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments

import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TravelItem from '../TravelItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TravelGuide extends Component {
  state = {apiStatus: apiStatusConstants.initial, travelList: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.packages.map(pack => ({
        description: pack.description,
        imageUrl: pack.image_url,
        id: pack.id,
        name: pack.name,
      }))

      this.setState({
        travelList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height="50" width="50" />
    </div>
  )

  renderTravelListView = () => {
    const {travelList} = this.state

    return (
      <ul className="travel-list-container">
        {travelList.map(each => (
          <TravelItem travelData={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderHomeDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTravelListView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="travel-head-container">
          <h1 className="travel-head">Travel Guide</h1>
        </div>
        {this.renderHomeDetails()}
      </div>
    )
  }
}

export default TravelGuide

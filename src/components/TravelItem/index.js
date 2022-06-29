import './index.css'

const TravelItem = props => {
  const {travelData} = props
  const {description, imageUrl, name} = travelData

  return (
    <li className="travel-item-container">
      <img className="travel-item-image" src={imageUrl} alt={name} />
      <h1 className="travel-item-name">{name}</h1>
      <p className="travel-item-description">{description}</p>
    </li>
  )
}

export default TravelItem

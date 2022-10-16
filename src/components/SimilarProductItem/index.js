// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {productDetailsList} = props
  const {imageUrl, id, title, brand, price, rating} = productDetailsList
  return (
    <div className="similar-product-container" key={id}>
      <img
        src={imageUrl}
        alt="similar product"
        className="similar-product-img"
      />
      <p className="title-item">{title}</p>
      <p className="brand-item">{brand}</p>
      <div className="priceAndRatingContainer">
        <p className="price">RS {price}</p>
        <div className="rating-container">
          <p className="rating">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
        </div>
      </div>
    </div>
  )
}
export default SimilarProductItem

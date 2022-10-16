import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineStar} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import SimilarProductItem from '../SimilarProductItem'
import AllProductsSection from '../AllProductsSection'
import Header from '../Header'

import './index.css'

const statusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class ProductItemDetails extends Component {
  state = {
    productItemList: {},
    similarProductsList: {},
    count: 1,
  }

  componentDidMount() {
    this.getProductItemDetails()
  }

  getProductItemDetails = async () => {
    this.setState({
      apiUrlStatus: statusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(`https://apis.ccbp.in/products/${id}`, options)

    if (response.ok === true) {
      const data = await response.json()
      const updateData = {
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        description: data.description,
        title: data.title,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
      }

      const similarProductData = data.similar_products.map(eachProduct => ({
        id: eachProduct.id,
        imageUrl: eachProduct.image_url,
        price: eachProduct.price,
        description: eachProduct.description,
        title: eachProduct.title,
        brand: eachProduct.brand,
        totalReviews: eachProduct.total_reviews,
        rating: eachProduct.rating,
        availability: eachProduct.availability,
      }))
      console.log(similarProductData)

      this.setState({
        productItemList: updateData,

        similarProductsList: similarProductData,
        apiUrlStatus: statusConstants.success,
      })
    } else {
      this.setState({
        apiUrlStatus: statusConstants.failure,
      })
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  onDecrement = () => {
    this.setState(prevState => ({
      count: prevState.count - 1,
    }))
  }

  renderProductItemDetails = () => {
    const {productItemList, count, similarProductsList} = this.state

    const {
      imageUrl,
      title,
      brand,
      totalReviews,
      price,
      description,
      rating,
      availability,
    } = productItemList

    return (
      <div className="app-container">
        <div className="product-details-container">
          <img src={imageUrl} className="product-img" alt="product" />
          <div className="product-item-container">
            <div className="product-details">
              <h1 className="title">{title}</h1>
              <p className="price">RS {price}</p>
            </div>

            <div className="rating-container">
              <div className="rating">
                <p className="rating-product">{rating}</p>
                <AiOutlineStar />
              </div>
              <p className="total-rating">{totalReviews} Reviews</p>
            </div>

            <div className="content">
              <p className="description">{description}</p>
            </div>
            <p className="stock-details">
              <b>Availability:</b>
              {availability}
            </p>
            <p className="brand">
              <b>Brand :</b>
              {brand}
            </p>
            <hr />

            <div className="cart-details">
              <div className="cart-buttons">
                <button
                  className="plus-btn"
                  testid="plus"
                  onClick={this.onIncrement}
                >
                  <BsPlusSquare />
                </button>

                <p className="cart-count">{count}</p>

                <button
                  className="minus-btn"
                  testid="minus"
                  onClick={this.onDecrement}
                >
                  <BsDashSquare />
                </button>
              </div>
              <button type="button" className="btn">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
        <div className="similar-productList-container">
          <h1 className="heading">Similar Products</h1>
          <ul className="list-container">
            {similarProductsList.map(event => (
              <SimilarProductItem key={event.id} productDetailsList={event} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailure = () => (
      <div className="error-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          className="err-image"
          alt="failure view"
        />
        <h1 className="error-text">Product Not Found</h1>
        <button type="button" className="btn">
          Continue Shopping
        </button>
      </div>
    )

  renderLoader = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSpecificProducts = () => {
    const {apiUrlStatus} = this.state

    switch (apiUrlStatus) {
      case statusConstants.success:
        return this.renderProductItemDetails()
      case statusConstants.failure:
        return this.renderFailure()
      case statusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="product-details-app-container">
        <Header />
        {this.renderSpecificProducts()}
      </div>
    )
  }
}
export default ProductItemDetails

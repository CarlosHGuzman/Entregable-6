import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { axiosEcommerce } from "../utils/configAxios"
import ProductCard from "../components/Home/ProductCard"
import { addProductCart } from "../store/slices/cart.slice"
import { useDispatch } from "react-redux"
import "./styles/Product.css"

const arrayClassesSlider = ["first", "second", "third"]

const Product = () => {
    const [product, setProduct] = useState()
    const [quantity, setQuantity] = useState(1)
    const [similarProducts, setSimilarProducts] = useState()
    const [indexSlider, setIndexSlider] = useState(0)

    const {id} = useParams() 

    const dispatch = useDispatch()

    const handlePlus = () => setQuantity(quantity + 1)
    const handleLess = () => {
        const newQuantity = quantity - 1
        if(newQuantity >= 0) setQuantity(quantity - 1)
    }

    const handleClickAddProduct = () => {
        const data = {
            quantity,
            productId: product.id
        }
        dispatch(addProductCart(data))
    }

    const handleClickNext = () => {
        const newIndexSlider = indexSlider + 1
        console.log(newIndexSlider)
        if (newIndexSlider > arrayClassesSlider.length - 1 ) {
            setIndexSlider(0)
        }else{
            setIndexSlider(newIndexSlider)
        }
    }

    const handleClickPrevious = () => {
        const newIndexSlider = indexSlider - 1
        if (newIndexSlider < 0) {
            setIndexSlider(arrayClassesSlider.length - 1)
        }else{
            setIndexSlider(newIndexSlider)
        } 
    }

    useEffect(() => {
        axiosEcommerce.get(`/products/${id}`)
            .then(({data}) => setProduct(data))
            .catch((error) => console.log(error))
    }, [id])

    useEffect(() => {
        setQuantity(1)
    }, [id])

    useEffect(() => {
        if(product){
            axiosEcommerce.get(`/products?categoryId=${product?.categoryId}`)
                .then(({data}) => {
                     const newSimilarProducts = data.filter(productByCategory => productByCategory.id !== product.id)
                    setSimilarProducts(data)
                })
                .catch(error => console.log(error))
        }
    }, [product])

    return (
        <main className="product">
            <section className="product__detail">
                <section className="product__slider">   
                    <section className={`product__detail-imgContainer ${arrayClassesSlider[indexSlider]}`}>
                        <div className="product__detail-img">
                            <img src={product?.images[0].url} alt="" />
                        </div>
                        <div className="product__detail-img">
                            <img src={product?.images[1].url} alt="" />
                        </div>
                        <div className="product__detail-img">
                            <img src={product?.images[2].url} alt="" />
                        </div>
                    </section>
                    <div  onClick={handleClickPrevious} className="product__btnLeft">
                        <i className='bx bx-chevron-left'></i>
                    </div>
                    <div onClick={handleClickNext} className="product__btnRight">
                        <i className='bx bx-chevron-right' ></i>
                    </div>
                </section>

                <section className="product__detail-infoContainer">
                    <h4 className="product__detail-brand">{product?.brand}</h4>
                    <h3 className="product__detail-title">{product?.title}</h3>

                    <div className="product__detail-quantityContainer">
                        <div className="product__detail-priceContainer">
                            <h4 className="product__detail-priceTitle">Price</h4>
                            <h3 className="product__detail-price">{product?.price}</h3>
                        </div>  
                        
                        <div className="product__detail-quantity">
                            <h4 className="product__detail-quantityTitle">Quantity</h4>
                            <div className="product__detail-counter">
                                <button onClick={handleLess}>-</button>
                                <h4>{quantity}</h4>
                                <button onClick={handlePlus}>+</button>
                            </div>
                        </div>
                    </div>
                    <button className="product__detail-btn" onClick={handleClickAddProduct}>Add to cart <i className='bx bx-cart'></i></button>
                    <p className="product__detail-text">{product?.description}</p>
                </section>
                
            </section>
            <h2 className="product__title-similar">Discover Similar Items</h2>
            <section className="product__similarContainer">
                {
                    similarProducts?.map(product => <ProductCard key={product.id} product={product} />)
                }
            </section>
        </main>
    )
}

export default Product



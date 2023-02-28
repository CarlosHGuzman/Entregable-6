import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductCart from "../components/Cart/ProductCart"
import { getAllCartProducts, purchaseCart } from "../store/slices/cart.slice"
import "./styles/Cart.css"

const Cart = () => {

    const { products } = useSelector(store => store.cart)

    const dispatch = useDispatch()

    const totalPriceCart = products.reduce((total, product) => total + product.quantity * product.product.price, 0)

    const handlePurchaseCart = () => {
       dispatch(purchaseCart())
    }

    useEffect(() => {
        dispatch(getAllCartProducts())
    }, [ products ])
    return (
        <main>
            <section className="productsCart">
                {
                    products?.map((product) => (<ProductCart key={product.id} product={product} />))
                }
            </section>
            <hr/>
            <section className="productsCart__total">
                <div className="productsCart__total-text">
                    <h3 className="productsCart__total-title">Total</h3>
                    <h3 className="productsCart__total-price">${totalPriceCart}</h3>
                </div>
                <button className="productsCart__btn-checkout" onClick={handlePurchaseCart}>Checkout</button>
            </section>
        </main>
    )
}

export default Cart
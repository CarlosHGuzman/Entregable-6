import { useDispatch } from "react-redux"
import { deleteProductCart, updateProductCar } from "../../store/slices/cart.slice"
import "./styles/ProductCart.css"

const ProductCart = ({product}) => {

    const dispatch = useDispatch()

    const handleDeleteCartProduct = () => {
        dispatch(deleteProductCart(product.id))
    }

    const handleClickPlus = () => {
        const newQuantity = product.quantity + 1
        const data = {
            quantity: newQuantity
        }
        dispatch(updateProductCar(product.id, data));
    }

    const handleClickLess = () => {
        const newQuantity = product.quantity - 1
        if(newQuantity <= 0){
            dispatch(deleteProductCart(product.id))
        }else{
            const data = {
                quantity: newQuantity
            }
            dispatch(updateProductCar(product.id, data));
        }
    }

    return (
        <article className="productCart">
            <div className="productCart__img">
                <img src={product.product.images[0].url} alt="" />
            </div>
            <section className="productCart__quantityContainer">
                <h3 className="productCart__title">{product.product.title}</h3>
                <div className="productCart__functionalityQuantity">
                    <button className="productCart__btnQuantity" onClick={handleClickLess}>-</button>
                    <h3 className="productCart__textQuantity">{product.quantity}</h3>
                    <button className="productCart__btnQuantity" onClick={handleClickPlus}>+</button>
                </div>
            </section>
            <section className="productCart__total">
                <div className="productCart__texts">    
                    <h3 className="productCart__totalText">Total: </h3>
                    <h3 className="productCart__price">${product.quantity * product.product.price}</h3>
                </div>
                <i onClick={handleDeleteCartProduct} className=" productCart__btnTrash bx bx-trash"></i>
            </section>
        </article>
    )
}

export default ProductCart
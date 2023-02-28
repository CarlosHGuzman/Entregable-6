import { useSelector } from "react-redux"
import "./styles/Notification.css"

const Notification = () => {

    const { error } = useSelector(store => store.cart)

    return (
        <article className={`notification ${error && "active"}`}>
            <h3 className="notification__text">Product already added to cart</h3>
        </article>
    )
}

export default Notification
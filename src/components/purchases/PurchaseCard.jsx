import { useNavigate } from "react-router-dom"
import { formatDateDDMMYY } from "../../store/slices/date.js"
import "./styles/PurchaseCard.css"

const PurchaseCard = ({purchase}) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/product/${purchase.id}`)
    }

    return (
        <article className="purchaseCard" onClick={handleClick}>
            <div className="purchaseCard__header">
                <div className="purchaseCard__img">
                    <img src={purchase.product.images[0].url} alt="" />
                </div>
                <h4 className="purchaseCard__title">{purchase.product.title}</h4>
            </div>
            <div className="purchaseCard__details">
                <h4 className="purchaseCard__details-date">{formatDateDDMMYY(purchase.createdAt)}</h4>
                <div className="purchaseCard__details-quantityContainer">
                    <h4 className="purchaseCard__quantity">{purchase.quantity}</h4>
                </div>
                <h4 className="purchaseCard__details-price">$ {purchase.product.price}</h4>
            </div>
        </article>
    )
}

export default PurchaseCard
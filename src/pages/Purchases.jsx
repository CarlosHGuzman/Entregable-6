import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import PurchaseCard from "../components/purchases/PurchaseCard"
import { axiosEcommerce, getConfig } from "../utils/configAxios"
import "./styles/Purchases.css"

const Purchases = () => {

    const [purchases, setPurchases] = useState()


    useEffect(() => {
        axiosEcommerce.get("/purchases", getConfig())
            .then(({data}) => setPurchases(data))
            .catch((error) => console.log(error))
    }, [])

    return (
        <main>
            <section className="myPurchases">
                <div className="myPurchases__navigate">
                    <p> <Link to="/">Home</Link> <span className="point"></span> <span>purchases</span></p>
                </div>
                <h3>My purchases</h3>
                <section className="productsCard">
                    {
                        purchases?.map(purchase => <PurchaseCard key={purchase.id} purchase={purchase} />)
                    }
                </section>
            </section>
        </main>
    )
}

export default Purchases
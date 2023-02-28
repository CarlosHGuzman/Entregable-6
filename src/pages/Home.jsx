import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "../components/Home/ProductCard"
import { axiosEcommerce } from "../utils/configAxios"
import "./styles/Home.css"

const Home = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [nameFilter, setNameFilter] = useState("")
    const [filterProducts, setFilterProducts] = useState([])
    const[categoryFilter, setCategoryFilter] = useState(0)

    const handleSubmit = (event) => {
        event.preventDefault()
        const nameProduct = event.target.nameProduct.value 
        setNameFilter(nameProduct)
    }

    useEffect(() => {
        axiosEcommerce.get("/products")
            .then(({data}) => setProducts(data))
            .catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        axiosEcommerce.get("/categories")
            .then(({data}) => setCategories(data))
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {

        const newProductsByName = products.filter(product =>product.title.toLowerCase().includes(nameFilter.toLowerCase()))
        if(categoryFilter){
            const newProductsByCategory = products.filter(product => product.categoryId === categoryFilter)
            setFilterProducts(newProductsByCategory)
        }else{
            setFilterProducts(newProductsByName)
        }
    }, [nameFilter, products, categoryFilter])
    return (
        <main>
            <section className="filter-product">
                <form className="filter-product-form" onSubmit={handleSubmit}>
                    <div className="filter-product-form-categories">
                        <h3>Categories</h3>
                        <ul>
                            <li onClick={() => setCategoryFilter(0)}>All</li>
                            {   
                                categories.map(category => <li onClick={() => setCategoryFilter(category.id)} key={category.id}>{category.name}</li>)
                            }
                        </ul>
                    </div>
                    <div className="filter-product-text">
                        <input id="nameProduct" type="text" placeholder="What are you looking for?"/>
                        <button className="filter-product-btn"><i className="bx bx-search"></i></button>
                    </div>
                </form>
            </section>
            <section className="home__listProducts">
                {
                    filterProducts?.map(product => <ProductCard key={product.id} product={product}/>)
                }
            </section>
        </main>
    )
}

export default Home
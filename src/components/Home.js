import React, { Component } from 'react'
import axios from 'axios'

import ProductItem from './ProductItem';

class Home extends Component {
    state = {
        products: []
    }

    componentDidMount () {
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:1996/products')
            .then(res => {
                this.setState({products: res.data})
            })
    }
    
    renderList = () => {
       return this.state.products.map(iteem => {
            return (
                <ProductItem item={iteem}/>
            )
        })
    }
     onBtnSearch =()=> {
            const name = this.name.value
            const min = parseInt(this.min.value)
            const max = parseInt(this.max.value)

            this.state.products.filter(item => {
                
            })
    }

    render() {
        return (
            <div className="row">
                <div className="col-2">
                    <h1 className="display-4">Search</h1>
                </div>
                <div className="row col-10">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

export default Home
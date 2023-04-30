import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import UserSalesChart from './UserSalesChart';
import MonthlySalesChart from './MonthlySalesChart';
import ProductSalesChart from './ProductSalesChart';
import { useDispatch, useSelector } from 'react-redux'

import { getAdminProducts } from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'

import { allUsers, userSales } from '../../actions/userActions'
import { monthlySalesChart, productSalesChart } from '../../actions/chartActions'

const Dashboard = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders)
    const { customerSales, } = useSelector(state => state.customerSales)
    const { salesPerMonth, } = useSelector(state => state.salesPerMonth)
    const { productSales, } = useSelector(state => state.productSales)
    let outOfStock = 0;
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())
        dispatch(userSales())
        dispatch(monthlySalesChart())
        dispatch(productSalesChart())

    }, [dispatch])

    return (
        <Fragment>
             <div className="row" style={{backgroundImage: "url(/images/home-bg.png)", backgroundRepeat: 'no-repeat', height: "800px",backgroundPosition: "center", backgroundSize:"cover", marginTop: "4.5rem"}}>

                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>
                    {loading ? <Loader /> : (
                        <Fragment>
                            <MetaData title={'Admin Dashboard'} />
                            <div className="row pr-3">
                                <div className="col-xl-10 col-sm-10 mb-2" style={{borderRadius: "20%", borderStyle: "solid", borderColor: "black", borderInlineColor: "yellow", marginTop: "1.5rem", color:"black", marginLeft:'140px'}}>
                                   
                                        <div className="card-body" >

                                            <div className="text-center card-font-size">Total Amount<br /> <b>${totalAmount && totalAmount.toFixed(2)}</b>

                                            </div>
                                            {/* <div className="text-center card-font-size">Total Amount<br /> <b></b>

                                            </div> */}

                                        </div>

                                  

                                </div>

                            </div>
                            <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                <div style={{backgroundColor: "transparent", borderColor: "black", borderStyle: "solid", borderRadius: "20px", backgroundImage: "url(/images/burger-baner.png)",backgroundPosition: "center", backgroundSize:"cover"}}>
                                        <div className="card-body">
                                        <div className="text-center card-font-size" style={{color: "black", backgroundColor: "yellow"}}>Products<br /> <b>{products && products.length}</b></div>
                                            {/*  */}

                                        </div>

                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">

                                            <span className="float-center" style={{color: 'black', fontSize: "20px"}}>View Details</span>

                                            <span className="float-right">

                                                <i className="fa fa-angle-right"></i>

                                            </span>

                                        </Link>

                                    </div>

                                </div>
                                <div className="col-xl-3 col-sm-6 mb-3">

                                    <div style={{backgroundColor: "transparent", borderColor: "black", borderStyle: "solid", borderRadius: "20px", backgroundImage: "url(/images/burger-baner.png)",backgroundPosition: "center", backgroundSize:"cover"}}> 

                                        <div className="card-body">

                                        <div className="text-center card-font-size" style={{color: "black", backgroundColor: "white"}}>Orders<br /> <b>{orders && orders.length}</b></div>

                                        </div>

                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">

                                        <span className="float-center" style={{color: 'black', fontSize: "20px"}}>View Details</span>

                                            <span className="float-right">

                                                <i className="fa fa-angle-right"></i>

                                            </span>

                                        </Link>

                                    </div>

                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div style={{backgroundColor: "transparent", borderColor: "black", borderStyle: "solid", borderRadius: "20px", backgroundImage: "url(/images/burger-baner.png)",backgroundPosition: "center", backgroundSize:"cover"}}>
                                        <div className="card-body">
                                            <div className="text-center card-font-size" style={{color: "black", backgroundColor: "green"}}>Users<br /> <b>{users && users.length}</b></div>
                                        </div>

                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">

                                        <span className="float-center" style={{color: 'black', fontSize: "20px"}}>View Details</span>

                                            <span className="float-right">

                                                <i className="fa fa-angle-right"></i>

                                            </span>

                                        </Link>

                                    </div>

                                </div>
                                <div className="col-xl-3 col-sm-6 mb-3">

                                    <div style={{backgroundColor: "transparent", borderColor: "black", borderStyle: "solid", borderRadius: "20px", backgroundImage: "url(/images/burger-baner.png)",backgroundPosition: "center", backgroundSize:"cover"}}>

                                        <div className="card-body">

                                          <div className="text-center card-font-size" style={{color: "black", backgroundColor: "red"}}>Out of Stock<br /> <b>{outOfStock}</b></div>

                                        </div>

                                    </div>

                                </div>

                            </div>
                            <Fragment>
                                <UserSalesChart data={customerSales} />
                            </Fragment>
                            <Fragment>
                                <MonthlySalesChart data={salesPerMonth} />
                            </Fragment>
                            <Fragment>
                                <ProductSalesChart data={productSales} />
                            </Fragment>
                        </Fragment>



                    )}
                </div>

            </div>

        </Fragment >

    )

}



export default Dashboard
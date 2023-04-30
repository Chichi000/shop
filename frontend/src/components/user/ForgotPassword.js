import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { forgotPassword, clearErrors } from '../../actions/userActions'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const dispatch = useDispatch();
    const { error, loading, message } = useSelector(state => state.forgotPassword)
    
    const success = (message='' ) => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    const notify = (error='' ) => toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    
    useEffect(() => {
        if (error) {
            notify(error);
            dispatch(clearErrors());
        }
        if (message) {
            success(message)
        }
    }, [dispatch, error, message])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('email', email);
        dispatch(forgotPassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Forgot Password'} />
    <div className="row wrapper" style={{backgroundImage: "url(/images/home-bg.png)", backgroundRepeat: 'no-repeat', height: "800px",backgroundPosition: "center", backgroundSize:"cover", marginTop: "2rem"}}>
                <div className="col-10 col-lg-5"  style={{borderRadius: "20%", borderStyle: "solid", borderColor: "white", borderInline: "yellow", marginTop: "1rem", height:"400px"}}>
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3" style={{textAlign: "center", color: "Yellow"}}>Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field" style={{color: "white", fontSize: "20px", marginLeft: "200px"}}>Enter Email</label>
                            <input
                               style={{ borderInlineColor: "white", borderBlockColor: "yellow", borderRadius:"20px", borderBlockStartWidth:"4.4px", borderBlockEndColor: "transparent", width:"440px", marginLeft: "50px" }}
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                           style={{backgroundColor: "black", borderBlockColor:"white", borderRadius:"50px", borderInlineWidth: "7px",  fontFamily: "Times New ROman, serif", fontSize: "25px", color:"Yellow", width:"350px", marginLeft:"100px", height: "55px", borderInlineColor: "yellow"}}
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false} >
                            Send Email
                    </button>



                    </form>

                </div>
            </div>
        </Fragment>
    )
}



export default ForgotPassword
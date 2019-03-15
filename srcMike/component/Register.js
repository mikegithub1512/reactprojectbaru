import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect}from 'react-redux';
import {onRegisClick}from '../actions';
import {onSetTimeout}from '../actions'


class Register extends Component {
    onSubmitClick =() => {
        const user = this.username.value
        const email = this.email.value
        const pass = this.password.value
        this.props.onRegisClick(user, email, pass)
        
    }
    onErrorRegister =() =>{
        setTimeout(this.props.onSetTimeout, 2000)
        if(this.props.error !== ''){
            return(
                <div className="alert alert-danger mt-4">
                    {this.props.error}
                </div>
            )
        }else if(
            this.props.success !==''){
                return (
                    <div className ="alert alert-success mt-4">
                    {this.props.success}
                    </div>
                )
            }
        }
    

render (){
    return( 
    
    <div>
        <div className="mt-5 row">
                    <div className="col-sm-3 mx-auto card">
                        <div className="card-body">
                            <div className="border-bottom border-secondary card-title">
                                <h1>Register</h1>
                            </div>
                            <div className="card-title mt-1">
                                <h4>Username</h4>
                            </div>
                            <form className="input-group">
                                <input ref={input => {this.username =input}} className="form-control" type="text"/></form>
                            <div className="card-title mt-1">
                                <h4>Email</h4>
                            </div>
                            <form className="input-group">
                                <input ref={input => {this.email =input}} className="form-control" type="email"/></form>
                            <div className="card-title mt-1">
                                <h4>Password</h4>
                            </div>
                            <form className="input-group">
                                <input ref={input => {this.password = input}} className="form-control" type="password"/>
                            </form>
                            <button className="btn btn-success btn-block mt-5"
                              onClick={this.onSubmitClick}>Register</button>
                              {this.onErrorRegister()}
                            <p className="lead">Sudah Punya Akun ? <Link to="/login">Login Bro !</Link></p>
                        </div>
                    </div>
                </div>
    </div>

    )
}

}
    const mapStateToProps = state => {
        return {
        error: state.auth.error,
        success:state.auth.success
    }
    
}

export default connect (mapStateToProps,{onRegisClick,onSetTimeout})(Register);
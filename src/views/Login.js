import React, { Component } from 'react';
import * as Yup from 'yup';
import {Formik, Form, Field} from 'formik';
import Button from 'react-bootstrap/Button';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';


const formSchema = Yup.object().shape({
    "username": Yup.string().required("Required"),

    "password": Yup.string().required("Required")
})

const initialValues = {
    username:'',
    password:''
}

export default class Login extends Component {

    constructor() {
        super();
        this.state={
            error:'',
            redirect:false
        };
    }



    handleSubmit = ({username, password}) => {
        
        axios.post('https://fakestoreapi.com/auth/login', {
            username: username, 
            password: password
        })
        .then(response=>{
            this.props.setToken(response.data.token);
            this.props.setName(username);
            return response;

        })
        .then(response=>{
            if (response.data.token){
                this.setState({redirect:true})
            }
            return response;
        })
    }

    render() {
        const styles={
            error: {color:'red'},
            formLabels:{
                color: "azure"
            },
            stylePage:{
                padding:"20px",
            },
            formHead:{
                color: "azure",
                fontWeight:"bold"
            }

        }
        return (
            <div style={styles.stylePage}>
                {this.state.redirect ? <Redirect to={{pathname:"/", props:{token:this.props.token}}}/> :''}

                <center><h1 style={styles.formHead}>Login</h1></center>
                <Formik initialValues={initialValues}
                    validationSchema={formSchema}
                    onSubmit={
                        (values)=>{
                            this.handleSubmit(values);
                        }
                    }>
                    {
                        ({errors, touched})=>(
                            <Form>
                                <label style={styles.formLabels} htmlFor="username" className="form-label">Username</label>
                                <Field name="username" className="form-control" />
                                {errors.username && touched.username ? (<div style={styles.error}>{errors.username}</div>):null}

                                <label style={styles.formLabels} htmlFor="password" className="form-label">Password</label>
                                <Field name="password" type="password" className="form-control" />
                                {errors.password && touched.password ? (<div style={styles.error}>{errors.password}</div>):null}
                                <small style={styles.error}>{this.state.error}</small>

                                <br/>
                                <Button type="submit" className="btn btn-primary">Login</Button>

                            </Form>
                        )
                    }

                </Formik>
            </div>
        );
    }
}



import React, {useState} from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import Axios from "axios";

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .username("Enter valid username")
        .required("username is required")
        .label("username"),
    password: Yup.string()
        .required("Password is required")
        .min(8)
        .label("Password"),
});

const LoginForm =(props)=>{
    const [validData,setValid] = useState(true);


    const handleSubmit =async (values, { setSubmitting})=>{

        try{

            const token= await login(values.username,values.password);
            if(token.success ===1) {
                console.log(token.success)
                const url = window.location.origin + '/dashboard';
                window.location = url;
                setValid(true);
            }else{
                setValid(false);
            }
        }catch (e) {
            console.log(e)
        }

    }
    const login = async (username,password) => {

        // Sending the user Login request
        const login = await Axios.post('http://localhost/MYApp/bizlogic/login.php',{
            username,
            password
        });
        return login.data;
    }



    return (
        <div className="container">
            <div className="row">
                <div className="col-md-2"></div>

                <Formik
                    initialValues={{username:'',password:''}}
                    validationSchema ={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                          values,
                          errors,
                          handleChange,
                          handleSubmit,
                          touched,
                          dirty,
                          isValid

                      })=>(

                        <div className="col-md-8">

                            {!validData &&<div className="alert alert-danger" role="alert">
                                Invalid Username or Password
                            </div>}

                            <form className="mt-5" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputusername1" className="form-label">username address</label>
                                    <input
                                        type="username"
                                        className="form-control"
                                        aria-describedby="usernameHelp"

                                        id="username"
                                        name="username"
                                        placeholder="Enter user username"
                                        value={values.username}
                                        onChange={handleChange("username")}
                                        error={errors.username}
                                    />
                                    {touched.username && errors.username &&<p className="text-danger">{errors.username}</p>}

                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"

                                        id="password"
                                        placeholder="Enter password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange("password")}
                                        error={errors.password}
                                    />
                                    {touched.password && errors.password &&<p className="text-danger">{errors.password}</p>}

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"

                                >Submit</button>
                            </form>
                        </div>
                    )}</Formik>


                <div className="col-md-2"></div>
            </div>
        </div>
    );
}



export default  LoginForm;
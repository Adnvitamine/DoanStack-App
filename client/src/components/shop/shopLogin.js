import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthService from "../../services/auth.service";
//import { useHistory } from "react-router";

const LoginSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
});

const ShopLogin = () =>{
    //const history = useHistory();
    const [ alert, setAlert ] = useState();
    const [ loading, setLoading ] = useState(false);
    const [ hidePassword , setHidePassword ] = useState(true);

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(LoginSchema)
    });

    const onSubmit = (data) =>{
        setLoading(true);
        AuthService.login(
            data.username,
            data.password
        ).then(()=>{
            setAlert(<div className="alert alert-success" role="alert">"Login Successfull!"</div>);
            setLoading(false);
            window.location.reload();
        }, (error)=>{
            setAlert(<div className="alert alert-success" role="alert">{error.response.data.message}</div>);
            setLoading(false);
        })
    };

    const showPassword = () =>{
        if(hidePassword === true){
        setHidePassword(false);
        }else{
            setHidePassword(true);
        }
    }

    return(
        <Fragment>
                <div className="col-md-12" id="Register">
                    <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="user-img-card"
                    />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {alert}
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="username" ref={register} />
                        {errors.username && <div className="alert alert-danger" role="alert">{errors.username.message}</div>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                            <div className="input-group">
                                <input type={hidePassword ? "password":"text"} className="form-control" placeholder="Enter password" name="password" autoComplete="current-password" ref={register} />
                                <div className="input-group-append">
                                    
                                { hidePassword && (<span className="input-group-text" onClick={showPassword}>
                                        <i className="far fa-eye"></i>
                                    </span>)}
                                { !hidePassword && (<span className="input-group-text" onClick={showPassword}>
                                        <i className="fas fa-eye-slash"></i>
                                    </span>)}    
                                    
                                </div>
                                {errors.password && <div className="alert alert-danger" role="alert">{errors.password.message}</div>}
                            </div>
                        </div>
                    <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">{loading && (<span className="spinner-border spinner-border-sm"></span>)}<span>Login</span></button>
                    </div>
                    </form>
                    </div>
            </div>

        </Fragment>
    )
}

export default ShopLogin;
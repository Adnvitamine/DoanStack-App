import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthService from "../../services/auth.service";


const SignupSchema = yup.object().shape({
    username: yup.string().required().min(3).max(20),
    email: yup.string().required().email(),
    password: yup.string().required().min(6).max(40)
  });

const CreateUser = () => {
    const [alert, SetAlert] = useState();
    const [loading, SetLoading] = useState(false);
    const [ hidePassword , setHidePassword ] = useState(true);
    

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(SignupSchema)
      });
      const onSubmit = (data) => {
          SetLoading(true);

         AuthService.register(
            data.username,
            data.email,
            data.password
          ).then((response)=>{
              SetAlert(<div className="alert alert-success" role="alert">{response.data.message}</div>);
              SetLoading(false);
            },(error)=>{
              SetAlert(<div className="alert alert-danger" role="alert">{error.response.data.message}</div>);
              SetLoading(false);
          });
      };

      const showPassword = () =>{
          if(hidePassword === true){
          setHidePassword(false);
          }else{
              setHidePassword(true);
          }
      };
    
    return(
        <Fragment>
            <div id="TitleLink">
                <h2>Subscribe</h2>
            </div>
            <div className="BrowserNavbar">
                <p>Subscribe on DoanStack for full access</p>
            </div>
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
                    <input type="text" className="form-control" placeholder="Enter username" name="username" ref={register} />
                    {errors.username && <div className="alert alert-danger" role="alert">{errors.username.message}</div>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" aria-describedby="emailHelp" name="email" placeholder="Enter email" ref={register} />
                    <small id="emailHelp" className="form-text text-muted">I'll never share your email with anyone else.</small>
                    {errors.email && <div className="alert alert-danger" role="alert">{errors.email.message}</div>}
                </div>
                <div className="form-group">
                <label>New Password</label>
                    <div className="input-group">
                        <input type={hidePassword ? "password":"text"} className="form-control" placeholder="Enter new password" name="password" autoComplete="off" ref={register} />
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
                <button type="submit" className="btn btn-primary btn-block">{loading && (<span className="spinner-border spinner-border-sm"></span>)}<span>Register</span></button>
                </div>
                </form>
                </div>
            </div>
        </Fragment>
        );
}

export default CreateUser;
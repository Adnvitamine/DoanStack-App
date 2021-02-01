import {Fragment, useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router";

const MessageSchema = yup.object().shape({
    title: yup.string().required(),
    message: yup.string().required(),
    recipient: yup.number().required()
});

const WriteMsg = ({currentUser}) =>{
    const [ alert, setAlert ] = useState();
    const [users, setUsers] = useState([]);
    const history = useHistory();

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(MessageSchema)
    });

    useEffect(() => {
        const getUsers = async () => {
          try {
            const response = await fetch(`http://localhost:8080/api/users`);
            const jsonData = await response.json();
    
            setUsers(jsonData);
          } catch (err) {
            console.error(err.message);
          }
        };
        getUsers();
      }, []);

      const onSubmit = async (data) =>{
          //console.log(data);
          //console.log(currentUser.username);
          //console.log(currentUser.id);
          //console.log(currentUser.email);
          try {
            const name = currentUser.username;
            const email = currentUser.email;
            const title = data.title;
            const message = data.message;
            const sender_id = currentUser.id;
            const owner_id = data.recipient;
            const recent = true;
            
              const body = {
                  name,
                  email,
                  title,
                  message,
                  sender_id,
                  owner_id,
                  recent,
              };

              console.log(body);
              const response = await fetch("http://localhost:8080/api/mails", 
              {
                  method: "POST",
                  headers: { "Content-Type": "application/json"},
                  body: JSON.stringify(body)
              }).then((res)=> res.clone().json());

              console.log(response);
              if(response){
                  setAlert("Message Sended!");
              }
              history.go();
          } catch (error) {
              console.error(error.message);
          }
      }

    return(
        <Fragment>
            <form style={{width: "80%", margin: "auto", marginTop: "25px"}} onSubmit={handleSubmit(onSubmit)}>
                {alert && <div className="alert alert-success" role="alert">{alert}</div>}
                <div className="mt-3">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <label className="input-group-text">Send to: </label>
                        </div>
                        <select className="form-control" name="recipient" ref={register} >
                                <option>Choose...</option>
                            {users.map((user)=>(
                                <option key={user.id} value={user.id} >{user.username}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {errors.recipient && <div className="alert alert-danger" role="alert">No user chosen!</div>}
                <div className="mt-3">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Title:</span>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Message title..."
                        name="title"
                        ref={register}
                        />
                    </div>
                </div>
                {errors.title && <div className="alert alert-danger" role="alert">A title is required!</div>}
                <div className="mt-3">
                    <div className="input-group">
                        <textarea className="form-control" style={{ minHeight: "250px"}} placeholder="Write your message..." name="message" ref={register} />
                    </div>
                </div>
                {errors.message && <div className="alert alert-danger" role="alert">Message is empty!</div>}
                <div className="mt-3">
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block" style={{maxWidth: "200px", margin: "auto"}}>
                                <span>
                                    Send <i className="far fa-paper-plane"></i>
                                </span>
                            </button>
                    </div>
                </div>
            </form>
        </Fragment>
    )

}

export default WriteMsg;
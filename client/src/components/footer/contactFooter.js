import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const ContactSchema = yup.object().shape({
    name: yup.string().required().min(2).max(50),
    email: yup.string().required().email(),
    title: yup.string().required().min(2).max(150),
    message: yup.string().required()
});

const ContactFooter = () =>{

    const [ alert, setAlert ] = useState("CONTACT ME!");

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(ContactSchema)
    });

    const onSubmit = async (data) =>{
        try {
            const name = data.name;
            const email = data.email;
            const title = data.title;
            const message = data.message;
            const sender_id = null;
            const owner_id = 1;
            const recent = true;

            const body = {
                name,
                email,
                title,
                message,
                sender_id,
                owner_id,
                recent
            };
            console.log(body);
            const response = await fetch("http://localhost:8080/api/mails",
            {
                method: "POST",
                headers: { "Content-type": "application/json"},
                body: JSON.stringify(body)
            }).then((res)=> res.clone().json());

            console.log(response);
            if(response){

                setAlert("Message Sended!")
            }

        } catch (error) {
            console.log(error.message);
        }
    };

    return(
        <Fragment>
            <div id="FooterContact">
          <div className="screen">
            <div className="screen-header"></div>
            <div className="screen-body">
              <div className="screen-body-item left">
                <div className="app-title">
                  {(alert !== "CONTACT ME!" && (<span style={{ color: "green"}} >{alert}</span>))||(
                      <span>{alert}</span>
                  )}
                      
                </div>
                <div className="app-contact">
                  CONTACT INFO : +32/484.98.95.34
                </div>
              </div>
              <div className="screen-body-item">
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="app-form" >
                  <div className="app-form-group">
                    <input className="app-form-control" name="name" aria-describedby="nameAlert" placeholder="NAME" ref={register} />
                    {errors.name && (<small id="nameAlert" className="form-text" style={{ color: "red"}} >{errors.name.message}</small>)}
                  </div>
                  <div className="app-form-group">
                    <input className="app-form-control" name="email" placeholder="EMAIL" ref={register} />
                    {errors.email && (<small id="nameAlert" className="form-text" style={{ color: "red"}} >{errors.email.message}</small>)}
                  </div>
                  <div className="app-form-group">
                    <input className="app-form-control" name="title" placeholder="TITLE" ref={register} />
                    {errors.title && (<small id="nameAlert" className="form-text" style={{ color: "red"}} >{errors.title.message}</small>)}
                  </div>
                  <div className="app-form-group message">
                    <textarea className="app-form-control" name="message" placeholder="MESSAGE" ref={register} />
                    {errors.message && (<small id="nameAlert" className="form-text" style={{ color: "red"}} >{errors.message.message}</small>)}
                  </div>
                  <div className="app-form-group buttons">
                    <button className="app-form-button">SEND</button>
                  </div>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </Fragment>
    )
}

export default ContactFooter;
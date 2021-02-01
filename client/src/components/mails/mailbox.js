import { Fragment, useEffect, useState } from "react";
//import { useHistory } from "react-router";
import WriteMsg from "./writemsg";

const MailBox = ({currentUser}) =>{

    const [mails, setMails] = useState([]);
    //const [mailIndex, setMailIndex] = useState();
    const [focusMail, setFocusMail] = useState();
    const [mailInfos, setMailInfos] = useState([]);
    const [inboxActive, setInboxActive] = useState(true);
    const [writeMsg, setWriteMsg] = useState(false);
    //const history = useHistory();

    useEffect(() => {
        const getMails = async () => {
          try {
            const response = await fetch(
              `http://localhost:8080/api/mails/owner_id/${currentUser.id}`
            );
            const jsonData = await response.json();
            setMails(jsonData);
          } catch (err) {
            console.log(err.message);
          }
        };
        getMails();
      }, [currentUser.id]);

      const toggleInbox = async () =>{
        setInboxActive(true);
        setWriteMsg(false);
      }

      const toggleWriteMsg = async () =>{
        setInboxActive(false);
        setWriteMsg(true);
      }

      const mailFocus = async (id) =>{
          try {
              setFocusMail(id);
          } catch (error) {
              console.error(error.message);
          }
      }

      const showMail = async (id) =>{
          try {
              //setMailIndex(index);
              //console.log(mails[index]);
              const result = mails.filter(mail=> mail.id === id);
              setMailInfos(result);
              //console.log(result);
          } catch (error) {
              console.error(error.message);
          }
      }

      const updateMessage = async (e, Info) =>{
          e.preventDefault();
          try {
            const name = Info.name;
            const title = Info.title;
            const email = Info.email;
            const message = Info.message;
            const sender_id = Info.sender_id;
            const owner_id = Info.owner_id;
            const recent = false;
            const updateArray = [];

            const body = { name, email, title, message, sender_id, owner_id, recent};
            const response = await fetch(
                `http://localhost:8080/api/mails/${Info.id}`,
                {
                  method: "PUT",
                  headers: { "Content-type": "application/json" },
                  body: JSON.stringify(body),
                }
              ).then((res) => res.clone().json());
            const updateMailInfos = {
                id: Info.id,
                name: name,
                title: title,
                email: email,
                message: message,
                sender_id: sender_id,
                owner_id: owner_id,
                recent: recent,
                createdAt: Info.createdAt,
                updatedAt: Info.updatedAt
            };

            updateArray.push(updateMailInfos);
            //console.log(updateArray);
            setMailInfos(updateArray);

            const newMails = mails.map((item)=>{
                return item.id === Info.id ? updateMailInfos : item;
            });

            /*const newMails = mails.map((item, index)=>{
                return index === MailIndex ? updateMailInfos : item;
            });*/

            //console.log(newMails);
            setMails(newMails);

            console.log(response);
          } catch (error) {
              console.error(error.message);
          }
      }

      const deleteMail = async (id) =>{
          try {
              const deleteMail = await fetch(`http://localhost:8080/api/mails/${id}`, 
              {
                method: "DELETE"
              }).then((res)=> res.clone().json());
              
              setMails(mails.filter((mail)=> mail.id !== id));
              setMailInfos(mailInfos.filter((mailInfo)=> mailInfo.id !== id));
              console.log(deleteMail);
          } catch (error) {
              console.error(error.message)
          }
      }

    return(
        <Fragment>
        <div className="container text-center" id="usersList" style={{marginTop: "50px", marginBottom: "50px"}}>
            <div className="ComponentTitle">
                <div>
                    <h1>MailBox</h1>
                </div>
            </div>
            <div className="mailtoolbar" style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center"}} >
                <button type="button" className="btn btn-primary" style={{marginRight: "10px"}} onClick={()=> toggleInbox()}>
                    <i className="far fa-edit"></i>
                    Inbox
                </button>
                <button type="button" className="btn btn-warning" onClick={()=> toggleWriteMsg()}>
                    <i className="far fa-edit"></i>
                    New Message 
                </button>
            </div>
            {inboxActive && (<div className="mailbox" style={{border: "1px solid #bdbdbd", minHeight: "500px",maxHeight: "700px", backgroundColor: "white", display: "flex", flexDirection: "row", marginTop: "10px"}} >
                <div style={{ width: "20%", borderRight: "1px solid #bdbdbd", overflow: "auto", backgroundColor: "grey"}}>
                    <ul style={{listStyleType: "none", padding: "0", display: "flex", flexDirection: "column"}}>
                        {mails.sort(({id: previousID}, {id: currentID})=> currentID - previousID).map((mail, index)=>(
                            <li  key={index}>
                            {(focusMail === mail.id && (<div className="mailboxname" style={{position: "relative",borderBottom: "1px solid #bdbdbd", backgroundColor: " rgb(210, 250, 146)",padding: "10px 5px", wordBreak: "break-word"}} onClick={(e)=>{mailFocus(mail.id); showMail(mail.id);}}>
                            {mail.recent === true && (<div className="recentMessage" style={{position: "absolute", right: "0", top: "0",padding: "0px 5px", fontSize: "8px", color: "white"}}><p>NEW</p></div>)}
                            <p>
                            {(new Date(mail.createdAt)).toLocaleDateString(
                                'nl-BE', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                }
                            )}
                            </p>
                            <p>{mail.name}</p>
                            </div>))}
                            {(focusMail !== mail.id && (<div className="mailboxname" style={{position: "relative",borderBottom: "1px solid #bdbdbd", padding: "10px 5px", wordBreak: "break-word"}} onClick={(e)=>{mailFocus(mail.id); showMail(mail.id)}}>
                            {mail.recent === true && (<div className="recentMessage" style={{position: "absolute", right: "0", top: "0",padding: "0px 5px", fontSize: "8px", color: "white"}}><p>NEW</p></div>)}
                            <p>
                            {(new Date(mail.createdAt)).toLocaleDateString(
                                'nl-BE', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                }
                            )}
                            </p>
                            <p>{mail.name}</p>
                            </div>))}
                        </li>
                        ))}
                    </ul>
                </div>
                <div style={{ position: "relative",width: "80%"}}>
                    {mailInfos.map((mailInfo)=>(
                        <div key={mailInfo.id} style={{width:"100%",height: "100%",display: "flex", flexDirection: "column", zIndex: "10"}}>
                             <div style={{position: "relative",borderBottom: "1px solid black", padding: "10px",textAlign: "left", backgroundColor: " white"}} >
                             {mailInfo.recent === true && (<div className="recentMessage" style={{position: "absolute", right: "0", top: "0",padding: "0px 5px", fontSize: "15px", color: "white"}}><p>NEW</p></div>)}
                                    <p>From: {mailInfo.name}</p>
                                    <p>Email: {mailInfo.email}</p>
                                    <p>Title: {mailInfo.title}</p>
                                </div>
                                <div style={{position: "relative", height: "100%", textAlign: "left", padding: "10px"}}>
                                    <p>{mailInfo.message}</p>
                                    <div style={{position: "absolute",width: "auto",bottom: "10px", right: "0", textAlign: "center", display: "flex", flexDirection: "row"}}>
                                    <button type="button" className="btn btn-outline-danger" style={{marginRight: "10px",color: "orange", padding: "1px 6px",fontSize: "30px"}} onClick={()=>{deleteMail(mailInfo.id)}}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                    <button type="button" className="btn btn-outline-success" style={{color: " rgb(161, 255, 55)", marginRight: "10px", padding: "1px 6px",fontSize: "30px"}} onClick={(e)=>updateMessage(e, mailInfo)}>
                                        <i className="far fa-check-circle"></i>
                                    </button>
                                    </div>
                                </div>
                        </div>
                    ))}
                </div>
            </div>)}
            {writeMsg && (
                <div className="mailbox" style={{border: "1px solid #bdbdbd", minHeight: "500px",maxHeight: "700px", backgroundColor: "white", display: "flex", flexDirection: "row", marginTop: "10px"}} >
                <WriteMsg currentUser={currentUser} />
                </div>
            )}
        </div>
        </Fragment>
    );

};
export default MailBox;
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments ,faInfoCircle ,faPaperPlane} from '@fortawesome/free-solid-svg-icons'

import React, { useState, useEffect } from 'react';
import Session_ticketdetails from "./Session_ticketdetails";
import Chat from "./Chat";

function Session_ticket(props) {
  const { id, appointment ,couemail ,stumail, chat } = props;

  const topic = appointment.topic;
  const  description = appointment.description;

  const [detailid, setDetailid] = useState("");
  const [chatid, setChatid] = useState("");


  const [unreadmsg ,setUnreadmsg] = useState(0);
  const [chatopen ,setChatopen] = useState(false);

  const [socket, setSocket] = useState(null);

 
  const handleSocket = (newSocket) => {
    setSocket(newSocket);
  };

    const handleunreadMsgcont = (val) => {
      //console.log(val);
      if(val === 0){setUnreadmsg( 0);
      //console.log("goto zero")
    }
      else{setUnreadmsg((unreadmsg)=> unreadmsg+val);
        //console.log("Increase")
      }
      //console.log(unreadmsg);

    };

  
 
 

  const handlechatopen = (state) => {



    setChatopen(state);
    setUnreadmsg(0);
    
    if(chatopen){
    
      if (socket) {
        // Send data to the WebSocket server
        const data = {
          type : "seenmarker" ,
          email: stumail,
        };
        socket.send(JSON.stringify(data));}
    }
  };


  
  const handleDataFromChild = (data) => {
    // Do something with the data received from the child component
    console.log('Data from child:', data);
  };


  useEffect(() => {
    setDetailid(`#ticketdetail${id}`);
    setChatid(`#chat${id}`);

  }, [id]);



  return (
    <>
      <Session_ticketdetails topic={topic} description={description} id={id} appointment = {appointment} />
      <Chat couemail={couemail} id={id} chat={chat} appointment = {appointment} stumail= {stumail}
      unreadmsg = {unreadmsg} handleunreadMsgcont={handleunreadMsgcont}
      chatopen={chatopen} handlechatopen={handlechatopen}
      socket={socket} handleSocket = {handleSocket} />

      <div className="ticket-item">
        <div className="row">
          <div className="ticket-user col-md-6 col-sm-12" style={{ textAlign: 'left' }}>
            <span className="user-name">{topic}</span>
          </div>
          <div className="ticket-time col-md-4 col-sm-6 col-xs-12">
            <div className="divider hidden-md hidden-sm hidden-xs"></div>
            <i className="fa fa-clock-o"></i>
            <span className="time">{couemail}</span>
          </div>
          <div className="ticket-type col-md-2 col-sm-6 col-xs-12" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              data-bs-target={chatid}
              data-bs-toggle="modal"
              onClick={() => handlechatopen(true)}
              style={{
                marginRight: '20px', // Add margin to the right
                border: 'none', // Remove border
                background: 'none', // Remove background
                padding: '0', // Remove padding
                cursor: 'pointer', // Add cursor style
              }}
            >
              <FontAwesomeIcon icon={faComments} />
              {unreadmsg !== 0 && <span class="badge rounded-pill badge-notification bg-danger">{unreadmsg}</span>}
            </button>

            <button
              type="button"
              data-bs-target={detailid}
              data-bs-toggle="modal"
              style={{
                marginRight: '0', // Add margin to the right
                border: 'none', // Remove border
                background: 'none', // Remove background
                padding: '0', // Remove padding
                cursor: 'pointer', // Add cursor style
              }}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Session_ticket;
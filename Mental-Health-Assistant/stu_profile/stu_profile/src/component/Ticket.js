import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import React, { useState, useEffect } from 'react';
import TicketDetail from "./TicketDetail";

function Ticket(props) {
  const { topic, time, status, description, id  ,selectedValue} = props;

  const [detailid, setDetailid] = useState("");
  const [state, setState] = useState(false);
  
  console.log(time);

  useEffect(() => {
    setDetailid(`#ticketdetail${id}`);

    if (status === "Assigned") {
      setState(true);
    } else {
      setState(false);
    }
    
  }, [id, status]);


  const formattedTime = (time.toString()).split('GMT')[0];

  return (
    <>
      <TicketDetail topic={topic} description={description} id={id} selectedinit ={selectedValue} />
      { !state &&
      <button
        type="button"
        className="btn ticket-item"
        data-bs-target={detailid}
        data-bs-toggle="modal"
      >
        <div className="row">
          <div className="ticket-user col-md-6 col-sm-12" style={{ textAlign: "left" }}>
            <span className="user-name">{topic}</span>
          </div>
          <div className="ticket-time col-md-4 col-sm-6 col-xs-12">
            <div className="divider hidden-md hidden-sm hidden-xs"></div>
            <i className="fa fa-clock-o"></i>
            <span className="time">{formattedTime}</span>
          </div>
          <div className="ticket-type col-md-2 col-sm-6 col-xs-12">
            <span className="divider hidden-xs"></span>
            <span className="type">{status}</span>
          </div>
          {state && <div className="ticket-state bg-palegreen"></div>}
          {!state && <div className="ticket-state bg-yellow"></div>}
        </div>
      </button>}

      { state &&
      <button
        type="button"
        className="btn ticket-item"
      >
        <div className="row">
          <div className="ticket-user col-md-6 col-sm-12" style={{ textAlign: "left" }}>
            <span className="user-name">{topic}</span>
          </div>
          <div className="ticket-time col-md-4 col-sm-6 col-xs-12">
            <div className="divider hidden-md hidden-sm hidden-xs"></div>
            <i className="fa fa-clock-o"></i>
            <span className="time">{formattedTime}</span>
          </div>
          <div className="ticket-type col-md-2 col-sm-6 col-xs-12">
            <span className="divider hidden-xs"></span>
            <span className="type">{status}</span>
          </div>
          {state && <div className="ticket-state bg-palegreen"></div>}
          {!state && <div className="ticket-state bg-yellow"></div>}
        </div>
      </button>}
    </>
  );
}

export default Ticket;

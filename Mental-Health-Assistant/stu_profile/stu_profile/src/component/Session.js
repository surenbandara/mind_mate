import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Session_ticket from "./chatcomponent/Session_ticket";
import Application from "./Application";
import { useState, useEffect } from 'react';


import { useCookies } from "react-cookie";

function Session() {
  const [data,setData] =  useState([]);
  const [token, setMMtoken] = useCookies(["MMtoken"]);
  const [email, setMMemail] = useCookies(["MMemail"]);
  const url = "http://localhost:5000";

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
   
    
    console.log("------------------------------------");

    const response = await fetch(url+'/profile/sessions'+"?email="+email.MMemail+"&token="+token.MMtoken);

    const data = await response.json();
    setData(data.data);

    
  }

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-6 px-2">
            <p> </p>
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="row">
              <div class="col-md-12">
                <div class="widget-box">
                  <div class="widget-header">
                    <div class="d-flex justify-content-between">
                      <div></div>
                      <div class="widget-caption themesecondary">
                        Sessions
                      </div>

                      <span>
                        
                      </span>
                    </div>
                  </div>
                  <Application></Application>

                  <div class="widget-body">
                    <div class="widget-main no-padding">
                      <div class="tickets-container">
                        <ul class="tickets-list">

                          {data.map((item) => (
                        
                             <div class="row"><Session_ticket
                             id = {item.id}
                             appointment={item.appointment}
                             couemail={item.councilor}
                             stumail = {item.student}
                             chat={item.chat}
                           ></Session_ticket>
                           </div>
                            
                          ))}
                         
                         
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Session;

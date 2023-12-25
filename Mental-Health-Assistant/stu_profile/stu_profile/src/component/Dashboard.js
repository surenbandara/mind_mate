import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Ticket from "./Ticket";
import Application from "./Application";
import { useState, useEffect } from 'react';

import { useCookies } from "react-cookie";
import ChartComponent from "./ChartComponent";

function Dashboard() {
  const [data,setData] =  useState([]);
  const [token, setMMtoken] = useCookies(["MMtoken"]);
  const [email, setMMemail] = useCookies(["MMemail"]);

  const url = "https://3e82-2402-4000-2281-9cd1-8974-579a-3f2a-f6d5.ngrok-free.app";
  
  useEffect(() => {
    const fetchDataOnMount = async () => {
      await fetchData(); // Fetch data initially when the component is mounted
    };

    fetchDataOnMount();
  }, []);
  useEffect(() => {
  
    const interval = setInterval(fetchData, 2000);

    return () => {
      
      clearInterval(interval);
    };
   
  }, []);

  async function fetchData() {
   
    
    console.log("+++++++++++++++++");
    console.log(token);
    console.log(email);
    const response = await fetch(url+'/profile/appointments'+"?email="+email.MMemail+"&token="+token.MMtoken);
    console.log(response)
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
                        Appointments
                      </div>

                      <span>
                        <button
                          class="btn btn-primary btn-sm"
                          data-bs-target="#application"
                          data-bs-toggle="modal"
                        >
                          Create an Appointment
                        </button>
                      </span>
                    </div>
                  </div>
                  <Application></Application>

                  <div class="widget-body">
                    <div class="widget-main no-padding">
                      <div class="tickets-container">
                        <ul class="tickets-list">

                          {data.map((item) => (
                             <div class="row"><Ticket
                             id={item.id}
                             topic={item.topic}
                             description={item.description}
                             time={item.time}
                             status={item.status}
                             selectedValue = {item.selectedValues}
                           ></Ticket>
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

export default Dashboard;

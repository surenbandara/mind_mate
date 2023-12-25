import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt ,faMessage ,faUsers} from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import ProfileNavigationItem from "./Profilenavigation";

const style = {
    "margin-top" : "2px;"
}
function Navbar(props){
  
 
    return(
        <>

<nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
  <div class="container-fluid justify-content-between">
 
    <div class="d-flex">
     
      <a class="navbar-brand me-2 mb-1 d-flex align-items-center" href="#">
       MindMate
      </a>


    </div>


  
    <ul class="navbar-nav flex-row">
    
    <li class="nav-item me-3 me-lg-1">
    <a class="nav-link" >
          <span onClick={() => {props.setContent(0)}}>  <FontAwesomeIcon icon={faTachometerAlt} /></span>
    </a>
  
      </li>

    <li class="nav-item me-3 me-lg-1">
    <a class="nav-link" >
          <span onClick={() => {props.setContent(1)}}> <FontAwesomeIcon icon={faMessage} /></span>
        
          </a>
   
      </li>

      <li class="nav-item me-3 me-lg-1">
        <a class="nav-link" >
        <span onClick={() => {props.setContent(2)}}>  <FontAwesomeIcon icon={faUsers} /></span>
    
        </a>
      </li>

      <ProfileNavigationItem></ProfileNavigationItem>
      
    </ul>

  </div>
</nav>





   
      </>
    );
}

export default Navbar
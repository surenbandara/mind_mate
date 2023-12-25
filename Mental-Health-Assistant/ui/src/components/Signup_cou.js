import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { useCookies } from "react-cookie";

function Signup_cou(){
  const role = "councilor"
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [TaC, setTaC] = useState(false);
  const [Allow, setAllow] = useState(false);

  const [hover, setHover] = useState("true");

  const [MMtoken, setMMtoken] = useCookies(["MMtoken"]);
  const [MMemail, setMMemail] = useCookies(["MMemail"]);



  const url = "https://3e82-2402-4000-2281-9cd1-8974-579a-3f2a-f6d5.ngrok-free.app";
   
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleTaCChange = (event) => {
    
    setTaC(event.target.checked);
  };

  

  

  const loggin_process = async (res) =>{
          const data = await res.json();
          console.log("Loggin process");
          console.log(data.success);



          if(data.success){
            setMMemail("MMemail", data.email);
            setMMtoken("MMtoken", data.token);
            
            console.log(data.email)
            window.location.href = url+'/account?token='+data.token+'&email='+data.email;
 
            
          }
  }
  const login = (res) => {

    console.log("Loggin");

    fetch(url+'/login', {
         method: 'POST',
         body: JSON.stringify({
            email: email,
            password: password, 
           
         }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
      })
         .then((res) =>loggin_process(res))
        
         .catch((err) => {
          console.log("Error");
            console.log(err.message);
         });
   
    
   
  }
   
   // Handle psosts request
   const handleSubmit = (event) => {
    
    event.preventDefault();
 
//  const [title, setTitle] = useState('');
            //  const [body, setBody] = useState('');
    if(TaC){
      setAllow(false)
      fetch(url+'/signup', {
         method: 'POST',
         body: JSON.stringify({
            email: email,
            password: password, //  const [title, setTitle] = useState('');
            role : role
         }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
      })
         .then((res) =>login(res.json()))
        
         .catch((err) => {
            console.log(err.message);
         });}

    else{
      setAllow(true)
    }
   };

   


    return(
      
       < div class="modal fade" id="cou" aria-hidden="true"  data-bs-backdrop="true"   aria-labelledby="exampleModalToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered" >
    <div class="modal-content">
      <div class="modal-header">

      <div className="container">
        <div class="row">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>

        <div class="row">
          
        <h1 class="modal-title fs-4 d-flex justify-content-center" id="exampleModalToggleLabel">Sign up as Councilor</h1> </div>

        
        </div>

      
      </div>
      <div class="modal-body">
        
      <form class="row g-3">

      <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Email</label>
    <input type="email" class="form-control" onChange={handleEmailChange} id="inputEmail4" placeholder="@example.com"></input>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Create password</label>
    <input type="password" class="form-control" onChange={handlePasswordChange} id="inputPassword4" ></input>
  </div>


  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck" onChange={handleTaCChange}></input>
      <label class="form-check-label" for="gridCheck">
       Agree to terms and conditions
      </label>

     {Allow && <div class="text-danger">You must agree with terms and conditions</div>} 
      

    </div>
   
  </div>
 <div class="col-12 d-flex justify-content-center">
    <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Sign up</button>
  </div>
</form>

</div>
</div>

      </div>
      
     
    </div>
    );
}


export default Signup_cou
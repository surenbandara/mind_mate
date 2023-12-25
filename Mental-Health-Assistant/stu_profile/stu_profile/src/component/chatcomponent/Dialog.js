import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useState , useEffect} from "react";
import Cookies from 'js-cookie';
import { useCookies } from "react-cookie";




function Dialog(props) {
    const {stumail,email, message , time} = props;

    const [self,setSelf] = useState("");

    useEffect(() => {
        if(stumail===email){setSelf("self");}
        else{setSelf("other");}})

    return(
        <>
        {(self === "other") && 
        <div class="d-flex flex-row justify-content-end mb-4 pt-1">
        <div>
          <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">{message}</p>
          <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">{time}</p>
        </div>
        
      </div>}


      {(self === "self") && 
        <div class="d-flex flex-row justify-content-start mb-4">
             
        <div>
        <p class="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: '#f5f677' }}>
        {message}
        </p>
        <p class="small ms-3 mb-3 rounded-3 text-muted">{time}</p>
        </div>

        </div>}
        
        
        
        </>
    );
}


export default Dialog;
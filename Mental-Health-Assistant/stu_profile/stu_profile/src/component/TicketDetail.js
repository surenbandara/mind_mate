import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useState , useEffect} from "react";
import Cookies from 'js-cookie';
import { useCookies } from "react-cookie";



function TicketDetail(props) {
  const [topic, setTopic] = useState( props.topic);
  const [description, setDescription] = useState(props.description);
  const [id,setId]= useState(props.id);
  const [selectedValues, setSelectedValues]= useState(props.selectedinit);
  const [detailid ,setDetailid]= useState('') ;
  
  const [token, setMMtoken] = useCookies(["MMtoken"]);
  const [email, setMMemail] = useCookies(["MMemail"]);

  const url = "https://3e82-2402-4000-2281-9cd1-8974-579a-3f2a-f6d5.ngrok-free.app";

  useEffect(() => {
    console.log("Id for ticket",id);
    setDetailid("ticketdetail"+id);})

   const handleSelectChange = (index, value) => {
      
      const updatedValues = [...selectedValues];
      updatedValues[index] = value;
      setSelectedValues(updatedValues);
      console.log(selectedValues);
    };

  const handleTopicchange = (event) => {
    setTopic(event.target.value);
  };

  const handleDescriptionchange = (event) => {
    setDescription(event.target.value);
  };

  const deleteappointment  = (event) => {
    event.preventDefault();
    
    
    fetch(url+"/profile/deleteappointment", {
      method: "DELETE",
      body: JSON.stringify({
        id:id,
        token: token.MMtoken,
        email: email.MMemail
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => window.location.href = url+'/account'+'?token='+token.MMtoken+'&email='+email.MMemail)

      .catch((err) => {
        console.log(err.message);
      });
  };


  const submitapplication= (event) => {
    event.preventDefault();
    const date = new Date();
    const showTime = date.toString();


    fetch(url+"/profile/editappointment", {
      method: "POST",
      body: JSON.stringify({
        topic: topic,
        description: description,
        time: showTime,
        id:id,
        token: token.MMtoken,
        email:email.MMemail ,
        selectedValues : selectedValues
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => window.location.href = url+'/account'+'?token='+token.MMtoken+'&email='+email.MMemail)

      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div
    class="modal fade"
    id={detailid}
    aria-hidden="true"
    data-bs-backdrop="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <div className="container">
              <div class="row">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div class="row">
                <h1
                  class="modal-title fs-4 d-flex justify-content-center"
                  id="exampleModalToggleLabel"
                >
                Edit Appointment
                </h1>{" "}
              </div>
            </div>
          </div>
          <div class="modal-body"  style={{ maxHeight: '400px', overflowY: 'auto' }}>

          <section>

          <div class="col-md-12">
          <label for="inputEmail4" class="form-label">
          What type of therapy are you looking for?
          </label>
          <select class="form-select" 
          onChange={(e) => handleSelectChange(0, e.target.value)}
          value={selectedValues[0]} >

            <option value="0">Individual therapy</option>
            <option value="1">Couple therap</option>
        
          </select>
        </div>


        <div class="col-md-12">
          <label for="inputEmail4" class="form-label">
          What language do you prefer for the counseling sessions?
          </label>
          <select class="form-select" onChange={(e) => handleSelectChange(1, e.target.value)} 
          value={selectedValues[1]}>
            <option value="0">Sinhala</option>
            <option value="1">English</option>
            <option value="2">Tamil</option>
          </select>
        </div>

        <div class="col-md-12">
          <label for="inputEmail4" class="form-label">
          What are your expectations for your councilor?
          </label>
          <select class="form-select" onChange={(e) => handleSelectChange(2, e.target.value)}
          value={selectedValues[2]}>
            <option value="0">Listens</option>
            <option value="1">Teaches me new skills</option>
            <option value="2">Explores my past</option>
            <option value="3">Guides me in setting and maintaining goals</option>
            <option value="4">I don’t know</option>
          </select>
        </div>

        <div class="col-md-12">
          <label for="inputEmail4" class="form-label">
          Age of the councilor you are comfortable with:
          </label>
          <select class="form-select"  onChange={(e) => handleSelectChange(3, e.target.value)}
          value={selectedValues[3]}>
            <option value="0">30-40</option>
            <option value="1">40-50</option>
            <option value="2">Doesn’t matter</option>
          </select>
        </div>


        <div class="col-md-12">
          <label for="inputEmail4" class="form-label">
          Gender of the councilor
          </label>
          <select class="form-select"  onChange={(e) => handleSelectChange(4, e.target.value)}
          value={selectedValues[4]}>
            <option value="0">Female</option>
            <option value="1">Male</option>
            <option value="2">Other</option>
          </select>
        </div>


        <div class="col-md-12">
          <label for="inputEmail4" class="form-label">
          Preferred marital status of the councilor
          </label>
          <select class="form-select" onChange={(e) => handleSelectChange(5, e.target.value)} 
          value={selectedValues[5]}>
            <option value="0">Married</option>
            <option value="1">Unmarried</option>
            <option value="2">Doesn’t matter</option>
          </select>
        </div>
        

        <div class="col-md-12">
          <label for="inputEmail4" class="form-label">
          Preferred religion of the councilor
          </label>
          <select class="form-select" onChange={(e) => handleSelectChange(6, e.target.value)} 
          value={selectedValues[6]}>
            <option value="0">Buddhism</option>
            <option value="1">Christianity</option>
            <option value="2">Hinduism</option>
            <option value="3">Islam</option>
            <option value="4">Other</option>
            <option value="5">Doesn’t matter</option>
          </select>
        </div>

        <div class="col-md-12">
          <label for="inputEmail4" class="form-label">
          What led you to seek professional help today
          </label>
          <select class="form-select" onChange={(e) => handleSelectChange(7, e.target.value)}
          value={selectedValues[7]}>
            <option value="0">I feel depressed</option>
            <option value="1">I am anxious or overwhelmed</option>
            <option value="2">I have frequent mood changes</option>
            <option value="3">I struggle in relationships</option>
            <option value="4">I am grieving</option>
            <option value="5">I have experienced trauma</option>

            <option value="6">I am going through a challenging time</option>
            <option value="7">I lack self confidence</option>
            <option value="8">I feel like no one understands me or I don’t belong anywhere</option>
            <option value="8">I want to improve myself mentally</option>
            <option value="9">I thought of ending my life and want to get help</option>
            <option value="10">Other </option>
          </select>
        </div>

        <div class="col-md-12">
          <label for="inputEmail4" class="form-label">
          Have you ever thought of hurting yourself
          </label>
          <select class="form-select"  onChange={(e) => handleSelectChange(8, e.target.value)}
          value={selectedValues[8]}>
            <option value="0">Yes</option>
            <option value="1">No</option>

          </select>
        </div>


        <div class="col-md-12">
          <label for="inputEmail4" class="form-label">
          How frequent do you get such thoughts
          </label>
          <select class="form-select" onChange={(e) => handleSelectChange(9, e.target.value)} 
          value={selectedValues[9]}>
            <option value="0">Everyday </option>
            <option value="1">Often</option>
            <option value="2">Occasionally</option>
            <option value="3">Never</option>

          </select>
        </div>

        <div class="col-md-12">
          <label for="inputEmail4" class="form-label">
          Have you ever taken any actions to rehearse or practice ending your life? (e.g., tying noose, loading gun, measuring substance) 
          </label>
          <select class="form-select"  onChange={(e) => handleSelectChange(10, e.target.value)}
          value={selectedValues[10]}>
            <option value="0">Yes </option>
            <option value="1">No</option>
          

          </select>
        </div>

        <div class="col-md-12">
          <label for="inputEmail4" class="form-label">
          Do you feel like ending your life is the only solution for your problems
          </label>
          <select class="form-select" onChange={(e) => handleSelectChange(11, e.target.value)} 
          value={selectedValues[11]}>
            <option value="0">Yes </option>
            <option value="1">No</option>
          

          </select>
        </div>


        <div class="col-md-12">
          <label for="inputEmail4" class="form-label">
          Do you feel like you need urgent care
          </label>
          <select class="form-select" onChange={(e) => handleSelectChange(12, e.target.value)} 
          value={selectedValues[12]}>
            <option value="0">Yes </option>
            <option value="1">I need help but not urgent</option>
            <option value="2">No</option>
          

          </select>
        </div>

      

            <div class="col-md-12">
              <label for="inputEmail4" class="form-label">
                Topic
              </label>
              <input
                class="form-control"
                onChange={handleTopicchange}
                value={topic}
                
              ></input>
            </div>
            <div class="col-md-12">
              <label for="inputPassword4" class="form-label">
                Description
              </label>
              <textarea
                 
                class="form-control"
                onChange={handleDescriptionchange}
                value={description}
            
              ></textarea>
            </div>

            
            </section>
            </div>
            <div class="modal-footer col-12 d-flex justify-content-center">
              <button type="submit" class="btn btn-primary" onClick={submitapplication}>
               
               save
              </button>
              <button type="submit" class="btn btn-danger" onClick={deleteappointment}>
               
               delete
              </button>
            </div>

          
         
        </div>
      </div>
   </div>
  );
}

export default TicketDetail;

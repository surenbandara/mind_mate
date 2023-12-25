import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useState , useEffect , useRef ,inputRef} from "react";
import Cookies from 'js-cookie';
import { useCookies } from "react-cookie";
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dialog from "./Dialog";
import { w3cwebsocket as WebSocket } from 'websocket';





function Chat(props) {
    const { couemail ,id ,chat: initialChat  ,appointment ,stumail
    , unreadmsg ,handleunreadMsgcont , chatopen , handlechatopen ,
    socket , handleSocket } = props;

    const [chats, setChats] = useState(initialChat);
    const [ newchat , setNewChats] = useState([]);
 

 
  const [chatid ,setChatid]= useState('') ;

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [connectedUsers, setConnectedUsers] = useState([]);


  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  const bottomRef = useRef(null);

  const url = "wss://0605-2402-4000-2281-9cd1-8974-579a-3f2a-f6d5.ngrok-free.app";

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  };

  const handleClose = () => {
    handlechatopen(false);
    console.log("CCCCCCCCCCLLLLLLLLLLOOOOOSSSSSEEEEEE");
  };


  const playTone = () => {
    const audio = new Audio("http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a");
    audio.play();
  };
  



  useEffect(()=>{
    console.log("==============================");
    scrollToBottom();
  },[newchat]);

  const delay = 1000; // 1 second

    const timer = setTimeout(() => {
      // Code to execute after the delay
      console.log('1 second has passed');
    }, delay);


    useEffect(() => {
      const delay = 500; // 1 second
  
      const timer = setTimeout(() => {
        // Code to execute after the delay
        console.log('1 second has passed');
        scrollToBottom();

      }, delay);
  
      return () => {
        // Cleanup function to clear the timeout if the component unmounts before the delay
        clearTimeout(timer);
      };
    }, [chatopen])




  useEffect(()=>{
  setNewChats(newchat=> {
    const updatedChat = chats.map((message) => {
      if (message === couemail) {
    
        
        return null
        
      }
      else if ( message === stumail) {
        handleunreadMsgcont(0);
        return null
        
      }

      else {
    
        handleunreadMsgcont(1);
        return message;
      }

      
    });
  
    return updatedChat;
  });

 
},[]
);
  
  useEffect(() => {

   
    scrollToBottom();
    console.log("Id for ticket",id);
    setChatid("chat"+id);


    // Create a new WebSocket connection
    const newSocket = new WebSocket(url ,undefined,undefined, {
      headers:{email: stumail,
        id: id,},
      });

    // Set up event listeners for WebSocket events
    newSocket.onopen = () => {
      console.log('WebSocket connection established.');

      const data = {
        type: 'connection_data',
        payload: {
          email: stumail,
          id: id,
        },
      };
      newSocket.send(JSON.stringify(data));
    };

    newSocket.onmessage = (event) => {
      // Handle received data from the server
      
      const data = JSON.parse(event.data);
      console.log(data);
      addChat(data);

      if(!chatopen){
        playTone();
        console.log(unreadmsg);
        handleunreadMsgcont(1);
      }

    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    // Store the WebSocket connection in the state
    handleSocket(newSocket);
 
    
  
    return () => {
      newSocket.close();
    };


},[chatopen])


const addChat = (newChatItem) => {
  setNewChats((prevChat) => [...prevChat, newChatItem]);
};


const handleInputChange = (event) => {
  setInputValue(event.target.value);
};

  // Function to send a message
const sendMessage = () => {
  const date = new Date();
  const inputValue = inputRef.current.value;
  addChat({"email": stumail , "time":date.toString().split('GMT')[0] , "message" : inputValue})
  if (socket) {
    // Send data to the WebSocket server
    const data = {
      type : "message" ,
      sender: stumail,
      recipient: couemail,
      time : date.toString(),
      id : id ,
      message: inputValue,
    };
    socket.send(JSON.stringify(data));
  }

  setInputValue('');
  };


  return (
    <div
    class="modal fade"
    id={chatid}
    aria-hidden="true"
    data-bs-backdrop="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header" >
            <div className="container">
              <div class="row">
                <button
                  onClick={handleClose}
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div class="row">
              <h1
            className=" d-flex justify-content-center"

            style={{ fontSize: '1rem' }}
            >
            {appointment.topic}
            </h1>
            <h1
            className="d-flex justify-content-center"
    
            style={{ fontSize: '0.9rem' }}
            >
            Councilor : {couemail}
            </h1>
              </div>
            </div>
          </div>
          <div class="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        


        <section>

   
        
          <div class="card-body" ref={chatContainerRef}  data-mdb-perfect-scrollbar="true"  style={{"position": "relative;" ,"height": "400px;"}}>

          {newchat.map((item) => {
            const jsonData = JSON.parse(JSON.stringify(item));
            if (item !== null) {
            return (
                <Dialog
                stumail={stumail}
                email={jsonData.email}
                message={jsonData.message}
                time={jsonData.time.split('GMT')[0]}
    
                ></Dialog>
            );}

            else{
              return null;
            }
            })}
             <div ref={bottomRef} />

          </div>
         
     

        </section>




   










            

          
          </div>



          


         
          <div class="card-footer text-muted d-flex justify-content-start align-items-center p-3">
  <input
    type="text"
    value={inputValue}
    onChange={handleInputChange}
    ref={inputRef}
    class="form-control form-control-lg"
    id="exampleFormControlInput1"
    placeholder="Type message"
    style={{ marginRight: '10px' }} // Add margin to the right
  />

<button

  type="button"
  style={{
    border: 'none', // Remove border
    background: 'none', // Remove background
    padding: '0', // Remove padding
    cursor: 'pointer', // Add cursor style
  }}

  onClick={sendMessage}
>
  <FontAwesomeIcon
    icon={faPaperPlane}
    style={{
      fontSize: '24px', // Increase the font size (adjust the value as needed)
      color: 'blue', // Change the color (replace 'blue' with your desired color)
    }}
  />
</button>

</div>

     
        </div>
      </div>
   </div>
  );
}

export default Chat;

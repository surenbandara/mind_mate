import threading
from flask import Flask, jsonify, redirect , render_template , send_file, request 

from flask_cors import CORS
import datetime
import os
import random
import string

from sendemails import send_email;

import asyncio
import websockets
import json


app = Flask(__name__,template_folder='Templates')
cors = CORS(app)


emails =[]
passwords = []
roles=[]
ids=[]

sessionids=[]

sessions={}

tokens = []
appointment =[]
appointment_id = 0
session_id =0



####################### Src accessing ######################

@app.route('/static/js/<path:filename>')
def static1(filename):
    print(filename)
    return send_file('Templates/ui/static/js/'+ filename)

@app.route('/static/css/<path:filename>')
def static2(filename):
    print(filename)
    return send_file('Templates/ui/static/css/'+ filename)

@app.route('/static/media/<path:filename>')
def static3(filename):
    print(filename)
    return send_file('Templates/ui/static/media/'+ filename)

@app.route('/<path:filename>')
def static4(filename):
    print(filename)
    return send_file('Templates/ui/' +filename)


        

@app.route('/')
def hello_world():
    return render_template('/ui/index.html')

@app.route('/account')
def account():

    args = request.args

    token = args.get("token")
    email = args.get("email")

    valid = check_login(token , email)

    print(valid)

    if(valid):

        if(roles[emails.index(email)]=="student"):
            return render_template('/ui/stu_account.html')
        
        elif(roles[emails.index(email)]=="councilor"):
            return render_template('/ui/cou_account.html')
    
    else:
        return redirect("/")

   

#############################Functions####################################


def calculate_seviarity(list):
    selectedlist = list.copy()

    value = 0

    if(int(selectedlist[8])==0):
        value += 3
    else:
        value +=0

    if(int(selectedlist[9])==0):
        value += 10
    elif(int(selectedlist[9])==1):
        value +=5
    elif(int(selectedlist[9])==2):
        value += 3
    else:
        value +=0


    if(int(selectedlist[10])==0):
        value += 15
    else:
        value +=0


    if(int(selectedlist[11])==0):
        value += 20
    else:
        value +=0


    if(int(selectedlist[12])==0):
        value += 25
    elif(int(selectedlist[12])==1):
        value +=3

    else:
        value +=0


    if(value<=8):
        return "Not urgent"
    
    elif(value<=30):
        return "Mild"

    else:
        return "Most urgent"
    
    

######################### Sign in ,up and login action ########################

def get_random_string(length):
    # With combination of lower and upper case
    result_str = ''.join(random.choice(string.ascii_letters) for i in range(length))
    # print random string
    return result_str

def check_login(token ,email):
    for tok in tokens:
        if(tok["token"]==token ):
            if(tok["email"]==email):
                return True
            
    return False

        


   
@app.route('/signup' ,methods = ['POST'])
def sign_up():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    role = data["role"]

    print("Sign up")
    print(email)
    print(password)
    
    emails.append(email)
    print(data)
    passwords.append(password)
    roles.append(role)
    
    appointment.append([])
    sessionids.append([])


    return jsonify({"success": True})



@app.route('/login' ,methods = ['POST'])
def loggin_():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    print("email",email)
    print("Password",password)

    print(emails)
    print(passwords)


    if(email not in emails):
        print("111111")
        return jsonify({"success": False , "message" : "Email is not registered"})
    
    else:
       if(password == passwords[emails.index(email)]):
           token = get_random_string(8)
           tokens.append({"token": token ,"email":email })

           print("token ",token)
           print("Email ",email)
        
           return jsonify({"success": True , "message" : "Successfully login" , "token": token , "email" : email})
   
             
       
       else:
           print("Exv")
           return jsonify({"success": False , "message" : "Password is wrong" })
    

################## Councilor profile actions ######################
@app.route('/profile/allappointments' ,methods = ['GET'])
def get_allappointments():
  args = request.args

  token = args.get("token")
  email = args.get("email")
  valid = check_login(token , email)


  if(valid):
    unassignedappointment = []

    for index in range(len(appointment)):
        email = emails[index]
        for i in appointment[index]:

            if i["status"] is not None:
                if(i["status"]=="Processing"):
                   sending_data = i
                   sending_data["email"] = email
                   unassignedappointment.append(sending_data)
        
    print(unassignedappointment)
    return {"data": unassignedappointment} ,200
  else:
        return redirect("/")
  

@app.route('/profile/handleappointment' ,methods = ['POST'])
def handle_appointment():

    print("J+Handle____________________________")
    global session_id
    
    data = request.get_json()
    id = data["id"]

    token=data["token"]
    email = data["email"]
    stuemail = data["stuemail"]
    
    valid=check_login(token ,email)

    if(valid):
        print("Vallid")
    
        for i in range(len(appointment[emails.index(stuemail)])):
            print(str(appointment[emails.index(stuemail)][i]['id']) +"=="+str(id) )
        
            if(appointment[emails.index(stuemail)][i]['id'] == id):

                subject = " Appointment Assignment to Councilor"
                content = f"""
Dear {stuemail},

We hope this email finds you well. We wanted to inform you about an update regarding your appointment with our medical facility.

We have assigned a dedicated councilor to handle your case and provide you with the necessary support and guidance. The councilor will be reaching out to you shortly to discuss your concerns and provide further assistance. Please note that it may take some time for the councilor to contact you due to their schedule and availability.

In the meantime, we kindly request you to patiently wait for the councilor's contact. If you have any urgent concerns or inquiries, please feel free to reach out to us at [Contact Information].

We appreciate your understanding and cooperation. Our primary goal is to ensure your well-being and provide you with the best possible care.

Thank you for choosing our medical facility, and we look forward to assisting you further.

Councilor = {email}
Best regards,
Mindmate.
"""
                
            
                email_thread = threading.Thread(target=send_email, args=([stuemail],subject , content))
                email_thread.start()

                print("Found appointment")
                sessionids[emails.index(stuemail)].append(session_id)
                sessionids[emails.index(email)].append(session_id)


                appointment[emails.index(stuemail)][i]["status"]= "Assigned"

                sessions[session_id] = {"appointment": appointment[emails.index(stuemail)][i] , "councilor" : email , "student":stuemail ,"chat":[]}

                appointment[emails.index(email)].append(appointment[emails.index(stuemail)][i])
                appointment[emails.index(stuemail)][i]["councilor"]= email

                session_id+=1
                break
           
        return jsonify({"success": True})
    else:
        return redirect("/")


################### Student Profile actions ##################################

@app.route('/profile/createappointment' ,methods = ['POST'])
def create_appointment():

    
    global appointment_id
    data = request.get_json()

    token=data["token"]
    email = data["email"]
    topic = data["topic"]
    description = data["description"]
    time = data["time"]
    selectedValues = data["selectedValues"]

    print(selectedValues)

    seviarity  = calculate_seviarity(selectedValues)
    valid=check_login(token ,email)
    if(valid):
        appointment_id= appointment_id+1
        appointment[emails.index(email)].append({"topic" :topic,"description" : description,"time" : time, "id":appointment_id,"selectedValues" : selectedValues , "seviarity" :seviarity ,  "status": "Processing"})   

        if(seviarity == "Most urgent") :
            indexes= [index for index, element in enumerate(roles) if element == "councilor"]
            counlist = [emails[index] for index in indexes]
           

            subject = " Urgent: High Severity Patient Case requiring immediate attention"
            content = f"""
            Dear Councilor [Councilor's Name],

I hope this email finds you well. I am writing to bring to your attention an urgent matter regarding a high severity patient case that requires immediate attention.

We have recently received information about a patient with a critical medical condition that demands immediate intervention. The patient's condition is severe and requires specialized care and attention. As a dedicated councilor, your expertise and assistance are vital in ensuring the best possible outcome for the patient.

I kindly request your immediate attention and support in addressing this critical situation. Your knowledge, guidance, and prompt action will greatly contribute to the well-being and recovery of the patient. The patient's details and specific medical information are outlined below:

Patient Name: {email}
Seviarity mark : {seviarity}
Severity Level: High"""

        email_thread = threading.Thread(target=send_email, args=(counlist,subject , content))
        email_thread.start()

        return jsonify({"success": True})
    
    else:
        return redirect("/")

@app.route('/profile/editappointment' ,methods = ['POST'])
def edit_appointment():
    data = request.get_json()

    topic = data["topic"]
    description = data["description"]
    time = data["time"]
    id = data["id"]

    token=data["token"]
    email = data["email"]
    valid=check_login(token ,email)

    selectedValues = data["selectedValues"]
    seviarity  = calculate_seviarity(selectedValues)

    if(valid):
    
        for i in range(len(appointment[emails.index(email)])):
            if((appointment[emails.index(email)][i]['id'] == id) and (appointment[emails.index(email)][i]["status"]=="Processing")):
                appointment[emails.index(email)][i]={"topic" :topic,"description" : description,"time" : time, "id": id, "selectedValues" : selectedValues , "seviarity" :seviarity ,"status": "Processing"}
                break
        return jsonify({"success": True})
    else:
        return redirect("/")


@app.route('/profile/deleteappointment' ,methods = ['DELETE'])
def delete_appointment():
    data = request.get_json()
    id = data["id"]
    
    token=data["token"]
    email = data["email"]
    valid=check_login(token ,email)

    if(valid):
        for i in range(len(appointment[emails.index(email)])):
            if((appointment[emails.index(email)][i]['id'] == id) and (appointment[emails.index(email)][i]["status"]=="Processing")):
                del appointment[emails.index(email)][i]
                break

        return jsonify({"success": True})
    else:
        return redirect("/")


@app.route('/profile/appointments' ,methods = ['GET'])
def get_appointments():
  args = request.args

  token = args.get("token")
  email = args.get("email")
  valid = check_login(token , email)


  if(valid):
    return {"data":appointment[emails.index(email)]} ,200
  

@app.route('/profile/sessions' ,methods = ['GET'])
def get_sessions():
  args = request.args

  token = args.get("token")
  email = args.get("email")
  valid = check_login(token , email)


  if(valid):
    chatidlist = sessionids[emails.index(email)]

    chatlist =[]

    for id in chatidlist:
        send_data = sessions[id]

        send_data["id"] = id
        chatlist.append(send_data)
    return {"data": chatlist} ,200
  else:
    return redirect("/")


####################################################################
# Store the connected clients
connected_clients = {}

async def handle_connection(websocket, path):
    print(connected_clients)
    client_id = ""
    try:
        async for message in websocket:
            data =json.loads(message)
           
            if data['type'] == 'connection_data':
                email = data['payload']['email']
                id = data['payload']['id']
                client_id = f"{email}_{id}"
                connected_clients[client_id] = websocket

            elif data['type'] == 'message':
        
                recipient = data['recipient']
                sender = data['sender']
                time = data['time']
                id = data['id']
                message =  data['message']
                recipient_id = f"{recipient}_{id}"
                print("SEssion :: ================================")
                print(sessions)
                print(recipient)
                duplicate = sessions[id]["chat"].copy()
                duplicate.append({"email":sender , "time": time , "message": message})
                sessions[id]["chat"] =  duplicate

                if recipient_id in connected_clients:
                    recipient_websocket = connected_clients.get(recipient_id)
            
                    if recipient_websocket:
                        send_message = {"email": sender, "time": time, "message": message}
                        send_message_str = json.dumps(send_message)
                        await recipient_websocket.send(send_message_str)

            elif data['type'] == 'seenmarker':
        
                email = data['email']
            
                duplicate = sessions[id]["chat"].copy()
                duplicate.append(email)
                sessions[id]["chat"] =  duplicate


    finally:

        del connected_clients[client_id]




def run_websocket_server():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    start_server = websockets.serve(handle_connection, 'localhost', 5002)
    loop.run_until_complete(start_server)
    loop.run_forever()




app.use_static = True
if __name__ == '__main__':
    websocket_thread = threading.Thread(target=run_websocket_server)
    websocket_thread.start()
    app.run(port=5000)






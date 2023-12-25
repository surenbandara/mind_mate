

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(recipient_emails, subject, message):
    # Create a MIME message object
    sender_email = 'bandaradpsd19@gmail.com'
    sender_password = 'lbwiunrtcaiytpdp'

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = ', '.join(recipient_emails)
    msg['Subject'] = subject

    # Attach the message body to the MIME message
    msg.attach(MIMEText(message, 'plain'))

    try:
        # Create an SMTP instance and establish a connection
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()

        # Login to the sender's email account
        server.login(sender_email, sender_password)

        # Send the email
        server.sendmail(sender_email, recipient_emails, msg.as_string())

        print("Email sent successfully!")

    except Exception as e:
        print("An error occurred while sending the email:", str(e))

    finally:
        # Close the SMTP connection
        server.quit()





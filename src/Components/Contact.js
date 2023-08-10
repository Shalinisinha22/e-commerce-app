import React from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function Contact() {
  return (
    <div className="contact-container" style={{margin:"2rem"}}>
        <h3 style={{color:"#4cd137",marginBottom:"1rem"}}>Contact US</h3>

        <div style={{color:"gray" ,marginBottom:"1rem"}}>
          <a href="tel:9155492401" style={{ textDecoration: "none" }}>
          <LocalPhoneIcon></LocalPhoneIcon>  <span style={{color:"gray"}}> &nbsp;9155492401</span>
                        </a>
        </div>
        <div style={{color:"gray",marginBottom:"1rem"}}>
          <a href = "mailto: matardana@gmail.com"  style={{ textDecoration: "none" }}> 
          <EmailIcon></EmailIcon>  <span style={{color:"gray"}}> &nbsp;matardana@gmail.com</span>
                        </a>
        </div>
        <div style={{color:"gray"}}>
            <a href="https://api.whatsapp.com/send?phone=9155492401" style={{ textDecoration: "none" }}> <WhatsAppIcon></WhatsAppIcon>  <span style={{color:"gray"}}> &nbsp;Chat With whatsapp</span></a> 
        </div>

      
    </div>
  )
}

export default Contact
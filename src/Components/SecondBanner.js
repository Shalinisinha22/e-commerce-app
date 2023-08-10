import React from 'react';
import b2 from "../assets/banner2.png"

function SecondBanner() {
  return (
    <div class="second-banner" style={{width:"100%",display:"flex",justifyContent:"center"}}>
        <img src={b2} alt="banner-image" style={{width:"80%",height:"100%",margin:"0"}}></img>
    </div>
  )
}

export default SecondBanner
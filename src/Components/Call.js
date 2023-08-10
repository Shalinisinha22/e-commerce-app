import React from 'react';
import Button from '@mui/material/Button';
import CallIcon from '@mui/icons-material/Call';

function Call() {
  return (
    <div className='call-btn-cont'>
        <a href="tel:9155492401">

        <Button size="small" variant="contained" className='btn' color="error"><CallIcon sx={{color:"white"}}></CallIcon>&nbsp;&nbsp;<span style={{color:"white"}}>Call Now</span> </Button>
        </a>
    </div>
  )
}

export default Call
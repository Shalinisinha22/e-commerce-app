import React from "react";
import { useNavigate } from "react-router-dom";
import "./Brands.css"

export default function Product(props) {
  const navigate=useNavigate()
  const handleClick=(name)=>{
    navigate(`/brand/${name}`)
  }
  return (
    <div className="img-card" key={props.id} style={{border:"none"}}>
      <img className="product-image" src={props.url} onClick={()=>handleClick(props.name)} alt="product image" />
     
    </div>
  );
}

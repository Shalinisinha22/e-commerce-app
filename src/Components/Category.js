import React, { useEffect, useState } from 'react';
import "./Category.css";
import img1 from "../assets/MATAR.gif";
import img2 from "../assets/vegetable.png";
import img3 from "../assets/fruits.png";
import img4 from "../assets/groceries.jpg";
import img5 from "../assets/flour.jpg";
import img6 from "../assets/pulses.png";
import img20 from "../assets/rice.png";
import img7 from "../assets/sugarsalt.png";
import img8 from "../assets/oilghee.png";
import img9 from "../assets/spices.png";
import img10 from "../assets/dryfruits.png";
import img11 from "../assets/snacks.jpg";
import img12 from "../assets/household.jpg";
import img13 from "../assets/eggs.jpg";
import img14 from "../assets/personalcare.jpg";
import img15 from "../assets/pooja.jpg";
import img16 from "../assets/medical.png";
import img17 from "../assets/frozen.png";
import img18 from "../assets/essential.png";
import img19 from "../assets/rice.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const products=[
  {
  
    id:1,
    img:img1,
    name:"Super Saving"
},
{
  
  id:2,
  img:img2,
  name:"Vegetables"
},
{
  
  id:3,
  img:img3,
  name:"Fruits"
},
{
  
  id:4,
  img:img4,
  name:"Groceries"
},
{
  
  id:5,
  img:img5,
  name:"Flours"
},
{
  
  id:6,
  img:img6,
  name:"Pulses"
},
{
  id:7,
  img:img20,
  name:"Rice & Rice Products"
},
{
  
  id:8,
  img:img7,
  name:"Salt, sugar & Jaggery"

},

{
  
  id:9,
  img:img8,
  name:"Oil & ghee"
},
{
  
  id:10,
  img:img9,
  name:"Spices"
},
{
  
  id:11,
  img:img10,
  name:"Dry Fruits & Nuts"
},
{
  
  id:12,
  img:img11,
  name:"Snacks & Beverages"
},
{
  
  id:13,
  img:img12,
  name:"Household Care"
},
{
  
  id:14,
  img:img13,
  name:"Eggs & Dairy"
},
{
  
  id:15,
  img:img14,
  name:"Personal Care"
},
{
  
  id:16,
  img:img15,
  name:"Pooja Samagri"
},

{
  
  id:17,
  img:img16,
  name:"Medical Care"
},
{
  
  id:18,
  img:img17,
  name:"Frozen Products"
},
{
  
  id:19,
  img:img18,
  name:"Essential"
},
]






function Category() {
  const navigate=useNavigate()
  const [category,setCategory]=useState([])

const loadCategory=async()=>{
  const res=await axios.get("https://matardana-api-xrjf.vercel.app/category");
  const data=res.data;
  console.log(data);

  setCategory(data)

}

useEffect(()=>{
  loadCategory()
},[])
const handleClick=(name)=>{
  navigate(`/shop/${name}`)
}
  return (
    <div className='category-containers' id="category">
      
      <div className='category-heading'>

       Shop By Category
      </div>
         
         <div className="category-lists" >
          {category.map((item)=>(
                 <div key={item.id} onClick={()=>handleClick(item.name)} className='category'>
                 <img src={item.img} alt={item.name}></img>
                 <p style={{marginTop:"0.2rem"}}>{item.name}</p>
                 </div>
          ))}
          
           
          
            
         </div>


    </div>
  )
}

export default Category
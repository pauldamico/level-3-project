import React, { useState, useEffect } from "react";
import memeimg from "../images/memeimg.png";
import axios from "axios"
import { nanoid } from "nanoid";

export default function Main() {
  const [meme, setMeme] = useState({ id:nanoid(), leftInput: "", rightInput: "", img: "" });
  const [listMeme, setListMeme] = useState([])

useEffect(()=>{
axios.get("https://api.imgflip.com/get_memes")
.then(res=>setMeme(prev=>({...prev, img:res.data.data.memes[Math.floor(Math.random(randomIndex) * 100)].url})))
.catch(err=>console.log(err))
},[listMeme])

function randomIndex (){
    Math.floor(Math.random() * 100)  
}

  const changeHandler = (e) => {
    const {value, name} = e.target
    setMeme(prev=>({...prev, [name]:value, id:nanoid()}))
  
  };

  const getNewImage = () =>{
    axios.get("https://api.imgflip.com/get_memes")
    .then(res=>setMeme(prev=>({...prev, img:res.data.data.memes[Math.floor(Math.random(randomIndex) * 100)].url})))
.catch(err=>console.log(err))
  }

  const submitHandler = (e)=>{ 
    e.preventDefault()
   
    setListMeme(prev=>([...prev, {...meme}]))
    console.log(listMeme)
    setMeme(prev=>({...prev, leftInput:"", rightInput:"", id:nanoid()}))
  }

const listMemes = listMeme.map(item=><div key = {item.id}className="div-list"> <img src={item.img} className="meme-img-list" />
<h1 className="top-text-list">{item.leftInput}</h1>
<h1 className="bottom-text-list">{item.rightInput}</h1></div>)

const reverseList = listMemes.reverse()

  return (
 <div>
    <div className="main-div">
      <form onSubmit={submitHandler} className="form">
        <button className="new-image" type ="button" onClick={getNewImage}>Get New Image</button>
        <input
          value={meme.leftInput}
          type="text"
          onChange={changeHandler}
          name="leftInput"
          className="left-input"
        />
        <input
          value={meme.rightInput}
          type="text"
          onChange={changeHandler}
          name="rightInput"
          className="right-input"
        />
        <button className="get-meme-button">Save Meme To List</button>
        <img src={meme.img} className="meme-img" />
        <h1 className="top-text">{meme.leftInput}</h1>
        <h1 className="bottom-text">{meme.rightInput}</h1>
      </form>
      
   
    </div>
    <ul className="ul-list">
      {reverseList}
        </ul>
    </div>
 
  );
}

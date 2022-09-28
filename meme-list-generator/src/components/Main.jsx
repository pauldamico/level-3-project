import React, { useState, useEffect } from "react";
import memeimg from "../images/memeimg.png";
import axios from "axios";
import { nanoid } from "nanoid";

export default function Main() {
  const [meme, setMeme] = useState({
    id: nanoid(),
    leftInput: "",
    rightInput: "",
    img: "",
    edit:false
  });
  const [listMeme, setListMeme] = useState([]);
  const [edit, setEdit] = useState({   
    leftInputList: "",
    rightInputList: ""  
  });

  useEffect(() => {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((res) =>
        setMeme((prev) => ({
          ...prev,
          img: res.data.data.memes[Math.floor(Math.random(randomIndex) * 100)]
            .url,
        }))
      )
      .catch((err) => console.log(err));
  }, []);

  function randomIndex() {
    Math.floor(Math.random() * 100);
  }

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setMeme((prev) => ({ ...prev, [name]: value, id: nanoid() }));
  };

  const removeMeme = (id) => {
    
    setListMeme((prev) => prev.filter((item) => item.id != id && item));
  };

  ////////////////////////////
  const editMeme = (id) => {   

    setListMeme(prev=>prev.map(item=>(item.id === id ? {...item, leftInput:edit.leftInputList, rightInput:edit.rightInputList, edit:!item.edit} :{...item})))
    
    setEdit(prev=>({...prev, leftInputList:"", rightInputList:""}))
    
   
  };
  const editChangeHandler =(e)=>{
    const {name, value} = e.target
    setEdit(prev=>({...prev, [name]:value}))
    
  }



////////////////////////////
  const getNewImage = () => {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((res) =>
        setMeme((prev) => ({
          ...prev,
          img: res.data.data.memes[Math.floor(Math.random(randomIndex) * 100)]
            .url,
        }))
      )
      .catch((err) => console.log(err));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setListMeme((prev) => [...prev, { ...meme }]);
    
    setMeme((prev) => ({
      ...prev,
      leftInput: "",
      rightInput: "",
      id: nanoid(),
    }));
    getNewImage()
  };

  const listMemes = listMeme.map((item) => (
    <div key={item.id} className="div-list">
      <button
        onClick={() => {removeMeme(item.id);
        }}
        className="remove">Remove</button>
      <button
        onClick={() => {editMeme(item.id)}}
        className="edit">
        { item.edit ? "Save" : "Edit"}
      </button>
      <img src={item.img} className="meme-img-list" />
      <h1 className="top-text-list">{item.leftInput}</h1>
     
      <h1 className="bottom-text-list">{item.rightInput}</h1>


     { item.edit && <form  className="edit-div">
      <input
        value={edit.leftInputList}
        type="text"
        onChange={editChangeHandler}
        name="leftInputList"
        className="top-text-list"
      />
     <input   value={edit.rightInputList}
            type="text"
            onChange={editChangeHandler}
            name="rightInputList"
            className="bottom-text-list"/>
            
             </form>}
    </div>
  ));

  const reverseList = listMemes.reverse();

  return (
    <div>
      <div className="main-div">
        <form onSubmit={submitHandler} className="form">
          <button className="new-image" type="button" onClick={getNewImage}>
            Get New Image
          </button>
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
      <ul className="ul-list">{reverseList}</ul>
    </div>
  );
}

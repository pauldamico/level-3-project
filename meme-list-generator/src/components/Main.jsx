import React, { useState, useEffect } from "react";
import MemeList from "./main-child-components/MemeList";
import MemeTop from "./main-child-components/MemeTop";
import axios from "axios";
import { nanoid } from "nanoid";

export default function Main() {
  const [meme, setMeme] = useState({
    id: nanoid(),
    leftInput: "",
    rightInput: "",
    img: "",
    edit: false,
  });
  const [listMeme, setListMeme] = useState([]);




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
  const editGetNewImage = (id) => {
    event.preventDefault()
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((res) =>
     setListMeme(prev=>prev.map(item=>item.id === id ? {...item, img: res.data.data.memes[Math.floor(Math.random(randomIndex) * 100)]
      .url}:{...item}))
      )
      .catch((err) => console.log(err));
 console.log(id)
  };
  const editMeme = (id, left, right) => {    
    setListMeme((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              leftInput: left,
              rightInput: right,                       
              edit: !item.edit,
            }
          : { ...item }
      )
    );


    
    // setEdit((prev) => ({ ...prev, leftInputList: "", rightInputList: "" }));
  };
 

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
    getNewImage();
  };

  const listMemes = listMeme.map((item) => (
    <MemeList
    editGetNewImage={editGetNewImage}
      key={item.id}
      {...item}
      removeMeme={removeMeme}
      editMeme={editMeme}     
 
    />
  ));

  const reverseList = listMemes.reverse();

  return (
    <div>
      <MemeTop
        {...meme}
        onSubmit={submitHandler}
        onClick={getNewImage}
        onChange={changeHandler}
      />
      <ul className="ul-list">{reverseList}</ul>
    </div>
  );
}

import React, {useState} from "react";
import Edit from "./MemeListChild/Edit";
export default function MemeList(props) {

  const [edit, setEdit] = useState({
    leftInputList: "",
    rightInputList: "",
    img: ""
  });

  const editChangeHandler = (e) => {
    const { name, value } = e.target;
    setEdit((prev) => ({ ...prev, [name]: value }));
  };
 
  return (
    <div className="div-list">
      <button
        onClick={() => {
          props.removeMeme(props.id);
        }}
        className="remove"
      >
        Remove
      </button>
      <button
        onClick={() => {
          props.editMeme(props.id, edit.leftInputList, edit.rightInputList);
        }}
        className="edit"
      >
        {props.edit ? "Save" : "Edit"}
      </button>
      <img src={props.img} className="meme-img-list" />
      <h1 className="top-text-list">{props.leftInput}</h1>
      <h1 className="bottom-text-list">{props.rightInput}</h1>

      {props.edit && (
        <Edit
        editChangeHandler={editChangeHandler}
        editMeme={props.editMeme}
        id={props.id}
        editGetNewImage={props.editGetNewImage}
          leftInputList={props.leftInputList}
          onChange={props.onChange}
          rightInput={props.rightInputList}
        />
      )}
    </div>
  );
}

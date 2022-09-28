

export default function Edit (props){

    
    return(
    <form  className="edit-div">
      <button onClick={()=>{props.editGetNewImage(props.id)}} className="edit-change-image">Change Image</button>
      <input
        value={props.leftInputList}
        type="text"
        onChange={props.editChangeHandler}
        name="leftInputList"
        className="top-text-list-input"
      />
     <input   value={props.rightInputList}
            type="text"
            onChange={props.editChangeHandler}
            name="rightInputList"
            className="bottom-text-list-input"/>
            
             </form>)
}
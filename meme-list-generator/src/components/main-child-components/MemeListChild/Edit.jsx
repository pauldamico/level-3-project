export default function Edit (props){

    
    return(
    <form  className="edit-div">
      <button onClick={()=>{props.editGetNewImage(props.id)}} className="edit-change-image">Change Image</button>
      <input
        value={props.leftInputList}
        type="text"
        onChange={props.onChange}
        name="leftInputList"
        className="top-text-list-input"
      />
     <input   value={props.rightInputList}
            type="text"
            onChange={props.onChange}
            name="rightInputList"
            className="bottom-text-list-input"/>
            
             </form>)
}
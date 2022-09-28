export default function MemeTop (props){
    return(
<div className="main-div">
        <form onSubmit={props.onSubmit} className="form">
          <button className="new-image" type="button" onClick={props.onClick}>
            Get New Image
          </button>
          <input
            value={props.leftInput}
            type="text"
            onChange={props.onChange}
            name="leftInput"
            className="left-input"
          />
          <input
            value={props.rightInput}
            type="text"
            onChange={props.onChange}
            name="rightInput"
            className="right-input"
          />
          <button className="get-meme-button">Save Meme To List</button>
          <img src={props.img} className="meme-img" />
          <h1 className="top-text">{props.leftInput}</h1>
          <h1 className="bottom-text">{props.rightInput}</h1>
        </form>
      </div>


    )
}
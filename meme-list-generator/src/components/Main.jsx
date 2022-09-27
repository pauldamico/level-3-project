import memeimg from "../images/memeimg.png"

export default function Main() {
  return (
    <div className="main-div">
      <form className="form">
        <input className="left-input" />
        <input className="right-input" />
        <button className="get-meme-button">Get a new meme image</button>   
        <img src={memeimg} className="meme-img" />
        <h1 className="top-text">Shut Up</h1>
        <h1 className="bottom-text">And take my money</h1>
        </form>
    </div>
  );
}

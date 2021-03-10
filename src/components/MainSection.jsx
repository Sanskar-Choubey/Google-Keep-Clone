import React, { useState } from "react";
import { v4 } from "uuid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

function MainSection() {
  const [color, setColor] = useState("");
  const data = [
    {
      id: v4(),
      title: "Getting Started",
      content:
        "Capture ideas to notes,tasks off your to-do list and much more.With this you can Create/Delete/Pin the notes and lists",
      label: "Others",
      pin: false,
      color: color
    },
    {
      id: v4(),
      title: "Neogcamp",
      content: "Full Stack web Developement Bootcamp",
      label: "Coding",
      pin: false,
      color: color
    }
  ];

  const [notes, setNotes] = useState(data);
  const [pin, setPin] = useState(false);

  function formClickHandler(event) {
    event.preventDefault();
    console.log(event);
    let titles = event.target[0].value;
    let contents = event.target[1].value;
    let colors = event.target[2].value;
    let option = event.target[3].value;

    if (titles !== "" && contents !== "") {
      setNotes([
        ...notes,
        {
          id: v4(),
          title: titles,
          content: contents,
          label: option,
          pin: pin,
          color: colors
        }
      ]);
      event.target[0].value = "";
      event.target[1].value = "";
      event.target[2].value = "";
    }
  }

  function deleteNotesHandler(taskID) {
    setNotes(
      notes.filter((note) => {
        return note.id !== taskID;
      })
    );
  }

  function pinChangeHandler() {
    setPin(!pin);
  }

  function colorChange(event) {
    setColor(event.target.value);
  }
  return (
    <div>
      <form onSubmit={formClickHandler}>
        <input autoComplete="off" type="text" placeholder="Title"></input>
        <textarea row="3" placeholder="Take a note..."></textarea>
        <input
          className="colorPicker"
          type="color"
          value={color}
          onChange={colorChange}
        ></input>
        <select>
          <option value="coding">Coding</option>
          <option value="Productivity">Productivity</option>
          <option value="Others">Others</option>
        </select>
        <button>Click</button>
        <button type="button" onClick={pinChangeHandler}>
          {pin === true ? "Pinned" : "Pin"}
        </button>
      </form>

      <div className="renderingElement">
        <h3>Pinned Notes</h3>
        <div className="bindingPin">
          {notes
            .filter((item) => item.pin === true)
            .map(({ id, title, content, label, color }) => {
              return (
                <div className="notesCard" style={{ backgroundColor: color }}>
                  <h1>{title}</h1>
                  <hr />
                  <span className="label">{label}</span>
                  <p>{content}</p>
                  <IconButton onClick={() => deleteNotesHandler(id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              );
            })}
        </div>

        <h3>Un-Pinned Notes</h3>
        <div className="binding">
          {notes
            .filter((item) => item.pin === false)
            .map(({ id, title, content, label, color }) => {
              return (
                <div className="notesCard" style={{ backgroundColor: color }}>
                  <h1>{title}</h1>
                  <hr />
                  <span className="label">{label}</span>
                  <p>{content}</p>
                  <IconButton onClick={() => deleteNotesHandler(id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default MainSection;

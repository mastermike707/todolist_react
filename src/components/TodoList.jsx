import { Add } from "@mui/icons-material";
import { Divider, IconButton, List } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import TodoItem from "./TodoItem";

//Todo Item
//id, name, startDate, isChecked

//Swap two values in array
function swap(array, source, target) {
  if (
    source > -1 &&
    target > -1 &&
    source < array.length &&
    target < array.length &&
    source !== target
  ) {
    //Make a copy
    let newItems = [...array];
    newItems[source] = array[target];
    newItems[target] = array[source];
    console.debug(newItems);
    return newItems;
  }
  return array;
}

function TodoList(props) {
  const [items, setItems] = useState([]);
  const [addName, setAddName] = useState("");

  const handleChange = (e) => {
    setAddName(e.target.value.trim());
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.debug("started dragging", e.target)
    e.dataTransfer.setData("text", e.target);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.debug("moving over ", e.target)
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.debug("dropping onto ", e.target.key)
    const sourceIndex = parseInt(e.dataTransfer.getData("text"));
    setItems((prevItems) => {
      return swap(prevItems, sourceIndex, e.target);
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newItem = {
      id: uuid(),
      name: addName,
      startDate: null,
      isChecked: false,
    };
    setItems((prevItems)=>{return [...prevItems, newItem]});
    console.debug("Adding", newItem);
  };
  return (
    <Box sx={{ width: "100%", maxWidth: 540, bgcolor: "background.paper" }}>
      <List>
      <TodoItem id="hello-id" name="test test123" />
        {items.map((todoitem, index) => {
          console.debug(todoitem);
          const canMoveUp = index > 0;
          const canMoveDown = index < items.length - 1;
          /*<div key={index} 
            draggable
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}>{todoitem.name}
          */
          return (
            <TodoItem
              id={todoitem.id}
              name={todoitem.name}
              startDate={todoitem.startDate}
              isChecked={todoitem.isChecked}
              key={index}
              
              onMoveDownCallback={setItems((prevItems) => {
                      return swap(prevItems, index, index + 1);
                    })
              }
              onMoveUpCallback={setItems((prevItems) => {
                      return swap(prevItems, index, index - 1);
                    })
              }
              onDeleteCallback={setItems((prevItems) => {
                return prevItems.filter((element) => {
                  return element.id !== todoitem.id;
                });
              })}
            />
          );
        })}
      </List>
      <Divider />
      <form onSubmit={handleAdd}>
        <TextField
          id="add-item"
          variant="outlined"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Add />
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Box>
  );
}

export default TodoList;

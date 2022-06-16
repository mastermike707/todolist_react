import {
  DateRange,
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";

function TodoItem(props) {
  const [id, setId] = useState(props.id);
  const [name, setName] = useState(props.name);
  const [startDate, setStartDate] = useState(props.startDate);
  const [isChecked, setIsChecked] = useState(props.isChecked);
  const [showNameField, setShowNameField] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const onMoveUpCallback = props.onMoveUpCallback;
  const onMoveDownCallback = props.onMoveDownCallback;
  const onDeleteCallback = props.onDeleteCallback;
  const handleEdit = () => {
    setShowNameField(false);
  };

  return (
    <ListItem key={id} disablePadding>
      <ListItemButton
        onClick={() => {
          setIsChecked(!isChecked);
        }}
        disableRipple
      >
        {showNameField ? (
          <FormControl onSubmit={handleEdit}>
            <TextField
              id="edit-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </FormControl>
        ) : (
          <>
            <Checkbox
              edge="start"
              checked={isChecked}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText
              onDoubleClick={() => {
                setShowNameField(!showNameField);
              }}
            >
              {name}
            </ListItemText>
          </>
        )}
      </ListItemButton>
      {onMoveUpCallback && (
        <IconButton aria-label="up" onClick={onMoveUpCallback}>
          <KeyboardArrowUp />
        </IconButton>
      )}
      {onMoveDownCallback && (
        <IconButton aria-label="down" onClick={onMoveDownCallback}>
          <KeyboardArrowDown />
        </IconButton>
      )}
      {showCalendar ? (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <DateTimePicker
              label="Start Date"
              inputFormat="MM/dd/yyyy"
              value={startDate}
              onChange={(newDateTime) => {
                setStartDate(newDateTime);
                setShowCalendar(false)
              }}
              minDate={new Date()}
              minTime={new Date(0, 0, 0, 0, 1)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
      ) : (
        <IconButton aria-label="date" onClick={() => setShowCalendar(true)}>
          <DateRange />
        </IconButton>
      )}

      <IconButton onClick={onDeleteCallback}>
        <Delete />
      </IconButton>

    </ListItem>
  );
}

export default TodoItem;

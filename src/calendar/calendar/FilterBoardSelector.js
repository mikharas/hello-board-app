import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

const FilterBoardSelector = ({boardIds, idToTitle, showBoard, setShowBoard}) => {
  const [text, setText] = useState('Show all')
  return (
    <FormControl variant="outlined">
      <InputLabel>Select Boards</InputLabel>
      <Select
        native
        value={text}
        onChange={e => {
          setText(e.target.value)
          setShowBoard(e.target.value)
        }}
        label="Select board"
        inputProps={{
          name: 'age',
          id: 'filled-age-native-simple',
        }}
      >
        <option value={boardIds}>Show all</option>
        {boardIds.map(boardId => (
          <option key={boardId} value={boardId}>{idToTitle[boardId]}</option>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterBoardSelector;

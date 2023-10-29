import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { ClickAwayListener, Button, Typography } from "@mui/material";
import TextareaAutosize from "react-autosize-textarea";
import showdown from "showdown";
import showdownHighlight from "showdown-highlight";
import "highlight.js/styles/github.css";
import MarkdownContainer from "./MarkdownContainer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

const defaultTitleStyle = {
  outline: "none",
  background: "white",
  marginTop: "13px",
  marginBottom: "15px",
  fontFamily: "inherit",
  fontWeight: "bold",
  fontSize: "30px",
  padding: "15px",
  width: "90%",
  borderRadius: "15px",
  border: "0",
};

const converter = new showdown.Converter({
  extensions: [showdownHighlight],
  ghCodeBlocks: true,
});
converter.setFlavor("github");

const EditableTitle = ({
  customizedTitle,
  title,
  changeTitle,
  style,
  normalStyle,
  allowEmpty,
  allowEnter,
  rows,
  showButtons,
  showMarkdown,
  variant,
}) => {
  const [value, setValue] = useState(title);
  const [isEditmode, setIsEditMode] = useState(false);

  let textArea = useRef();
  const toggleEditMode = useCallback(() => {
    setIsEditMode(!isEditmode);
  }, [isEditmode]);

  const changeValue = (newValue) => setValue(newValue);

  const handleChange = () => {
    if (!value && !allowEmpty) {
      changeValue(title);
      toggleEditMode();
    } else {
      changeTitle(value);
      toggleEditMode();
    }
  };

  useEffect(() => setValue(title), [title]);
  if (!isEditmode && showMarkdown) {
    return (
      <MarkdownContainer
        onClick={() => toggleEditMode()}
        dangerouslySetInnerHTML={{ __html: converter.makeHtml(value) }}
      />
    );
  }
  if (!isEditmode) {
    return (
      <Typography
        variant={variant || "body1"}
        onClick={(e) => {
          e.stopPropagation();
          toggleEditMode();
        }}
        style={style && normalStyle}
      >
        {customizedTitle || title}
      </Typography>
    );
  }

  return (
    <ClickAwayListener onClickAway={handleChange}>
      <Wrapper>
        <TextareaAutosize
          style={style ? { ...style, resize: "none" } : defaultTitleStyle}
          ref={(tag) => {
            textArea = tag;
          }}
          autoFocus
          onFocus={(e) => {
            e.target.select();
          }}
          value={value}
          rows={rows || 3}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onInput={(event) => changeValue(event.target.value)}
          onKeyDown={(event) => {
            if (allowEnter && event.key === "Enter") {
              handleChange();
            }
            if (event.keyCode === 9) {
              // tab was pressed
              event.preventDefault();
              const start = event.target.selectionStart;
              const end = event.target.selectionEnd;
              const newValue = `${value.substring(0, start)}  ${value.substring(
                end
              )}`;
              setValue(newValue);

              setTimeout(() => {
                textArea.selectionStart = start + 2;
                textArea.selectionEnd = start + 2;
              });
            }
          }}
          type="text"
        />
        {showButtons && (
          <div>
            <Button onClick={handleChange}>Save</Button>
            <Button
              onClick={() => {
                setValue("");
                changeTitle("");
                toggleEditMode();
              }}
            >
              Delete
            </Button>
          </div>
        )}
      </Wrapper>
    </ClickAwayListener>
  );
};

export default React.memo(EditableTitle);

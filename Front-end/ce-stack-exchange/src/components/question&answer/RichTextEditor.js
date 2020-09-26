import React, { Component } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const emojis = [
  '😃', '😁', '😂', '😉', '😎', '😍', '😚', '🤔', '😌', '🤓','😛', '😜', '😠', '😇', '😈','😅','😊', '🙂',
  '🙃', '🤪', '🤨', '🧐', '🤩', '🥳', '😏', '😒', '😞', '😔','😕', '☹️',  '😖',  '😩', '🥺', '😢', '😭',
  '😤','🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓','🤭',  '😶', '😐', '😑', '😬', '🙄', '😲', '🥱',
  '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢' ,  '🤒', '🤕', '🙈','🙉', '👏', '🙌', '🙏','👋', '🖐', '✋', '👌',
  '✌️',  '👈', '👉', '👆', '👇', '👍', '👎', '✊', '👊', '🤲', '🤝','💪','🚑', '⏰', '⭐', '🎁',
  '❤️','✅', '❎', '💯',
]

const sampleUsers = [
  { text: "علی", value: "علی", url: "علی" },
  { text: "سارا", value: "سارا", url: "سارا" },
  { text: "نوید", value: "نوید", url: "نوید" },
  { text: "فاطمه", value: "فاطمه", url: "فاطمه" },
];

class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    const content = window.localStorage.getItem("content");

    if (content) {
      this.state.editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(content))
      );
    } else {
      this.state.editorState = EditorState.createEmpty();
    }
  }

  saveContent = (content) => {
    window.localStorage.setItem(
      "content",
      JSON.stringify(convertToRaw(content))
    );
  };

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState);
    this.setState({
      editorState,
    });
  };

  render() {
    return (
      <div>
        <Editor
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          editorState={this.state.editorState}
          onEditorStateChange={this.onChange}
          toolbar={{
            emoji: {
              emojis: emojis,
            },
            options : ['inline', 'blockType', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'history'],
            blockType : {
              inDropdown : false,
              options : ['Blockquote'],
            },
            list: {
              options: ['unordered', 'ordered'],
            },
            textAlign: {
              options: ['left', 'right'],
            },
          }}
          mention={{
            separator: " ",
            trigger: "@",
            suggestions: sampleUsers,
          }}
        />
      </div>
    );
  }
}

export default RichTextEditor;

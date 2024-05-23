import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import { setUserContent, saveUser } from "../../Redux/Slices/UserSlice.js";

const TextEditor = () => {
  const dispatch = useDispatch();
  const userContent = useSelector((state) => state.UserData.user);

  const [content, setContent] = useState("");

  useEffect(() => {
    if (userContent?.content) {
      setContent(userContent.content);
    }
  }, [userContent]);

  const handleChange = (value) => {
    setContent(value);
    dispatch(setUserContent({ content: value, unsavedChanges: true }));
  };

  const handleSave = () => {
    dispatch(saveUser({ ...userContent, content }));
  };

  return (
    <div>
      <ReactQuill value={content || ""} onChange={handleChange} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default TextEditor;

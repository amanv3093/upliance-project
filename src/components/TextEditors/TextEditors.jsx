import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import { setUserContent, saveUser } from "../../Redux/Slices/UserSlice.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./TextEditors.css";

const TextEditor = () => {
  const dispatch = useDispatch();
  const userContent = useSelector((state) => state.UserData.user); // Correctly accessing UserData
  const [content, setContent] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (userContent?.content) {
      console.log("User Content:", userContent); // Debugging: Check the content
      setContent(userContent.content);
    }
  }, [userContent]);

  const handleChange = (value) => {
    setContent(value);
    dispatch(setUserContent({ content: value }));
  };

  const handleSave = () => {
    toastFun("Save successfully.");
    dispatch(saveUser({ ...userContent, content }));
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  function toastFun(message) {
    toast(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <div className="quill-box22">
      <ToastContainer />
      {userContent.name && (
        <p>
          <strong>Name:</strong> {userContent.name}
        </p>
      )}
      {userContent.id && (
        <p>
          <strong>ID:</strong> {userContent.id}
        </p>
      )}
      <ReactQuill value={content} onChange={handleChange} />
      <button className="quill-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default TextEditor;

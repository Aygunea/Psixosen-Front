import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../../slices/messages.slice";
import Clip from "../../icons/Clip";
import Mic from "../../icons/Mic";

const SendMessage = () => {
  const selectedConversation = useSelector((state) => state.conversation.selectedConversation);
  const messageRef = useRef();
  const fileInputRef = useRef();
  const dispatch = useDispatch();

  const sendMessage = async () => {
    try {
      const message = messageRef.current.value.trim();
      if (!message) {
        return console.log(`No message to send`);
      }
      const response = await fetch(`http://localhost:3000/api/messages/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(`Failed to send message: ${data.error}`);
      } else {
        dispatch(addMessage(data.lastMessage.message));
        console.log(data.lastMessage.message + "data");
        messageRef.current.value = "";
      }
    } catch (error) {
      console.log(`Fetching error: ${error}`);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`http://localhost:3000/api/messages/${selectedConversation._id}/file`, {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(`Failed to send file: ${data.error}`);
      } else {
        dispatch(addMessage(data));
        console.log(data.message + "data");
      }
    } catch (error) {
      console.log(`Fetching error: ${error}`);
    }
  };

  const handleClipClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="h-12 flex gap-6 w-full mt-6">
      <div className="flex-1 text-base font-medium bg-lightgray dark:bg-dark100 text-light50 dark:text-dark20
       placeholder:dark:text-dark20 placeholder:text-light50 rounded-[5px] relative overflow-hidden">
        <input
          ref={messageRef}
          type="text"
          className="absolute w-full h-full top-0 left-0 pl-12 text-xs focus:outline-none"
          placeholder="Mesaj yaz..."
        />
        <button
          onClick={handleClipClick}
          className="absolute top-1/2 -translate-y-1/2 right-14">
          <Clip color="black" className="h-4 w-4" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <button className="absolute top-1/2 -translate-y-1/2 left-4">
          <img
            className="w-5 h-5"
            src={require('../../icons/emoji.png')} alt="" />
        </button>
        <button className="absolute top-1/2 -translate-y-1/2 right-4">
          <Mic className="h-5 w-5" color="black" />
        </button>
      </div>
      <button
        onClick={sendMessage}
        className="bg-lightblue dark:bg-blue100 h-12 w-16 flex items-center justify-center rounded-[8px]">
        <img
          className="w-5 h-5"
          src={require('../../icons/send.png')} alt="" />
      </button>
    </div>
  );
};

export default SendMessage;

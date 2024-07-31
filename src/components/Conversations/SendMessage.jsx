import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../../slices/messages.slice";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { BsEmojiSmile } from "react-icons/bs";

const SendMessage = () => {
  const selectedConversation = useSelector((state) => state.conversation.selectedConversation);
  const messageRef = useRef();
  const dispatch = useDispatch();
  const [emosjiShow, setEmojiShow] = useState(false)
  const emojiPickerRef = useRef(null);

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
        dispatch(addMessage(data.lastMessage));
        messageRef.current.value = "";
      }
    } catch (error) {
      console.log(`Fetching error: ${error}`);
    }
  };

  const handleEmojiSelect = (emoji) => {
    messageRef.current.value += emoji.native + ' '
  };
  const handleClickOutside = (event) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
      setEmojiShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-12 flex gap-6 w-full mt-6">
      {emosjiShow && (
        <div className="absolute  left-6 bottom-20  z-[10]" ref={emojiPickerRef}>
          <Picker
            data={data}
            emojiSize={28}
            onEmojiSelect={handleEmojiSelect}
            previewPosition="none"
            theme="light"
          />
        </div>
      )}
      <div className="flex-1 text-base font-medium bg-lightgray dark:bg-dark100 text-light50 dark:text-dark20
       placeholder:dark:text-dark20 placeholder:text-light50 rounded-[5px] relative overflow-hidden">
        <input
          ref={messageRef}
          type="text"
          className="absolute w-full h-full top-0 left-0 pl-12 text-base focus:outline-none"
          placeholder="Mesaj yaz..."
        />
        <button
          onClick={() => setEmojiShow(!emosjiShow)}
          className="absolute top-1/2 -translate-y-1/2 left-4">
          <BsEmojiSmile className="text-lg" />
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

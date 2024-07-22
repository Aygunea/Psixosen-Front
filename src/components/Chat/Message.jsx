import React from "react";

const Message = ({ type, children }) => {
  const messageStyle = type === "sent" ? "text-left text-dark100" : "text-right dark:text-dark100 text-gray10";
  const contentStyle = type === "sent"
    ? "bg-lightblue dark:bg-blue100 rounded-bl-none"
    : "bg-lightgray dark:bg-dark300 rounded-br-none";


  return (
    <div className={messageStyle}>
      <div
        className={`relative pt-2 pb-[2px] mt-2 px-[10px] mb-[6px] text-sm inline-block w-auto rounded-[5px] ${contentStyle}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Message;

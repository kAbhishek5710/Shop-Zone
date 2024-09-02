import React from "react";

export default function DropdownItem({ img, text }) {
  return (
    <div className="flex items-center p-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer">
      <img src={img} alt={text} className="w-5 h-5 mr-3" />
      <a href="#" className="text-gray-800 text-sm tracking-wider">
        {text}
      </a>
    </div>
  );
}

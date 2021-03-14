/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import shave from 'shave';

import '../../component-stylesheets/Message.css';

export default function ConversationListItem({
  title, setRoomName, roomName,
}) {
  useEffect(() => {
    shave('.conversation-snippet', 30);
  });
  const handleConvoChange = () => {
    setRoomName(title);
  };
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="conversation-list-item"
      onClick={() => { handleConvoChange(); }}
    >
      {console.log(roomName)}
      <img className="conversation-photo" src="../logo.png" alt="" />
      <div className="conversation-info">
        <h1 className="conversation-title">{title}</h1>
        <p className="conversation-snippet">This is a long message. I think you will want to read this message as soon as possible. This is just a test for react, which is cool. i know i know.</p>
      </div>
    </div>
  );
}

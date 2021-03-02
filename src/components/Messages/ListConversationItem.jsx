import React, { useEffect } from 'react';
import shave from 'shave';

import './Message.css';

export default function ConversationListItem({ title }) {
  useEffect(() => {
    shave('.conversation-snippet', 30);
  });
  // const { photo, name, text } = data;
  return (
    <div className="conversation-list-item">
      <img className="conversation-photo" src="../photo.jpg" alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{title}</h1>
        <p className="conversation-snippet">This is a long message. I think you will want to read this message as soon as possible. This is just a test for react, which is cool. i know i know.</p>
      </div>
    </div>
  );
}

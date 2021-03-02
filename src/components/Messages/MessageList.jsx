import React, { useEffect, useState } from 'react';
import moment from 'moment';
// import Compose from '../Compose';
// import Toolbar from '../Toolbar';
// import ToolbarButton from '../ToolbarButton';
import MessageChat from './MessageChat.jsx';

import './Message.css';

const MY_USER_ID = 'apple';

export default function MessageList(props) {
  const [messages, setMessages] = useState([]);

  const getMessages = () => {
    const tempMessages = [
      {
        id: 1,
        author: 'apple',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        timestamp: new Date().getTime(),
      },
      {
        id: 2,
        author: 'orange',
        message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        timestamp: new Date().getTime(),
      },
      {
        id: 3,
        author: 'orange',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        timestamp: new Date().getTime(),
      },
      {
        id: 4,
        author: 'apple',
        message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        timestamp: new Date().getTime(),
      },
      {
        id: 5,
        author: 'apple',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        timestamp: new Date().getTime(),
      },
      {
        id: 6,
        author: 'apple',
        message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        timestamp: new Date().getTime(),
      },
      {
        id: 7,
        author: 'orange',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        timestamp: new Date().getTime(),
      },
      {
        id: 8,
        author: 'orange',
        message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        timestamp: new Date().getTime(),
      },
      {
        id: 9,
        author: 'apple',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        timestamp: new Date().getTime(),
      },
      {
        id: 10,
        author: 'orange',
        message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        timestamp: new Date().getTime(),
      },
    ];
    setMessages([...messages, ...tempMessages]);
  };
  useEffect(() => {
    getMessages();
  }, []);

  const renderMessages = () => {
    let i = 0;
    const messageCount = messages.length;
    const tempMessages = [];

    while (i < messageCount) {
      const previous = messages[i - 1];
      const current = messages[i];
      const next = messages[i + 1];
      const isMine = current.author === MY_USER_ID;
      const currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        const previousMoment = moment(previous.timestamp);
        const previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        const nextMoment = moment(next.timestamp);
        const nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <MessageChat
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />,
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  };

  return (
    <div className="message-list">
      {/* <Toolbar
        title="Conversation Title"
        rightItems={[
          <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
          <ToolbarButton key="video" icon="ion-ios-videocam" />,
          <ToolbarButton key="phone" icon="ion-ios-call" />,
        ]} */}
      {/* /> */}

      <div className="message-list-container">{renderMessages()}</div>
      <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
        />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import ConversationSearch from '../ConversationSearch';
import ConversationListItem from './ListConversationItem.jsx';
// import Toolbar from '../Toolbar';
// import ToolbarButton from '../ToolbarButton';

import './Message.css';

axios.defaults.withCredentials = false;

export default function ConversationList() {
  const [conversations, setConversations] = useState({ list: [] });

  // const getConversations = () => {
  //   axios.get('https://randomuser.me/api/?results=20').then((response) => {
  //     console.log('axios ran');
  //     const newConversations = response.data.results.map((result) => ({
  //       // photo: result.picture.large,
  //       name: `${result.name.first} ${result.name.last}`,
  //       text: 'Hello world! This is a long message that needs to be truncated.',
  //     }));
  //     setConversations({ ...conversations, list: newConversations });
  //     // console.log(newConversations);
  //     console.log(conversations.list);
  //     console.log('axios ran');
  //   });
  // };
  // useEffect(() => {
  //   getConversations();
  // }, []);

  return (
    <div className="conversation-list">
      {/* <Toolbar
        title="Messenger"
        leftItems={[
          <ToolbarButton key="cog" icon="ion-ios-cog" />,
        ]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />,
        ]}
      /> */}
      {/* <ConversationSearch /> */}
      {/* {
          conversations.list.map((conversation) => (
            <ConversationListItem
              key={conversation.name}
              name={conversation.name}
              text={conversation.text}
              // photo={conversation.photo}
            />
          ))
        } */}
      <ConversationListItem />
      <ConversationListItem />
      <ConversationListItem />
      <ConversationListItem />
      <ConversationListItem />
      <ConversationListItem />
      <ConversationListItem />
      <ConversationListItem />
      <ConversationListItem />
      <ConversationListItem />
      <ConversationListItem />
      <ConversationListItem />
      <ConversationListItem />
      <ConversationListItem />
      <ConversationListItem />
      <ConversationListItem />
      <ConversationListItem />
      <ConversationListItem />
      <ConversationListItem />
      <ConversationListItem />
    </div>
  );
}

import React from 'react';
import moment from 'moment';
import './Message.css';

export default function MessageChat(props) {
  const {
    data,
    isMine,
    startsSequence,
    endsSequence,
    showTimestamp,
  } = props;

  const friendlyTimestamp = moment(data.timestamp).format('LLLL');

  // const fetchMessageBodyData = async () => {
  //   setEmail(localStorage.getItem('email'));
  //   firebase.database().ref('chats/').on('value', (resp) => {
  //     const a = snapshotToArray(resp);
  //     console.log(a);
  //   });
  // };
  // fetchMessageBodyData();
  return (
    <div className={[
      'message',
      `${isMine ? 'mine' : ''}`,
      `${startsSequence ? 'start' : ''}`,
      `${endsSequence ? 'end' : ''}`,
    ].join(' ')}
    >
      {
          showTimestamp
            && (
            <div className="timestamp">
              { friendlyTimestamp }
            </div>
            )
        }

      <div className="bubble-container">
        <div className="bubble" title={friendlyTimestamp}>
          { data.message }
        </div>
      </div>
    </div>
  );
}

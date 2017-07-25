import React from 'react';

const Message = ({message}) => {
  return (
    <div>
      <div>{message.message} --{message.created_at}</div>
      <hr />
    </div>
  );
};

export default Message;


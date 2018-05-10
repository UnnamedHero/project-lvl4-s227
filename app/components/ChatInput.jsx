import React from 'react';

export default class ChatInput extends React.Component {
  render() {
    return (
    <form>
    <div className='form-group'>
      <input type='text' className='form-control' />
    </div>
  </form>);
  }
};
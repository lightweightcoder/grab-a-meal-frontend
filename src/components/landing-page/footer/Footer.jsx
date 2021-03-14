import React from 'react';
import './footer.css';

export default function Footer() {
  return (
    <footer>
      <img src="/logo.png" alt="" />
      created by:
      {' '}
      <a href="https://github.com/lightweightcoder">Alvin</a>
      {' '}
      and
      {' '}
      <a href="https://github.com/kenrickles">Kenrick</a>
    </footer>
  );
}

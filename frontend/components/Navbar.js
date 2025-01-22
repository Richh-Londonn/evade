
import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '10px', background: '#333', color: '#fff' }}>
      <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around' }}>
        <li><Link href="/"><a style={{ color: '#fff' }}>Home</a></Link></li>
        <li><Link href="/about"><a style={{ color: '#fff' }}>About</a></Link></li>
        <li><Link href="/contact"><a style={{ color: '#fff' }}>Contact</a></Link></li>
      </ul>
    </nav>
  );
}

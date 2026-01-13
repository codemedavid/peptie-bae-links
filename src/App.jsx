import React from 'react';
import LinkButton from './components/LinkButton';
import Footer from './components/Footer';
import './App.css';

function App() {
  const links = [
    { text: 'Place Your Order', href: 'https://tiny.cc/paureorder', icon: '🛒' },
    { text: 'Tirzepatide Overview (Full Product & Education Guide)', href: 'https://www.canva.com/design/DAG-M5mcJYU/LlFfBr5OHdBKYF1_mzoMoA/view?utm_content=DAG-M5mcJYU&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h71df313386', icon: '📘' },
    { text: 'Welcome Guide (Start Here)', href: 'https://tiny.cc/paureguide', icon: '📖' },
    { text: 'Contact PAURE', href: 'https://tiny.cc/paurecontactus', icon: '💬' },
    { text: 'Facebook — PAURE Wellness', href: 'https://www.facebook.com/paurewellness', icon: '📘' },
  ];

  return (
    <div className="app-container">
      {/* Background Decor */}
      <div className="bg-decor bg-orb-1"></div>
      <div className="bg-decor bg-orb-2"></div>
      <div className="bg-decor bg-orb-3"></div>

      {/* Background Butterfly */}
      <img src="/butterfly.png" alt="" className="bg-butterfly" />

      {/* Header Section */}
      <header className="header animate-fade-in">
        <div className="logo-container">
          <img
            src="/logo.png"
            alt="PAURE Logo"
            className="logo-img"
          />
          <div className="logo-glow"></div>
        </div>

        <h1 className="brand-name">
          PAURE
        </h1>
        <p className="brand-tagline">
          peptides, redefined
        </p>
      </header>

      {/* Links Section */}
      <main className="links-container">
        {links.map((link, index) => (
          <LinkButton
            key={index}
            text={link.text}
            href={link.href}
            icon={null}
            delay={0.1 + (index * 0.05)}
          />
        ))}
      </main>

      <Footer />
    </div>
  );
}

export default App;

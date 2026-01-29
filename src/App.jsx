import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase';
import LinkButton from './components/LinkButton';
import Footer from './components/Footer';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

// Public Home Component
const Home = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const { data } = await supabase
        .from('links')
        .select('*')
        .order('order', { ascending: true });

      if (data && data.length > 0) {
        setLinks(data);
      } else {
        // Fallback to initial links if DB is empty to ensure site works
        console.log('No links in DB, using fallback.');
        setLinks([
          { text: 'Pricelist', href: 'https://www.canva.com/design/DAG9DQP5qtk/cb3QfT4fuJ4vlI6bjZ7c_A/edit', icon: '📋' },
          { text: 'WhatsApp', href: 'https://wa.me/638980078807', icon: '💬' },
          { text: 'Mobile', href: 'tel:09993904025', icon: '📞' },
          { text: 'Messenger', href: 'https://m.me/889273047596403', icon: '📨' },
          { text: 'TikTok', href: 'https://tiktok.com/@saepeptiebae', icon: '🎵' },
          { text: 'Facebook', href: 'https://www.facebook.com/share/1AXAx5HUcJ/', icon: '📘' },
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

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
          Peptie Bae
        </h1>
        <p className="brand-tagline">
          glow. heal. repeat. ✨
        </p>
      </header>

      {/* Links Section */}
      <main className="links-container">
        {loading ? (
          <div className="text-[var(--color-text-light)] opacity-70 italic mt-4">loading...</div>
        ) : links.length > 0 ? (
          links.map((link, index) => (
            <LinkButton
              key={link.id || index}
              text={link.text}
              href={link.href}
              icon={link.icon}
              delay={0.1 + (index * 0.05)}
            />
          ))
        ) : (
          <div className="text-[var(--color-text-light)] opacity-70 italic mt-4">
            No links available.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={
          <div style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <a href="/" style={{ color: 'var(--color-primary)' }}>Go Home</a>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

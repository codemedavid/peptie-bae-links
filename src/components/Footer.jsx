import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer animate-fade-in delay-300">

            <p className="footer-tagline">
                glow. heal. repeat. ✨
            </p>
            <p className="footer-copyright">
                © {new Date().getFullYear()} Peptie Bae
            </p>
        </footer>
    );
};

export default Footer;

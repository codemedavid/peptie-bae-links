import React from 'react';
import './LinkButton.css';

const LinkButton = ({ text, href, icon, delay = 0 }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-button animate-fade-in"
            style={{ animationDelay: `${delay}s` }}
        >
            {icon && <span className="link-button-icon">{icon}</span>}
            <span className="link-button-text">{text}</span>
        </a>
    );
};

export default LinkButton;

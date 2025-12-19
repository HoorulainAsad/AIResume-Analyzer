import React from 'react';
import { Sparkles } from 'lucide-react';
import './Header.css';

function Header({ onGetStartedClick }) {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-logo">
                    <Sparkles className="logo-icon" size={32} />
                    <div className="logo-text">
                        <h1>AI Resume Analyzer</h1>
                        <p className="logo-tagline">Smart Resume Optimization</p>
                    </div>
                </div>

                <nav className="header-nav">
                    <a href="/how-it-works" className="nav-link">Features & How It Works</a>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={onGetStartedClick}
                    >
                        Get Started
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Header;

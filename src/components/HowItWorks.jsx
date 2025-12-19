import React from 'react';
import { Sparkles, FileCheck, Zap, Shield, TrendingUp } from 'lucide-react';
import './HowItWorks.css';

function HowItWorks() {
    return (
        <div className="how-it-works-page">
            <div className="container">
                {/* Hero Section */}
                <section className="hiw-hero">
                    <Sparkles className="hiw-hero-icon" size={64} />
                    <h1 className="hiw-title">How It Works</h1>
                    <p className="hiw-subtitle">
                        Transform your resume with AI-powered analysis in just a few simple steps
                    </p>
                </section>

                {/* Steps Section */}
                <section className="steps-section">
                    <h2 className="section-title">Simple 3-Step Process</h2>
                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <FileCheck className="step-icon" size={40} />
                            <h3>Upload Your Resume</h3>
                            <p>
                                Upload your resume in PDF or DOCX format. Our system accepts files up to 10MB.
                                Rate your current resume to track improvements over time.
                            </p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">2</div>
                            <Zap className="step-icon" size={40} />
                            <h3>AI Analysis</h3>
                            <p>
                                Our advanced AI analyzes your resume, identifying strengths, weaknesses, and areas
                                for improvement. Optionally add a job description for targeted matching.
                            </p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">3</div>
                            <TrendingUp className="step-icon" size={40} />
                            <h3>Get Insights</h3>
                            <p>
                                Receive detailed feedback, keyword matching scores, and personalized suggestions
                                to optimize your resume for your target role.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <h2 className="section-title">Powerful Features</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <Sparkles className="feature-icon" size={32} />
                            <h3>AI-Powered Analysis</h3>
                            <p>
                                Leverages cutting-edge AI to provide comprehensive resume analysis and actionable feedback
                            </p>
                        </div>

                        <div className="feature-card">
                            <FileCheck className="feature-icon" size={32} />
                            <h3>Keyword Matching</h3>
                            <p>
                                Compares your resume against job descriptions to identify missing keywords and optimize ATS compatibility
                            </p>
                        </div>

                        <div className="feature-card">
                            <Shield className="feature-icon" size={32} />
                            <h3>Privacy First</h3>
                            <p>
                                Your resume data is processed securely and never stored permanently on our servers
                            </p>
                        </div>

                        <div className="feature-card">
                            <TrendingUp className="feature-icon" size={32} />
                            <h3>Instant Results</h3>
                            <p>
                                Get immediate feedback and suggestions without waiting. Improve your resume in real-time
                            </p>
                        </div>

                        <div className="feature-card">
                            <Zap className="feature-icon" size={32} />
                            <h3>Smart Suggestions</h3>
                            <p>
                                Receive personalized recommendations based on industry best practices and your specific goals
                            </p>
                        </div>

                        <div className="feature-card">
                            <Sparkles className="feature-icon" size={32} />
                            <h3>Interactive Chatbot</h3>
                            <p>
                                Ask questions and get detailed explanations about your resume analysis through our AI chatbot
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="hiw-cta">
                    <h2>Ready to Optimize Your Resume?</h2>
                    <p>Start analyzing your resume now and land your dream job</p>
                    <a href="/" className="btn btn-primary btn-lg">
                        Get Started Now
                    </a>
                </section>
            </div>
        </div>
    );
}

export default HowItWorks;

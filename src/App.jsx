import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ResumeUpload from './components/ResumeUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import AnalysisResults from './components/AnalysisResults';
import Chatbot from './components/Chatbot';
import HowItWorks from './components/HowItWorks';
import { parseResume } from './services/resumeParser';
import { analyzeResume } from './services/aiAnalyzer';
import { calculateRelevancyScore } from './services/keywordMatcher';
import { initializeChatbot } from './services/chatbotService';
import { Loader, Sparkles } from 'lucide-react';
import './App.css';

function HomePage() {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [keywordMatch, setKeywordMatch] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const uploadSectionRef = useRef(null);

  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleFileUpload = async (file) => {
    setResumeFile(file);
    setError('');

    try {
      const parsedData = await parseResume(file);
      setResumeData(parsedData);
    } catch (err) {
      setError(err.message);
      setResumeData(null);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeData) {
      setError('Please upload a resume first');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      // Analyze resume
      const analysis = await analyzeResume(resumeData, jobDescription);
      setAnalysisResults(analysis);

      // Calculate keyword match if job description provided
      if (jobDescription.trim()) {
        const match = calculateRelevancyScore(resumeData, jobDescription);
        setKeywordMatch(match);
      } else {
        setKeywordMatch(null);
      }

      // Initialize chatbot with context
      initializeChatbot(resumeData, analysis);

      // Scroll to results
      setTimeout(() => {
        document.querySelector('.analysis-results')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);

    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="app">
      <Header onGetStartedClick={scrollToUpload} />

      <main className="main-content">
        <div className="container">
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-content animate-slide-down">
              <h1 className="hero-title">
                <Sparkles className="hero-icon" />
                AI-Powered Resume Analyzer
              </h1>
              <p className="hero-description">
                Upload your resume and get instant AI-powered feedback, keyword matching,
                and personalized suggestions to land your dream job
              </p>
            </div>
          </section>

          {/* Upload Section */}
          <div ref={uploadSectionRef}>
            <ResumeUpload
              onFileUpload={handleFileUpload}
              isAnalyzing={isAnalyzing}
            />
          </div>

          {/* Job Description Input */}
          {resumeData && (
            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
            />
          )}

          {/* Analyze Button */}
          {resumeData && (
            <div className="analyze-section animate-slide-up">
              <button
                className="btn btn-primary btn-analyze"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader className="spinner-icon" size={20} />
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Analyze Resume
                  </>
                )}
              </button>
              <p className="analyze-hint">
                {jobDescription.trim()
                  ? 'We\'ll analyze your resume and match it against the job description'
                  : 'Get comprehensive resume analysis and improvement suggestions'}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="error-banner animate-slide-down">
              {error}
            </div>
          )}

          {/* Analysis Results */}
          {analysisResults && (
            <AnalysisResults
              results={analysisResults}
              keywordMatch={keywordMatch}
            />
          )}
        </div>
      </main>

      {/* Chatbot */}
      {analysisResults && (
        <Chatbot
          resumeData={resumeData}
          analysisResults={analysisResults}
        />
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2024 AI Resume Analyzer. Built with React & AI.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
    </Router>
  );
}

export default App;

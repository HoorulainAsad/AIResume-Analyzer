import React from 'react';
import {
    TrendingUp,
    Award,
    AlertTriangle,
    Target,
    CheckCircle,
    XCircle
} from 'lucide-react';
import './AnalysisResults.css';

function AnalysisResults({ results, keywordMatch }) {
    if (!results) return null;

    const getScoreColor = (score) => {
        if (score >= 80) return 'score-excellent';
        if (score >= 60) return 'score-good';
        if (score >= 40) return 'score-fair';
        return 'score-poor';
    };

    const getScoreLabel = (score) => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        if (score >= 40) return 'Needs Improvement';
        return 'Poor';
    };

    return (
        <div className="analysis-results animate-slide-up">
            <div className="results-header">
                <h2>Resume Analysis Results</h2>
                <p>Comprehensive analysis of your resume quality and optimization</p>
            </div>

            {/* Overall Score */}
            <div className="score-overview glass-card">
                <div className="score-circle-container">
                    <div className={`score-circle ${getScoreColor(results.overallScore)}`}>
                        <svg className="score-ring" viewBox="0 0 120 120">
                            <circle
                                className="score-ring-bg"
                                cx="60"
                                cy="60"
                                r="54"
                            />
                            <circle
                                className="score-ring-progress"
                                cx="60"
                                cy="60"
                                r="54"
                                style={{
                                    strokeDasharray: `${(results.overallScore / 100) * 339.292} 339.292`
                                }}
                            />
                        </svg>
                        <div className="score-value">
                            <span className="score-number">{results.overallScore}</span>
                            <span className="score-max">/100</span>
                        </div>
                    </div>
                    <div className="score-label">
                        <h3>Overall Score</h3>
                        <p className={getScoreColor(results.overallScore)}>
                            {getScoreLabel(results.overallScore)}
                        </p>
                    </div>
                </div>

                {keywordMatch && (
                    <div className="keyword-match-summary">
                        <Target className="match-icon" size={32} />
                        <div className="match-details">
                            <h4>Keyword Match</h4>
                            <p className="match-percentage">{keywordMatch.matchPercentage}%</p>
                            <p className="match-description">
                                {keywordMatch.matchedKeywords.length} of {keywordMatch.matchedKeywords.length + keywordMatch.missingKeywords.length} keywords matched
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Category Scores */}
            <div className="category-scores">
                <h3 className="section-title">Score Breakdown</h3>
                <div className="category-grid">
                    {Object.entries(results.categoryScores).map(([category, score]) => (
                        <div key={category} className="category-card glass-card">
                            <div className="category-header">
                                <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                                <span className={`category-score ${getScoreColor(score)}`}>
                                    {score}%
                                </span>
                            </div>
                            <div className="category-bar">
                                <div
                                    className={`category-bar-fill ${getScoreColor(score)}`}
                                    style={{ width: `${score}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Strengths and Improvements */}
            <div className="feedback-section">
                <div className="feedback-column">
                    <div className="feedback-card glass-card strengths-card">
                        <div className="feedback-header">
                            <CheckCircle className="feedback-icon success" size={24} />
                            <h3>Strengths</h3>
                        </div>
                        <ul className="feedback-list">
                            {results.strengths.map((strength, index) => (
                                <li key={index} className="feedback-item">
                                    <Award size={16} className="item-icon success" />
                                    <span>{strength}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="feedback-column">
                    <div className="feedback-card glass-card improvements-card">
                        <div className="feedback-header">
                            <AlertTriangle className="feedback-icon warning" size={24} />
                            <h3>Areas for Improvement</h3>
                        </div>
                        <ul className="feedback-list">
                            {results.improvements.map((improvement, index) => (
                                <li key={index} className="feedback-item">
                                    <TrendingUp size={16} className="item-icon warning" />
                                    <span>{improvement}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Missing Keywords */}
            {keywordMatch && keywordMatch.missingKeywords.length > 0 && (
                <div className="missing-keywords glass-card">
                    <div className="feedback-header">
                        <XCircle className="feedback-icon error" size={24} />
                        <h3>Missing Keywords</h3>
                    </div>
                    <p className="keywords-description">
                        Consider adding these keywords from the job description to improve your match:
                    </p>
                    <div className="keywords-grid">
                        {keywordMatch.missingKeywords.slice(0, 12).map((keywordObj, index) => (
                            <span key={index} className="keyword-badge missing">
                                {keywordObj.keyword}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Overall Feedback */}
            <div className="overall-feedback glass-card">
                <h3>Summary</h3>
                <p>{results.feedback}</p>
            </div>
        </div>
    );
}

export default AnalysisResults;

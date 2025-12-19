import React, { useState } from 'react';
import { Briefcase, X } from 'lucide-react';
import './JobDescriptionInput.css';

function JobDescriptionInput({ value, onChange }) {
    const [charCount, setCharCount] = useState(value?.length || 0);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setCharCount(newValue.length);
        onChange(newValue);
    };

    const handleClear = () => {
        onChange('');
        setCharCount(0);
    };

    return (
        <div className="job-description-input animate-slide-up">
            <div className="input-header">
                <div className="input-title">
                    <Briefcase size={24} className="title-icon" />
                    <h3>Job Description (Optional)</h3>
                </div>
                {value && (
                    <button
                        className="clear-btn"
                        onClick={handleClear}
                        title="Clear job description"
                    >
                        <X size={18} />
                        Clear
                    </button>
                )}
            </div>

            <p className="input-description">
                Paste the job description to get keyword matching and relevancy analysis
            </p>

            <div className="textarea-wrapper">
                <textarea
                    className="job-description-textarea"
                    placeholder="Paste the job description here...

Example: We are looking for a Senior Software Engineer with 5+ years of experience in React, Node.js, and cloud technologies. The ideal candidate should have strong problem-solving skills and experience with microservices architecture..."
                    value={value}
                    onChange={handleChange}
                    rows={8}
                />
                <div className="char-count">
                    {charCount} characters
                </div>
            </div>
        </div>
    );
}

export default JobDescriptionInput;

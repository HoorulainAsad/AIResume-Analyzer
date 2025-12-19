import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Star } from 'lucide-react';
import './ResumeUpload.css';

function ResumeUpload({ onFileUpload, isAnalyzing }) {
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [error, setError] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const validateFile = (file) => {
        const validTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (!validTypes.includes(file.type)) {
            setError('Please upload a PDF or DOCX file');
            return false;
        }

        // 10MB file size limit
        if (file.size > 10 * 1024 * 1024) {
            setError('File size must be less than 10MB');
            return false;
        }

        setError('');
        return true;
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (validateFile(file)) {
                setUploadedFile(file);
                onFileUpload(file);
            }
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (validateFile(file)) {
                setUploadedFile(file);
                onFileUpload(file);
            }
        }
    };

    return (
        <div className="resume-upload animate-slide-up">
            <div className="upload-header">
                <h2>Upload Your Resume</h2>
                <p>Support for PDF and DOCX files (max 10MB)</p>
            </div>

            <div
                className={`upload-zone ${dragActive ? 'drag-active' : ''} ${uploadedFile ? 'has-file' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    id="file-upload"
                    className="file-input"
                    accept=".pdf,.docx"
                    onChange={handleChange}
                    disabled={isAnalyzing}
                />

                <label htmlFor="file-upload" className="upload-label">
                    {uploadedFile ? (
                        <>
                            <CheckCircle className="upload-icon success" size={48} />
                            <div className="upload-text">
                                <h3>File Uploaded Successfully</h3>
                                <p className="file-name">
                                    <FileText size={16} />
                                    {uploadedFile.name}
                                </p>
                                <p className="file-size">
                                    {(uploadedFile.size / 1024).toFixed(2)} KB
                                </p>
                            </div>

                            {/* Rating System */}
                            <div className="rating-container">
                                <p className="rating-label">Rate your resume:</p>
                                <div className="stars">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={24}
                                            className={`star ${star <= (hoverRating || rating) ? 'star-filled' : 'star-empty'
                                                }`}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                        />
                                    ))}
                                </div>
                                {rating > 0 && (
                                    <p className="rating-text">
                                        You rated your resume: {rating}/5 stars
                                    </p>
                                )}
                            </div>

                            <button
                                className="btn btn-secondary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setUploadedFile(null);
                                    setRating(0);
                                    setHoverRating(0);
                                }}
                                disabled={isAnalyzing}
                            >
                                Upload Different File
                            </button>
                        </>
                    ) : (
                        <>
                            <Upload className="upload-icon" size={48} />
                            <div className="upload-text">
                                <h3>Drag & Drop Your Resume</h3>
                                <p>or click to browse files</p>
                            </div>
                            <div className="upload-formats">
                                <span className="format-badge">PDF</span>
                                <span className="format-badge">DOCX</span>
                            </div>
                        </>
                    )}
                </label>
            </div>

            {error && (
                <div className="error-message animate-slide-down">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}

export default ResumeUpload;

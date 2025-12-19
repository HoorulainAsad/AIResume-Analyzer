import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader } from 'lucide-react';
import { getChatbotResponse } from '../services/chatbotService';
import './Chatbot.css';

function Chatbot({ resumeData, analysisResults }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hi! I'm your AI resume assistant. I've analyzed your resume and I'm here to help you improve it. Ask me anything!"
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isTyping) return;

        const userMessage = inputValue.trim();
        setInputValue('');

        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        // Show typing indicator
        setIsTyping(true);

        try {
            // Get AI response
            const response = await getChatbotResponse(userMessage);

            // Add AI response
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        } catch (error) {
            console.error('Error getting chatbot response:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm sorry, I encountered an error. Please try again."
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const quickSuggestions = [
        "How can I improve my resume?",
        "What's my score?",
        "Tips for ATS optimization",
        "How to write a better summary?"
    ];

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                className={`chat-button ${isOpen ? 'chat-open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle chat"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chat-window animate-slide-up">
                    <div className="chat-header">
                        <div className="chat-header-content">
                            <MessageCircle size={20} />
                            <div>
                                <h3>AI Resume Assistant</h3>
                                <p>Ask me anything about your resume</p>
                            </div>
                        </div>
                    </div>

                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${message.role === 'user' ? 'message-user' : 'message-assistant'}`}
                            >
                                <div className="message-content">
                                    {message.content}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="message message-assistant">
                                <div className="message-content typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Suggestions */}
                    {messages.length <= 2 && (
                        <div className="quick-suggestions">
                            {quickSuggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    className="suggestion-btn"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="chat-input-container">
                        <input
                            type="text"
                            className="chat-input"
                            placeholder="Ask about your resume..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isTyping}
                        />
                        <button
                            className="send-button"
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim() || isTyping}
                            aria-label="Send message"
                        >
                            {isTyping ? <Loader className="spinner-icon" size={20} /> : <Send size={20} />}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Chatbot;

/**
 * AI Chatbot Service for Resume Improvement Suggestions
 * This is a mock implementation - replace with actual AI API integration
 */

const CHATBOT_CONTEXT = {
    resumeData: null,
    analysisResults: null,
    conversationHistory: []
};

/**
 * Initialize chatbot with resume context
 */
export function initializeChatbot(resumeData, analysisResults) {
    CHATBOT_CONTEXT.resumeData = resumeData;
    CHATBOT_CONTEXT.analysisResults = analysisResults;
    CHATBOT_CONTEXT.conversationHistory = [];
}

/**
 * Get AI response to user message
 */
export async function getChatbotResponse(userMessage) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Add user message to history
    CHATBOT_CONTEXT.conversationHistory.push({
        role: 'user',
        content: userMessage
    });

    // Generate response based on message content
    const response = generateResponse(userMessage);

    // Add AI response to history
    CHATBOT_CONTEXT.conversationHistory.push({
        role: 'assistant',
        content: response
    });

    return response;
}

/**
 * Generate contextual response based on user message
 */
function generateResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Greeting responses
    if (lowerMessage.match(/^(hi|hello|hey|greetings)/)) {
        return "Hello! I'm your AI resume assistant. I've analyzed your resume and I'm here to help you improve it. What would you like to know?";
    }

    // Score-related questions
    if (lowerMessage.includes('score') || lowerMessage.includes('rating')) {
        if (CHATBOT_CONTEXT.analysisResults) {
            const score = CHATBOT_CONTEXT.analysisResults.overallScore;
            return `Your resume received an overall score of ${score}/100. ${getScoreAdvice(score)} Would you like specific suggestions for improvement?`;
        }
        return "I haven't analyzed your resume yet. Please upload a resume first!";
    }

    // Improvement questions
    if (lowerMessage.includes('improve') || lowerMessage.includes('better') || lowerMessage.includes('enhance')) {
        if (CHATBOT_CONTEXT.analysisResults?.improvements) {
            const improvements = CHATBOT_CONTEXT.analysisResults.improvements;
            let response = "Here are the top ways to improve your resume:\n\n";
            improvements.slice(0, 3).forEach((imp, idx) => {
                response += `${idx + 1}. ${imp}\n`;
            });
            response += "\nWould you like more details on any of these?";
            return response;
        }
        return "Upload your resume first, and I'll provide personalized improvement suggestions!";
    }

    // Keyword questions
    if (lowerMessage.includes('keyword') || lowerMessage.includes('skills')) {
        if (CHATBOT_CONTEXT.resumeData?.skills) {
            return `I found these skills in your resume: ${CHATBOT_CONTEXT.resumeData.skills.slice(0, 5).join(', ')}. To improve keyword optimization, make sure to include specific technical skills relevant to your target role. Consider adding industry-specific tools, frameworks, and methodologies.`;
        }
        return "Keywords are crucial for ATS (Applicant Tracking Systems). Include relevant technical skills, tools, and industry terms that match your target job description.";
    }

    // Formatting questions
    if (lowerMessage.includes('format') || lowerMessage.includes('structure') || lowerMessage.includes('layout')) {
        return "For optimal formatting:\n\n1. Use clear section headers (Summary, Experience, Education, Skills)\n2. Keep it to 1-2 pages maximum\n3. Use bullet points for easy scanning\n4. Include contact information at the top\n5. Use consistent fonts and spacing\n6. Avoid graphics or tables that might confuse ATS systems";
    }

    // Experience questions
    if (lowerMessage.includes('experience') || lowerMessage.includes('work history')) {
        return "When describing your experience:\n\n1. Start each bullet with action verbs (Led, Developed, Managed, etc.)\n2. Quantify achievements with numbers and metrics\n3. Focus on impact and results, not just responsibilities\n4. Use the STAR method (Situation, Task, Action, Result)\n5. Tailor descriptions to match your target role\n\nExample: 'Increased sales by 35% through implementation of new CRM system'";
    }

    // ATS questions
    if (lowerMessage.includes('ats') || lowerMessage.includes('applicant tracking')) {
        return "To optimize for ATS (Applicant Tracking Systems):\n\n1. Use standard section headers\n2. Avoid headers, footers, and complex formatting\n3. Include relevant keywords from the job description\n4. Use standard fonts (Arial, Calibri, Times New Roman)\n5. Save as .docx or PDF format\n6. Don't use tables, text boxes, or images for important information";
    }

    // Strengths questions
    if (lowerMessage.includes('strength') || lowerMessage.includes('good') || lowerMessage.includes('positive')) {
        if (CHATBOT_CONTEXT.analysisResults?.strengths) {
            const strengths = CHATBOT_CONTEXT.analysisResults.strengths;
            let response = "Your resume's strengths include:\n\n";
            strengths.forEach((strength, idx) => {
                response += `✓ ${strength}\n`;
            });
            return response;
        }
        return "Upload your resume and I'll identify its strengths!";
    }

    // Summary/objective questions
    if (lowerMessage.includes('summary') || lowerMessage.includes('objective')) {
        return "A strong professional summary should:\n\n1. Be 2-3 sentences at the top of your resume\n2. Highlight your years of experience and key expertise\n3. Mention your most impressive achievement\n4. Include relevant keywords for your target role\n5. Show what value you bring to employers\n\nExample: 'Results-driven Software Engineer with 5+ years developing scalable web applications. Led team of 4 developers to deliver $2M project 2 months ahead of schedule. Expert in React, Node.js, and cloud architecture.'";
    }

    // Action verbs questions
    if (lowerMessage.includes('action verb') || lowerMessage.includes('power word')) {
        return "Strong action verbs to use in your resume:\n\n• Leadership: Led, Directed, Managed, Coordinated, Supervised\n• Achievement: Achieved, Exceeded, Delivered, Accomplished, Attained\n• Creation: Developed, Created, Designed, Built, Established\n• Improvement: Improved, Enhanced, Optimized, Streamlined, Increased\n• Technical: Implemented, Engineered, Programmed, Configured, Integrated\n\nReplace weak verbs like 'responsible for' or 'worked on' with these powerful alternatives!";
    }

    // Thank you responses
    if (lowerMessage.includes('thank')) {
        return "You're welcome! I'm here to help you create the best resume possible. Feel free to ask me anything else!";
    }

    // Default response with suggestions
    return `I can help you with:\n\n• Resume score and analysis\n• Improvement suggestions\n• Keyword optimization\n• Formatting best practices\n• ATS optimization tips\n• Writing effective experience descriptions\n• Creating a strong professional summary\n\nWhat would you like to know more about?`;
}

/**
 * Get advice based on score
 */
function getScoreAdvice(score) {
    if (score >= 85) {
        return "That's excellent! Your resume is well-optimized.";
    } else if (score >= 70) {
        return "That's good, but there's room for improvement.";
    } else if (score >= 50) {
        return "Your resume needs some work to be competitive.";
    } else {
        return "Your resume needs significant improvements.";
    }
}

/**
 * Get conversation history
 */
export function getConversationHistory() {
    return CHATBOT_CONTEXT.conversationHistory;
}

/**
 * Clear conversation history
 */
export function clearConversationHistory() {
    CHATBOT_CONTEXT.conversationHistory = [];
}

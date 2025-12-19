# 🚀 AI-Powered Resume Analyzer

A modern, AI-powered web application that helps users optimize their resumes through intelligent analysis, keyword matching, and real-time AI chatbot assistance.

![AI Resume Analyzer](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-7.3-purple) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 📄 Resume Upload & Parsing
- Drag-and-drop file upload with visual feedback
- Support for PDF and DOCX formats (up to 10MB)
- Intelligent text extraction and structured data parsing
- Contact information, skills, and section identification

### 🤖 AI-Powered Analysis
- Comprehensive scoring across 4 categories:
  - **Formatting**: Structure, contact info, sections
  - **Content**: Word count, completeness, detail level
  - **Keywords**: Technical skills, soft skills, relevance
  - **Experience**: Action verbs, quantifiable achievements
- Overall score calculation (0-100 scale)
- Personalized feedback with strengths and improvements

### 🎯 Keyword Matching
- Intelligent keyword extraction from job descriptions
- Technical and soft skills detection
- Match percentage calculation
- Missing keywords identification with importance ranking
- Relevancy scoring based on multiple factors

### 💬 Real-Time AI Chatbot
- Context-aware responses based on resume analysis
- Quick suggestions for common questions
- Comprehensive help topics:
  - Resume improvement tips
  - ATS optimization advice
  - Formatting best practices
  - Action verb suggestions
  - Professional summary writing

### 🎨 Premium UI/UX
- Modern dark theme with vibrant gradients
- Glassmorphism effects throughout
- Smooth animations and micro-interactions
- Fully responsive design (mobile, tablet, desktop)
- Professional typography with Inter font

## 🛠️ Technology Stack

- **Frontend**: React 18 with Vite
- **PDF Parsing**: react-pdf, pdfjs-dist
- **DOCX Parsing**: mammoth
- **Icons**: lucide-react
- **Styling**: Vanilla CSS with custom properties
- **State Management**: React hooks

## 🚀 Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stellar-cassini
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## 📖 Usage

1. **Upload Your Resume**
   - Click the upload area or drag-and-drop your resume file
   - Supported formats: PDF or DOCX (max 10MB)

2. **Add Job Description (Optional)**
   - Paste the job description you're targeting
   - Enables keyword matching and relevancy analysis

3. **Analyze Resume**
   - Click "Analyze Resume" button
   - Review scores, feedback, and suggestions

4. **Chat with AI Assistant**
   - Click the floating chat button (bottom right)
   - Ask questions about improving your resume
   - Get personalized tips and advice

## 🏗️ Project Structure

```
stellar-cassini/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── ResumeUpload.jsx
│   │   ├── JobDescriptionInput.jsx
│   │   ├── AnalysisResults.jsx
│   │   └── Chatbot.jsx
│   ├── services/
│   │   ├── resumeParser.js
│   │   ├── aiAnalyzer.js
│   │   ├── keywordMatcher.js
│   │   └── chatbotService.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## 🎯 Key Features Explained

### Resume Parsing
The application uses `react-pdf` for PDF files and `mammoth` for DOCX files to extract text content. It then parses the text to identify:
- Contact information (name, email, phone)
- Skills and competencies
- Resume sections (Summary, Experience, Education, etc.)

### AI Analysis
The mock AI analyzer evaluates resumes across multiple dimensions:
- **Formatting Score**: Based on structure and contact info completeness
- **Content Score**: Evaluates word count and section presence
- **Keywords Score**: Assesses skill optimization and relevance
- **Experience Score**: Checks for action verbs and achievements

### Chatbot Intelligence
The chatbot provides context-aware responses by:
- Accessing resume analysis results
- Understanding common resume optimization questions
- Providing actionable advice for improvements
- Offering ATS optimization tips

## 🔮 Future Enhancements

- **Real AI Integration**: Replace mock services with OpenAI GPT-4 or Google Gemini
- **Backend Service**: Add server-side processing for larger files
- **User Accounts**: Save resume versions and track improvements
- **Template Library**: Provide professionally designed resume templates
- **Export Features**: Generate optimized resume PDFs
- **Multi-language Support**: Analyze resumes in different languages

## 📝 Notes

- The current implementation uses **mock AI services** for demonstration
- For production use, integrate with real AI APIs (OpenAI, Google Gemini, etc.)
- The application runs entirely client-side (no backend required)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with React and Vite
- Icons by Lucide
- Typography by Google Fonts (Inter)

---

**Made with ❤️ for better resumes**

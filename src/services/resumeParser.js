import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker with a known working version
// Using version 3.11.174 which is stable and available on CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

/**
 * Extract text from PDF file
 */
export async function extractTextFromPDF(file) {
    try {
        console.log('Starting PDF extraction for file:', file.name);

        const arrayBuffer = await file.arrayBuffer();
        console.log('ArrayBuffer created, size:', arrayBuffer.byteLength);

        const loadingTask = pdfjsLib.getDocument({
            data: arrayBuffer,
            useWorkerFetch: false,
            isEvalSupported: false,
            useSystemFonts: true
        });

        const pdf = await loadingTask.promise;
        console.log('PDF loaded successfully, pages:', pdf.numPages);

        let fullText = '';

        // Extract text from each page
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
            console.log(`Extracted text from page ${i}, length: ${pageText.length}`);
        }

        console.log('Total text extracted:', fullText.length, 'characters');

        if (fullText.trim().length === 0) {
            throw new Error('PDF appears to be empty or contains only images. Please use a text-based PDF.');
        }

        return fullText;
    } catch (error) {
        console.error('Detailed PDF extraction error:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);

        if (error.message.includes('empty') || error.message.includes('images')) {
            throw error;
        }

        throw new Error(`Failed to parse PDF file: ${error.message}. Please ensure it's a valid, text-based PDF.`);
    }
}

/**
 * Extract text from DOCX file
 */
export async function extractTextFromDOCX(file) {
    try {
        const mammoth = await import('mammoth');
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value;
    } catch (error) {
        console.error('Error extracting DOCX text:', error);
        throw new Error('Failed to parse DOCX file. Please ensure it\'s a valid Word document.');
    }
}

/**
 * Parse resume text into structured data
 */
export function parseResumeData(text) {
    const data = {
        rawText: text,
        name: extractName(text),
        email: extractEmail(text),
        phone: extractPhone(text),
        skills: extractSkills(text),
        experience: extractExperience(text),
        education: extractEducation(text),
        sections: identifySections(text)
    };

    return data;
}

/**
 * Extract name from resume text (simple heuristic)
 */
function extractName(text) {
    const lines = text.split('\n').filter(line => line.trim());
    // Usually the first non-empty line is the name
    return lines[0]?.trim() || 'Not found';
}

/**
 * Extract email from resume text
 */
function extractEmail(text) {
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
    const matches = text.match(emailRegex);
    return matches ? matches[0] : 'Not found';
}

/**
 * Extract phone number from resume text
 */
function extractPhone(text) {
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const matches = text.match(phoneRegex);
    return matches ? matches[0] : 'Not found';
}

/**
 * Extract skills from resume text
 */
function extractSkills(text) {
    const skillKeywords = [
        'javascript', 'python', 'java', 'react', 'node', 'angular', 'vue',
        'sql', 'mongodb', 'aws', 'docker', 'kubernetes', 'git', 'agile',
        'typescript', 'html', 'css', 'rest', 'api', 'machine learning',
        'data analysis', 'project management', 'leadership', 'communication'
    ];

    const lowerText = text.toLowerCase();
    const foundSkills = skillKeywords.filter(skill =>
        lowerText.includes(skill.toLowerCase())
    );

    return foundSkills.length > 0 ? foundSkills : ['Skills section not clearly identified'];
}

/**
 * Extract experience information
 */
function extractExperience(text) {
    const experienceKeywords = ['experience', 'work history', 'employment', 'professional background'];
    const lowerText = text.toLowerCase();

    for (const keyword of experienceKeywords) {
        if (lowerText.includes(keyword)) {
            return 'Experience section found';
        }
    }

    return 'Experience section not clearly identified';
}

/**
 * Extract education information
 */
function extractEducation(text) {
    const educationKeywords = ['education', 'degree', 'university', 'college', 'bachelor', 'master', 'phd'];
    const lowerText = text.toLowerCase();

    for (const keyword of educationKeywords) {
        if (lowerText.includes(keyword)) {
            return 'Education section found';
        }
    }

    return 'Education section not clearly identified';
}

/**
 * Identify major sections in the resume
 */
function identifySections(text) {
    const sections = [];
    const sectionKeywords = {
        'Summary': ['summary', 'objective', 'profile'],
        'Experience': ['experience', 'work history', 'employment'],
        'Education': ['education', 'academic'],
        'Skills': ['skills', 'technical skills', 'competencies'],
        'Projects': ['projects', 'portfolio'],
        'Certifications': ['certifications', 'certificates', 'licenses']
    };

    const lowerText = text.toLowerCase();

    for (const [section, keywords] of Object.entries(sectionKeywords)) {
        for (const keyword of keywords) {
            if (lowerText.includes(keyword)) {
                sections.push(section);
                break;
            }
        }
    }

    return sections;
}

/**
 * Main function to parse resume file
 */
export async function parseResume(file) {
    const fileType = file.type;
    let text = '';

    if (fileType === 'application/pdf') {
        text = await extractTextFromPDF(file);
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        text = await extractTextFromDOCX(file);
    } else {
        throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
    }

    return parseResumeData(text);
}

/**
 * Analyze resume quality and provide feedback
 * This is a mock implementation - replace with actual AI API integration
 */
export async function analyzeResume(resumeData, jobDescription = '') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const analysis = {
        overallScore: 0,
        categoryScores: {
            formatting: 0,
            content: 0,
            keywords: 0,
            experience: 0
        },
        strengths: [],
        improvements: [],
        feedback: ''
    };

    // Analyze formatting
    analysis.categoryScores.formatting = analyzeFormatting(resumeData);

    // Analyze content
    analysis.categoryScores.content = analyzeContent(resumeData);

    // Analyze keywords
    analysis.categoryScores.keywords = analyzeKeywords(resumeData, jobDescription);

    // Analyze experience
    analysis.categoryScores.experience = analyzeExperience(resumeData);

    // Calculate overall score
    analysis.overallScore = Math.round(
        (analysis.categoryScores.formatting +
            analysis.categoryScores.content +
            analysis.categoryScores.keywords +
            analysis.categoryScores.experience) / 4
    );

    // Generate strengths and improvements
    analysis.strengths = generateStrengths(resumeData, analysis.categoryScores);
    analysis.improvements = generateImprovements(resumeData, analysis.categoryScores);

    // Generate overall feedback
    analysis.feedback = generateFeedback(analysis.overallScore, analysis.categoryScores);

    return analysis;
}

/**
 * Analyze resume formatting
 */
function analyzeFormatting(resumeData) {
    let score = 50; // Base score

    // Check for contact information
    if (resumeData.email && resumeData.email !== 'Not found') score += 15;
    if (resumeData.phone && resumeData.phone !== 'Not found') score += 10;
    if (resumeData.name && resumeData.name !== 'Not found') score += 10;

    // Check for sections
    if (resumeData.sections && resumeData.sections.length >= 3) score += 15;

    return Math.min(score, 100);
}

/**
 * Analyze resume content quality
 */
function analyzeContent(resumeData) {
    let score = 40; // Base score

    const wordCount = resumeData.rawText.split(/\s+/).length;

    // Ideal resume length: 400-800 words
    if (wordCount >= 400 && wordCount <= 800) {
        score += 30;
    } else if (wordCount >= 300 && wordCount <= 1000) {
        score += 20;
    } else if (wordCount >= 200) {
        score += 10;
    }

    // Check for key sections
    const hasExperience = resumeData.sections?.includes('Experience');
    const hasEducation = resumeData.sections?.includes('Education');
    const hasSkills = resumeData.sections?.includes('Skills');

    if (hasExperience) score += 10;
    if (hasEducation) score += 10;
    if (hasSkills) score += 10;

    return Math.min(score, 100);
}

/**
 * Analyze keyword optimization
 */
function analyzeKeywords(resumeData, jobDescription) {
    let score = 50; // Base score

    // Check skills count
    const skillsCount = resumeData.skills?.length || 0;
    if (skillsCount >= 8) {
        score += 30;
    } else if (skillsCount >= 5) {
        score += 20;
    } else if (skillsCount >= 3) {
        score += 10;
    }

    // If job description provided, check relevance
    if (jobDescription && jobDescription.trim().length > 0) {
        const jobKeywords = jobDescription.toLowerCase().split(/\s+/);
        const resumeText = resumeData.rawText.toLowerCase();
        const matchCount = jobKeywords.filter(word =>
            word.length > 4 && resumeText.includes(word)
        ).length;

        const matchPercentage = (matchCount / Math.max(jobKeywords.length, 1)) * 100;
        score = Math.round((score + matchPercentage) / 2);
    }

    return Math.min(score, 100);
}

/**
 * Analyze experience section
 */
function analyzeExperience(resumeData) {
    let score = 40; // Base score

    const hasExperience = resumeData.sections?.includes('Experience');
    const hasProjects = resumeData.sections?.includes('Projects');

    if (hasExperience) score += 30;
    if (hasProjects) score += 15;

    // Check for action verbs (common in strong resumes)
    const actionVerbs = [
        'led', 'managed', 'developed', 'created', 'implemented', 'designed',
        'built', 'improved', 'increased', 'reduced', 'achieved', 'delivered'
    ];

    const resumeText = resumeData.rawText.toLowerCase();
    const actionVerbCount = actionVerbs.filter(verb => resumeText.includes(verb)).length;

    score += Math.min(actionVerbCount * 3, 15);

    return Math.min(score, 100);
}

/**
 * Generate strengths based on analysis
 */
function generateStrengths(resumeData, scores) {
    const strengths = [];

    if (scores.formatting >= 80) {
        strengths.push('Well-structured format with clear contact information');
    }

    if (scores.content >= 80) {
        strengths.push('Comprehensive content with appropriate length and detail');
    }

    if (scores.keywords >= 75) {
        strengths.push('Strong keyword optimization with relevant skills highlighted');
    }

    if (scores.experience >= 75) {
        strengths.push('Effective use of action verbs and quantifiable achievements');
    }

    if (resumeData.sections?.includes('Projects')) {
        strengths.push('Includes relevant projects demonstrating practical experience');
    }

    if (resumeData.sections?.includes('Certifications')) {
        strengths.push('Professional certifications add credibility');
    }

    if (strengths.length === 0) {
        strengths.push('Resume uploaded successfully and ready for optimization');
    }

    return strengths;
}

/**
 * Generate improvement suggestions
 */
function generateImprovements(resumeData, scores) {
    const improvements = [];

    if (scores.formatting < 70) {
        improvements.push('Add complete contact information (email, phone, LinkedIn)');
    }

    if (scores.content < 70) {
        improvements.push('Expand content with more detailed descriptions of your experience');
    }

    if (scores.keywords < 70) {
        improvements.push('Include more relevant technical skills and industry keywords');
    }

    if (scores.experience < 70) {
        improvements.push('Use more action verbs and quantify your achievements with metrics');
    }

    if (!resumeData.sections?.includes('Summary')) {
        improvements.push('Add a professional summary at the top to highlight your value proposition');
    }

    if (!resumeData.sections?.includes('Projects')) {
        improvements.push('Include relevant projects to showcase your practical skills');
    }

    const wordCount = resumeData.rawText.split(/\s+/).length;
    if (wordCount < 300) {
        improvements.push('Expand your resume with more details - aim for 400-800 words');
    } else if (wordCount > 1000) {
        improvements.push('Consider condensing your resume - aim for 400-800 words for optimal impact');
    }

    return improvements;
}

/**
 * Generate overall feedback message
 */
function generateFeedback(overallScore, categoryScores) {
    let feedback = '';

    if (overallScore >= 85) {
        feedback = 'Excellent resume! Your resume is well-optimized and demonstrates strong professional presentation. ';
    } else if (overallScore >= 70) {
        feedback = 'Good resume with room for improvement. You have a solid foundation with some areas to enhance. ';
    } else if (overallScore >= 50) {
        feedback = 'Your resume needs improvement. Focus on the suggested areas to make it more competitive. ';
    } else {
        feedback = 'Significant improvements needed. Consider restructuring your resume with the feedback provided. ';
    }

    // Add specific category feedback
    const weakestCategory = Object.entries(categoryScores).reduce((a, b) =>
        a[1] < b[1] ? a : b
    );

    const categoryNames = {
        formatting: 'formatting and structure',
        content: 'content depth and quality',
        keywords: 'keyword optimization',
        experience: 'experience presentation'
    };

    if (weakestCategory[1] < 70) {
        feedback += `Pay special attention to ${categoryNames[weakestCategory[0]]}.`;
    }

    return feedback;
}

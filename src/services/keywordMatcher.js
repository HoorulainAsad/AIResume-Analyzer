/**
 * Extract keywords from job description
 */
export function extractKeywords(jobDescription) {
    if (!jobDescription || jobDescription.trim().length === 0) {
        return [];
    }

    const text = jobDescription.toLowerCase();

    // Common technical skills and keywords
    const technicalKeywords = [
        'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node.js', 'typescript',
        'html', 'css', 'sql', 'mongodb', 'postgresql', 'mysql', 'aws', 'azure', 'gcp',
        'docker', 'kubernetes', 'git', 'ci/cd', 'agile', 'scrum', 'rest api', 'graphql',
        'machine learning', 'ai', 'data analysis', 'tensorflow', 'pytorch', 'pandas',
        'spring boot', 'django', 'flask', 'express', '.net', 'c#', 'c++', 'go', 'rust',
        'microservices', 'devops', 'jenkins', 'terraform', 'ansible'
    ];

    // Soft skills
    const softSkills = [
        'leadership', 'communication', 'teamwork', 'problem solving', 'analytical',
        'project management', 'time management', 'collaboration', 'adaptability',
        'critical thinking', 'creativity', 'attention to detail'
    ];

    // Experience levels
    const experienceLevels = [
        'entry level', 'junior', 'mid-level', 'senior', 'lead', 'principal',
        'years of experience', 'year of experience'
    ];

    const allKeywords = [...technicalKeywords, ...softSkills, ...experienceLevels];
    const foundKeywords = [];

    // Find keywords in job description
    for (const keyword of allKeywords) {
        if (text.includes(keyword)) {
            foundKeywords.push({
                keyword,
                type: technicalKeywords.includes(keyword) ? 'technical' :
                    softSkills.includes(keyword) ? 'soft' : 'experience',
                importance: calculateImportance(keyword, text)
            });
        }
    }

    // Extract custom keywords (words that appear multiple times)
    const words = text.match(/\b[a-z]{4,}\b/g) || [];
    const wordFrequency = {};

    words.forEach(word => {
        if (!isCommonWord(word)) {
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        }
    });

    // Add frequently mentioned words as keywords
    Object.entries(wordFrequency).forEach(([word, count]) => {
        if (count >= 2 && !foundKeywords.some(k => k.keyword === word)) {
            foundKeywords.push({
                keyword: word,
                type: 'custom',
                importance: Math.min(count / 5, 1) // Normalize to 0-1
            });
        }
    });

    return foundKeywords.sort((a, b) => b.importance - a.importance);
}

/**
 * Calculate keyword importance based on frequency and position
 */
function calculateImportance(keyword, text) {
    const occurrences = (text.match(new RegExp(keyword, 'gi')) || []).length;
    const position = text.indexOf(keyword.toLowerCase());

    // Keywords mentioned multiple times or early in the description are more important
    const frequencyScore = Math.min(occurrences / 3, 1);
    const positionScore = position < text.length / 3 ? 0.3 : 0;

    return Math.min(frequencyScore + positionScore, 1);
}

/**
 * Check if word is too common to be a meaningful keyword
 */
function isCommonWord(word) {
    const commonWords = [
        'will', 'have', 'with', 'this', 'that', 'from', 'they', 'been', 'were',
        'their', 'would', 'there', 'could', 'should', 'about', 'which', 'these',
        'other', 'into', 'than', 'then', 'them', 'some', 'time', 'very', 'when',
        'your', 'more', 'work', 'team', 'role', 'company', 'position', 'candidate'
    ];

    return commonWords.includes(word);
}

/**
 * Match resume keywords with job description keywords
 */
export function matchKeywords(resumeData, jobKeywords) {
    if (!resumeData || !jobKeywords || jobKeywords.length === 0) {
        return {
            matchedKeywords: [],
            missingKeywords: jobKeywords || [],
            matchPercentage: 0
        };
    }

    const resumeText = resumeData.rawText.toLowerCase();
    const matchedKeywords = [];
    const missingKeywords = [];

    jobKeywords.forEach(keywordObj => {
        const keyword = keywordObj.keyword.toLowerCase();

        if (resumeText.includes(keyword)) {
            matchedKeywords.push({
                ...keywordObj,
                matched: true
            });
        } else {
            missingKeywords.push({
                ...keywordObj,
                matched: false
            });
        }
    });

    const matchPercentage = jobKeywords.length > 0
        ? Math.round((matchedKeywords.length / jobKeywords.length) * 100)
        : 0;

    return {
        matchedKeywords,
        missingKeywords,
        matchPercentage
    };
}

/**
 * Calculate relevancy score between resume and job description
 */
export function calculateRelevancyScore(resumeData, jobDescription) {
    const jobKeywords = extractKeywords(jobDescription);
    const matchResult = matchKeywords(resumeData, jobKeywords);

    // Weight different factors
    const keywordMatchWeight = 0.6;
    const sectionCompletenessWeight = 0.2;
    const skillsWeight = 0.2;

    // Keyword match score
    const keywordScore = matchResult.matchPercentage / 100;

    // Section completeness score
    const expectedSections = ['Summary', 'Experience', 'Education', 'Skills'];
    const foundSections = resumeData.sections || [];
    const sectionScore = foundSections.filter(s => expectedSections.includes(s)).length / expectedSections.length;

    // Skills score (based on number of skills found)
    const skillsScore = Math.min((resumeData.skills?.length || 0) / 10, 1);

    const totalScore = (
        keywordScore * keywordMatchWeight +
        sectionScore * sectionCompletenessWeight +
        skillsScore * skillsWeight
    ) * 100;

    return {
        score: Math.round(totalScore),
        breakdown: {
            keywordMatch: Math.round(keywordScore * 100),
            sectionCompleteness: Math.round(sectionScore * 100),
            skills: Math.round(skillsScore * 100)
        },
        ...matchResult
    };
}

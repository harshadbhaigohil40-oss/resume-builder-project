const Groq = require('groq-sdk');

/**
 * @desc    Analyze resume content using AI
 * @route   POST /api/ai/analyze
 * @access  Private
 */
const analyzeResume = async (req, res) => {
  try {
    const { resumeData } = req.body;

    if (!resumeData) {
      return res.status(400).json({
        success: false,
        message: 'Resume data is required',
      });
    }

    // Demo Mode / Simulation if no API key is provided
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
      console.log('📢 AI Analysis running in Demo Mode (No API Key)');
      
      const demoResponse = {
        score: 75,
        isDemo: true,
        suggestions: [
          {
            section: 'summary',
            original: resumeData.personalInfo?.summary || '',
            improved: `Result-driven professional with a strong background in ${resumeData.skills?.[0] || 'software development'}. Proven track record of delivering high-quality solutions and collaborating with cross-functional teams to achieve project goals.`,
            reason: 'The original summary is a bit brief. This version uses more impactful action verbs and highlights your primary skill.'
          },
          {
            section: 'experience',
            original: resumeData.experience?.[0]?.description || '',
            improved: `Spearheaded the development of core features, resulting in a 20% increase in system efficiency. Optimized database queries and implemented automated testing to ensure 99.9% uptime.`,
            reason: 'Adding quantifiable achievements (like 20% increase) makes your experience much more impressive to recruiters.'
          },
          {
            section: 'skills',
            original: resumeData.skills?.join(', ') || '',
            improved: `${resumeData.skills?.join(', ')}, Agile Methodologies, Team Leadership, System Architecture`,
            reason: 'Adding high-level conceptual skills like "Agile" and "Architecture" can help you pass through ATS filters more easily.'
          }
        ]
      };

      return res.status(200).json({
        success: true,
        data: demoResponse,
        message: 'Demo Mode: Please add a real GROQ API key for personalized analysis.'
      });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const prompt = `You are an expert resume reviewer.

Analyze this resume and return JSON format only.

Return:
{
  "score": number (0-100),
  "suggestions": [
    {
      "section": "string (e.g., summary, experience, skills)",
      "original": "string (the original text to be improved)",
      "improved": "string (the improved version of the text)",
      "reason": "string (why this improvement is suggested)"
    }
  ]
}

Resume Data:
${JSON.stringify(resumeData, null, 2)}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama3-70b-8192',
      response_format: { type: 'json_object' },
    });

    const aiResponse = JSON.parse(chatCompletion.choices[0].message.content);

    res.status(200).json({
      success: true,
      data: aiResponse,
    });
  } catch (error) {
    console.error('AI Analysis Error:', error);
    res.status(500).json({
      success: false,
      message: 'AI Analysis Failed. Try Again.',
      error: error.message,
    });
  }
};

module.exports = {
  analyzeResume,
};

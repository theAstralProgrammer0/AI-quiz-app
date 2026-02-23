'use-strict';

/* imports */
const Anthropic = require('@anthropic-ai/sdk');
const logger = require('./utils/logger');

/* check for Claude API Key */
if (!process.env.CLAUDE_API_KEY) {
  logger.warn('ANTHROPIC_API_KEY is not set. Claude AI features will not work.');
}

/* instantiate new claude client */
const claude = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

/* define configurations for claude */
const CLAUDE_CONFIG = {
  model: process.env.CLAUDE_MODEL || 'claude-sonnet-4-6',
  maxTokens: parseInt(process.env.CLAUDE_MAX_TOKENS, 10) || 4096,
  temperature: parseFloat(process.env.CLAUDE_TEMPERATURE) || 0.7,
};

/* define difficulty scaling config for adaptive quiz gen */
const DIFFICULTY_LEVELS = {
  BEGINNER: {
    label: 'beginner',
    description: 'Foundational concepts, straightforward questions with obvious distractors',
    scoreThreshold: null,
  },
  INTERMEDIATE: {
    label: 'intermediate',
    description: 'Applied knowledge, moderately challenging questions requiring deeper understanding',
    scoreThreshold: 70,
  },
  ADVANCED: {
    label: 'advanced',
    description: 'Complex analysis, nuanced questions requiring synthesis and critical thinking',
    scoreThreshold: 85,
  },
};

module.exports = { claude, CLAUDE_CONFIG, DIFFICULTY_LEVELS };

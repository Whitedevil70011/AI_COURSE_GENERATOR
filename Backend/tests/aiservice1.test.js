const test = require('node:test');
const assert = require('node:assert/strict');
const { generateLessonLayout } = require('../services/aiservice1');

test('generateLessonLayout returns a usable lesson structure without AI credentials', async () => {
  delete process.env.GROQ_API_KEY;
  delete process.env.GEMINI_API_KEY;
  delete process.env.AI_PROVIDER;

  const lesson = await generateLessonLayout('Web Development', 'Frontend', 'React Basics');

  assert.equal(typeof lesson.title, 'string');
  assert.ok(lesson.title.length > 0);
  assert.ok(Array.isArray(lesson.objectives));
  assert.ok(lesson.objectives.length >= 3);
  assert.ok(Array.isArray(lesson.content));
  assert.ok(lesson.content.length >= 3);
  assert.ok(lesson.content.some((block) => block.type === 'heading'));
  assert.ok(lesson.content.some((block) => block.type === 'mcq'));
  assert.equal(typeof lesson.videoSearchQuery, 'string');
  assert.ok(lesson.videoSearchQuery.length > 0);
});

-- Move existing article from "Ritmo Leve" to "Sono do Bebê"
UPDATE posts 
SET category = 'Sono do Bebê'
WHERE category = 'Ritmo Leve';

-- Create English version of the article
INSERT INTO posts (
  title,
  content,
  author,
  category,
  image_url,
  audio_url,
  introduction,
  practical_tip,
  published
) VALUES (
  'Why Sleep Cues Are More Important Than the Clock',
  'What are sleep cues?
Sleep cues are small behaviors that babies show when they''re getting tired, but aren''t exhausted yet. They''re like whispers before the scream.

The most common cues include:

Staring blankly or looking lost

Drooling more than usual

Slower movements

Discrete yawns

Mild irritation or restlessness

Rubbing eyes or ears

These cues appear before crying — and they''re golden opportunities to start the nap routine calmly.

Why crying isn''t a good cue to start soothing?
When a baby reaches crying or extreme agitation, they''ve already passed the ideal point for falling asleep. This means their nervous system is overwhelmed, and the sleep process can be more difficult, with more resistance, wake-ups, and less quality rest.

The role of bonding in observation
Each baby has a unique way of showing tiredness. The more you observe with curiosity — not rush — the more sensitive you become to your baby''s rhythm.

You don''t need to "get it right" every time. The bond is what guides you. When you observe and respond with presence, the baby feels seen and secure. This, by itself, already facilitates rest.',
  'Luiza Telles',
  'Sono do Bebê',
  'https://gchbbgytnotdvfvwikwx.supabase.co/storage/v1/object/public/post-images/1753409459105.jpg',
  NULL,
  'Have you ever heard that "babies need to sleep every 3 hours"? This common idea carries a risk: disconnecting us from what the baby is really communicating. Instead of following the clock, how about observing your baby''s body and cues?

The truth is that a baby''s internal clock is more accurate than any app. And when we learn to recognize sleep cues before extreme tiredness, we create a calmer environment — for them and for us.',
  'Observe your baby''s first sleepiness cues for 3 days and note the patterns.
Notice if there''s an approximate time when they start to slow down. From there, begin the sleep ritual at the first yawn, not the last.',
  true
);
INSERT INTO teams (slug, name, slogan, accent, president_name, president_dept, president_initials,
                    vp_name, vp_dept, vp_initials, vision) VALUES
('digital-future', 'Team Digital Future',
 'Transparent governance. Connected campus. Your voice, amplified.', 'blue',
 'Kim Jun-su', 'Computer Science', 'JS',
 'Choi Soo-yeon', 'Political Science & Diplomacy', 'CS',
 'A campus where every student has real-time access to decisions that affect them — where technology removes friction, not humanity. Together we will build a transparent, digitally connected ERICA where governance is open and every voice is heard.'),
('student-first', 'Team Student First',
 'Welfare, inclusion, and a campus that works for everyone.', 'purple',
 'Lee Min-ah', 'Business Administration', 'MA',
 'Han Dong-wook', 'Sociology', 'HD',
 'Every student deserves a campus that meets them where they are — regardless of major, background, or circumstance. We will put welfare and inclusion at the center of every decision the MSA makes.'),
('green-erica', 'Team Green ERICA',
 'Sustainable spaces, accessible campus, a future we''re proud of.', 'green',
 'Park Ji-hoon', 'Industrial Design', 'JH',
 'Yoon Se-jin', 'Architecture', 'YS',
 'The choices we make about our campus today shape the community we hand off tomorrow. We will build a greener, more accessible ERICA — one sustainable decision at a time.');

INSERT INTO pillars (team_id, icon, title, description, sort_order)
SELECT t.id, v.icon, v.title, v.description, v.sort_order
FROM teams t
JOIN (VALUES
  ('digital-future', '💻', 'Digital Campus Hub', 'A unified student portal for schedules, announcements, petitions, and feedback — available on any device.', 1),
  ('digital-future', '📊', 'Transparent Governance', 'Live-streamed council meetings, public budget dashboards, and monthly open Q&A sessions.', 2),
  ('digital-future', '🗣️', 'Student Liaison Office', 'A standing office that receives, logs, and escalates student concerns with mandatory response SLAs.', 3),
  ('digital-future', '🔒', 'Data Privacy First', 'An independent student data rights committee to audit how the university uses your information.', 4),
  ('student-first', '🤝', 'Welfare First Policy', 'Expanded emergency student support fund and simplified application process.', 1),
  ('student-first', '🌱', 'Inclusion Task Force', 'Dedicated support for international, transfer, and non-traditional students.', 2),
  ('student-first', '🏫', 'Campus Accessibility', 'Auditing every building for physical and digital accessibility gaps.', 3),
  ('student-first', '💬', 'Mental Health Access', 'Shorter counseling wait times and peer-support training programs.', 4),
  ('green-erica', '🌿', 'Zero-Waste Campus', 'Composting stations, reusable container programs, and waste audits by building.', 1),
  ('green-erica', '🚲', 'Green Mobility', 'Expanded bike infrastructure and shuttle routes with lower emissions.', 2),
  ('green-erica', '🏛️', 'Accessible Spaces', 'Retrofit priority list for buildings that don''t meet accessibility standards.', 3),
  ('green-erica', '🔆', 'Renewable Campus', 'Solar pilot program for rooftop space across faculty buildings.', 4)
) AS v(slug, icon, title, description, sort_order) ON v.slug = t.slug;

INSERT INTO initiatives (team_id, headline, detail, sort_order)
SELECT t.id, v.headline, v.detail, v.sort_order
FROM teams t
JOIN (VALUES
  ('digital-future', 'Launch unified ERICA student app within 90 days', 'Built with student developers, open-sourced on GitHub.', 1),
  ('digital-future', 'Publish a real-time MSA budget tracker', 'Every expenditure over ₩50,000 visible to all enrolled students.', 2),
  ('digital-future', 'Student concern ticketing system', 'Every submission gets a reference number and a response within 5 business days.', 3),
  ('digital-future', 'Monthly open office hours in every faculty building', 'No appointment needed — drop-in consultation with the president and VP.', 4),
  ('student-first', 'Double the emergency student support fund', 'Faster approvals, fewer documents required.', 1),
  ('student-first', 'International student onboarding hub', 'Single point of contact from arrival to graduation.', 2),
  ('student-first', 'Campus-wide accessibility audit', 'Public report published within the first semester.', 3),
  ('student-first', 'Peer counselor certification program', 'Trained student volunteers in every department.', 4),
  ('green-erica', 'Install composting stations in every cafeteria', 'Partnered with facilities management for pilot rollout.', 1),
  ('green-erica', 'Double covered bike parking capacity', 'Priority locations near main academic buildings.', 2),
  ('green-erica', 'Publish an annual campus sustainability report', 'Tracked metrics on waste, energy, and emissions.', 3),
  ('green-erica', 'Rooftop solar feasibility study', 'Independent engineering assessment within one year.', 4)
) AS v(slug, headline, detail, sort_order) ON v.slug = t.slug;

-- Seed vote counts matching the mock data exactly: digital-future=49, student-first=38, green-erica=31
INSERT INTO votes (team_id, cast_at)
SELECT t.id, now() - (random() * interval '72 hours')
FROM teams t
CROSS JOIN LATERAL generate_series(1, CASE t.slug
    WHEN 'digital-future' THEN 49
    WHEN 'student-first'  THEN 38
    WHEN 'green-erica'    THEN 31
END) AS g(n);

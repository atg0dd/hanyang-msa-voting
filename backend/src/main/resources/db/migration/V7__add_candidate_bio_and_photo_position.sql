ALTER TABLE teams ADD COLUMN president_bio TEXT;
ALTER TABLE teams ADD COLUMN president_achievements TEXT;
ALTER TABLE teams ADD COLUMN president_photo_position_x INT NOT NULL DEFAULT 50;
ALTER TABLE teams ADD COLUMN president_photo_position_y INT NOT NULL DEFAULT 50;

ALTER TABLE teams ADD COLUMN vp_bio TEXT;
ALTER TABLE teams ADD COLUMN vp_achievements TEXT;
ALTER TABLE teams ADD COLUMN vp_photo_position_x INT NOT NULL DEFAULT 50;
ALTER TABLE teams ADD COLUMN vp_photo_position_y INT NOT NULL DEFAULT 50;

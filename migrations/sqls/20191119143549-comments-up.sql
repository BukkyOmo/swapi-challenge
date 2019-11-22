CREATE TABLE comments(
    id SERIAL,
    comment TEXT NOT NULL,
    episode_id INTEGER NOT NULL,
    ip_address VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


INSERT INTO comments(id, comment, episode_id, ip_address, created_at)
VALUES(1, 'How is life with you friend', 1, '121.1.0.1', NOW());

INSERT INTO comments(id, comment, episode_id, ip_address, created_at)
VALUES(2, 'The plan is supreme Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', 1, '121.1.0.1', NOW());

INSERT INTO comments(id, comment, episode_id, ip_address, created_at)
VALUES(3, 'How is life with you friend, I miss the moments we shared together', 2, '121.1.0.1', NOW());

INSERT INTO comments(id, comment, episode_id, ip_address, created_at)
VALUES(4, 'How is life with you friend', 4, '121.1.0.1', NOW());
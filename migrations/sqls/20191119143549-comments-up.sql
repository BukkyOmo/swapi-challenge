CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE comments(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    comment TEXT NOT NULL,
    episode_id INTEGER NOT NULL,
    ip_address VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


INSERT INTO comments(id, comment, episode_id, ip_address, created_at)
VALUES('8ffa92ce-0e10-11ea-8d71-362b9e155667', 'How is life with you friend', 1, '121.1.0.1', NOW());

INSERT INTO comments(id, comment, episode_id, ip_address, created_at)
VALUES('8ffa959e-0e10-11ea-8d71-362b9e155667', 'The plan is supreme Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', 1, '121.1.0.1', NOW());

INSERT INTO comments(id, comment, episode_id, ip_address, created_at)
VALUES('8ffa96f2-0e10-11ea-8d71-362b9e155667', 'How is life with you friend, I miss the moments we shared together', 2, '121.1.0.1', NOW());

INSERT INTO comments(id, comment, episode_id, ip_address, created_at)
VALUES('8ffa9828-0e10-11ea-8d71-362b9e155667', 'How is life with you friend', 4, '121.1.0.1', NOW());

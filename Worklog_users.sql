INSERT INTO users
(
    username,
    password_hash,
    full_name,
    email,
    role
)
VALUES
(
    'admin',
    '$2b$12$REPLACE_WITH_BCRYPT_HASH',
    'System Administrator',
    'admin@localhost',
    'ADMIN'
),
(
    'Justy',
    '$2b$12$REPLACE_WITH_BCRYPT_HASH',
    'Justy Shyjin',
    'admin@localhost',
    'ADMIN'
);
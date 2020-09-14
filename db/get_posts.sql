SELECT p.id, u.email, p.users_id, AS author_id  p.content, p.created_at 
FROM post p
JOIN users u ON p.users_id = u.id;
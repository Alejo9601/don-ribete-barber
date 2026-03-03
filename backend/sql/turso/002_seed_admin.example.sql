INSERT INTO users (name, lastname, username, password, rol)
VALUES ('Admin', 'Patagon', 'admin', 'changeme-now', 'ADMIN');

-- Nota:
-- El backend acepta temporalmente passwords en texto plano.
-- En el primer login correcto, la contraseña se rehashea con bcrypt
-- y se guarda actualizada automaticamente.

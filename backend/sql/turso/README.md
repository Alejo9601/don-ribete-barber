# Turso SQL

Archivos para inicializar la base de datos del backend en Turso.

Orden recomendado:

1. `001_init_schema.sql`
2. `002_seed_admin.example.sql`

Ejemplo con Turso CLI:

```bash
turso db shell <tu-db> < backend/sql/turso/001_init_schema.sql
turso db shell <tu-db> < backend/sql/turso/002_seed_admin.example.sql
```

Notas:

- `002_seed_admin.example.sql` es un seed de ejemplo. Cambia `username` y `password` antes de ejecutarlo.
- El backend actual permite que el password inicial quede en texto plano y lo migra a bcrypt en el primer login exitoso.
- `availability_settings` ya queda inicializada con:
  - domingo cerrado
  - lunes a sábado con `10:00`, `11:00`, `12:00`, `15:00`, `16:00`, `17:00`, `18:00`, `19:00`, `20:00`

# Backend LMS (NestJS + Prisma)

Backend ini adalah API untuk Learning Management System (LMS).
Project ini dibuat dengan NestJS, Prisma ORM, dan PostgreSQL.

## Apa Yang Sudah Ada Di Backend Ini

- Auth `register` dan `login` pakai JWT
- Role user: `STUDENT` dan `INSTRUCTOR`
- Fitur course (buat, lihat, ubah, hapus)
- Fitur enrollment siswa ke course
- Swagger untuk tes endpoint
- Sudah berhasil deploy ke Railway

## Tech Stack

- NestJS
- Prisma ORM 7
- PostgreSQL
- JWT
- Docker (untuk database lokal)
- Jest (unit test)

## Struktur Folder Project

Berikut folder yang ada di backend dan fungsi sederhananya:

```text
.
|-- .agents/
|   `-- skills/
|       `-- ... (dokumen skill internal agent)
|-- .claude/
|   `-- skills/ (symlink/referensi skill)
|-- .windsurf/
|   `-- skills/ (referensi skill)
|-- dist/
|   `-- ... (hasil build TypeScript -> JavaScript)
|-- prisma/
|   |-- schema.prisma (model database: User, Course, Enrollment)
|   `-- migrations/ (riwayat migrasi database)
|-- src/
|   |-- app.controller.ts (endpoint root sederhana)
|   |-- app.module.ts (modul utama aplikasi)
|   |-- app.service.ts (service sederhana untuk app)
|   |-- main.ts (entry point server)
|   |-- auth/ (fitur autentikasi & otorisasi)
|   |-- courses/ (fitur course)
|   |-- enrollment/ (fitur pendaftaran siswa ke course)
|   `-- prisma/ (PrismaService dan PrismaModule)
|-- test/
|   `-- app.e2e-spec.ts (contoh e2e test)
|-- docker-compose.yml (jalankan PostgreSQL lokal)
|-- jest.config.ts (konfigurasi unit test)
|-- nest-cli.json (konfigurasi Nest CLI)
|-- package.json (dependency dan scripts)
|-- prisma7.config.ts (konfigurasi Prisma v7)
|-- tsconfig.json (konfigurasi TypeScript)
`-- tsconfig.spec.json (konfigurasi test TypeScript)
```

## Penjelasan Folder `src` (Inti Backend)

### `src/auth/`

- Menangani register, login, JWT strategy, guard JWT, dan role guard.
- Folder penting:
- `dto/`: validasi input auth
- `decorators/`: custom decorator roles
- `guards/`: guard role untuk proteksi endpoint

### `src/courses/`

- Menangani endpoint course.
- Contoh: buat course oleh instructor, lihat daftar course, update, delete.

### `src/enrollment/`

- Menangani endpoint enrollment siswa.
- Contoh: siswa daftar ke course dan lihat course yang diikuti.

### `src/prisma/`

- Menyediakan `PrismaService` untuk akses database.
- Dipakai oleh service lain (`auth`, `courses`, `enrollment`).

## Alur Kerja Sederhana (Untuk Pemula)

1. User kirim request ke endpoint (Controller).
2. Data dicek dulu lewat DTO (validasi).
3. Logic bisnis dijalankan di Service.
4. Service akses database lewat PrismaService.
5. Response dikirim kembali ke user.

## Environment Variables

Isi file `.env` (lokal) minimal:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?schema=public"
JWT_SECRET="isi_dengan_secret_panjang"
```

Catatan:

- `JWT_SECRET` wajib ada dan tidak boleh kosong.
- Untuk production, gunakan secret acak yang panjang.

## Cara Menjalankan Di Lokal

1. Install dependency:

```bash
npm install
```

2. Jalankan PostgreSQL lokal (dari `docker-compose.yml`):

```bash
docker compose up -d
```

3. Generate Prisma Client:

```bash
npx prisma generate
```

4. Jalankan migrasi database:

```bash
npx prisma migrate dev
```

5. Jalankan server NestJS:

```bash
npm run start:dev
```

6. Buka Swagger (cek URL dari app kamu, biasanya):

```text
http://localhost:3000/api
```

## Script Penting

- `npm run start:dev` -> jalankan mode development
- `npm run build` -> build project
- `npm run start:prod` -> jalankan hasil build
- `npm run test` -> jalankan unit test
- `npm run test:e2e` -> jalankan e2e test

Catatan:

- `prebuild` dan `postinstall` sudah menjalankan `prisma generate` otomatis.
- Ini penting untuk menghindari error export Prisma saat deploy.

## Deploy Ke Railway (Ringkas)

1. Push code ke GitHub.
2. Hubungkan repo ke Railway.
3. Isi variable di Railway:

- `DATABASE_URL`
- `JWT_SECRET`

4. Deploy service.
5. Jalankan migrasi production:

```bash
npx prisma migrate deploy
```

## Status Saat Ini

- Build berhasil
- Unit test hijau
- Smoke test Swagger hijau
- Backend online di Railway
- PostgreSQL sudah terkoneksi

## Live Production API & Swagger
- **Swagger Documentation:** `https://crack-be-kevin12er-production.up.railway.app/api/docs`
- **Base API URL:** `https://crack-be-kevin12er-production.up.railway.app`

## Deploy Ke Railway

1. Push code ke GitHub.
2. Hubungkan repo ke Railway dan tambahkan Database PostgreSQL service.
3. Atur **Variables** di Railway Dashboard:
   - `DATABASE_URL` (dihubungkan ke PostgreSQL Railway)
   - `JWT_SECRET`
4. Set **Custom Start Command** di tab **Settings** Railway:
   ```bash
   npx prisma generate && npx prisma migrate deploy && npm run build && npm run start:prod


## Author

- **Nama:** Kevin Langga
- **Program:** RevoU Software Engineering (FSSE) tahun 2026
- **GitHub:** [https://github.com/Kevin12er]
- **LinkedIn:** [https://www.linkedin.com/in/kevin-langga-a0303a355/]




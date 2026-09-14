# Step Pengerjaan — Learning Management System (C.R.A.C.K Project)

> Dokumen ini adalah panduan kerja end-to-end untuk **Project Option 1: Learning
> Management System (LMS)**. Disusun dari tiga sumber: `C.R.A.C.K. Project.md`
> (requirement), `Grading Rubric.md` (220 poin), dan `Pitching Preparation.md`
> (asesmen bisnis) — digabung dengan competency ledger kategori `education`.
>
> **Klasifikasi guard:** `education` (base). Modifier `+payments`, `+public-ugc`,
> `+realtime`, `+ai` **belum aktif** — baru aktif kalau kamu benar-benar
> mengambil optional feature kursus berbayar, forum diskusi terbuka, kelas live,
> atau LLM. Kalau itu terjadi, buka lagi `PROJECT-SCOPE.md` sebelum ngoding.

---

## 0. Ringkasan Target

| Hal | Nilai |
|---|---|
| Kategori | Learning Management System (pilih **satu**, tidak boleh dicampur BMS) |
| Deliverable | 2 repo terpisah (FE + BE), keduanya ter-deploy dan bisa diakses publik |
| Role minimum | 2 role berbeda (`STUDENT` / `ADMIN`; `INSTRUCTOR` opsional) |
| Entity minimum | 3 entity utama dengan full CRUD |
| Relasi minimum | 3 relationship (termasuk one-to-many & many-to-many) |
| Target poin wajib | 120 poin (mandatory) |
| Poin tambahan | 100 poin (unit testing + optional features) — **hanya dihitung kalau semua mandatory sudah terpenuhi** |

### Use case konkret yang direkomendasikan

Pilih **satu konteks belajar** dan kunci sejak awal. Rekomendasi:
**"LMS Bootcamp Internal"** atau **"LMS Pelatihan Karyawan"** — keduanya punya
alur enroll → belajar → kumpulkan tugas → dinilai, yang natural memenuhi semua
Core Feature di brief tanpa perlu fitur tambahan.

Dokumen ini memakai contoh **LMS bootcamp**. Ganti penamaan entity kalau kamu
pilih konteks lain, tapi **jangan ganti strukturnya**.

### Apa yang membuat kategori ini berbahaya

Dua hal, dan keduanya tidak terlihat saat demo:

1. **Progres adalah produknya.** Data progres dan nilai tidak bisa direkonstruksi
   dari mana pun. Kalau hilang atau tertimpa, kepercayaan hilang permanen.
   Karena itu progres dan submission bersifat **append-only**, bukan
   di-*update* di tempat.
2. **Materi mudah bocor.** Kalau URL materi/video bisa ditebak dan permanen,
   seluruh konten kursus bocor sehari setelah rilis. Akses materi wajib dicek
   di server berdasarkan enrollment.

---

## 1. Hal Global yang Harus Dikerjakan di SETIAP Step

Ini ritual wajib. Satu step belum boleh dianggap selesai kalau poin di bawah
belum dilakukan.

### 1.1 Sebelum mulai step

1. **Baca ulang bagian Constraints (bagian 3).** 80% kegagalan proyek solo
   adalah scope creep, bukan kesulitan teknis.
2. **Tulis Definition of Done step ini** dalam 1–3 kalimat sebelum menyentuh
   kode. Kalau tidak bisa ditulis, berarti step-nya belum jelas — pecah dulu.
3. **Buat branch baru** (wajib — lihat 1.5). Satu step = satu branch.
4. **Baca tabel "Perubahan file" step tersebut.** Kerjakan hanya file yang ada
   di tabel itu. File di luar tabel bukan urusan step ini.

### 1.2 Selama step berjalan

5. **Kerjakan berlapis, jangan sekaligus.** Lihat bagian 2. Satu file tidak
   selesai dalam satu step — ia tumbuh, berubah, dan kadang menyusut seiring
   step berjalan.
6. **Tidak ada data mock di frontend.** Rubrik mensyaratkan real data dari
   backend. Kalau backend belum siap, kerjakan backend dulu, bukan bikin mock.
7. **Error handling + loading state dibuat bersamaan dengan fitur**, bukan di
   akhir. Ini 5 poin di rubrik dan paling sering ditinggal.
8. **Validasi dan penilaian selalu di server.** Skor kuis tidak boleh dihitung
   di client, dan kunci jawaban tidak boleh ikut terkirim ke browser.
9. **Jangan commit secret.** `.env` masuk `.gitignore` sejak commit pertama,
   `.env.example` selalu diperbarui saat ada variabel baru.

### 1.3 Sesudah step selesai

10. **Update `PROJECT-SCOPE.md`** — ubah status competency terkait menjadi
    `applied` (dengan bukti file path), `deferred` (dengan alasan + trigger
    dibuka lagi), atau `n/a` (dengan alasan). Status kosong = proses gagal.
11. **Ambil screenshot** fitur yang baru jadi, simpan ke `docs/screenshots/`.
    Mengumpulkan screenshot di akhir selalu berantakan dan makan waktu.
12. **Update README** bagian yang terdampak (fitur baru, endpoint baru, env
    baru). README ditulis inkremental, bukan semalam sebelum submit.
13. **Update CRACK Project Tracker** (status + catatan singkat). TL mengecek
    setiap Sabtu — update sebelum Sabtu, dan tulis blocker secara eksplisit
    kalau ada.
14. **Minta izin merge** (lihat 1.5). Jangan merge sendiri.

### 1.4 Aturan penggunaan AI (non-negotiable)

Setiap potongan kode hasil bantuan AI **harus bisa kamu jelaskan baris per
baris** saat review. Praktik yang aman:

- Tulis dulu versimu sendiri, baru minta AI membandingkan/memperbaiki.
- Setelah menerima kode dari AI, tulis komentar singkat sendiri di
  `docs/learning-notes.md`: apa yang dilakukan kode itu dan kenapa.
- Kalau ada satu file pun yang tidak bisa kamu jelaskan, hapus dan tulis ulang.
  Konsekuensi AI misuse adalah **sertifikat ditahan** — bukan sekadar potong
  nilai.

### 1.5 Protokol Git — branch wajib, commit/push/merge butuh izin

Rubrik menulis "use of branches (optional)". Di proyek ini statusnya dinaikkan
menjadi **wajib**, karena riwayat branch adalah bukti paling kuat bahwa proyek
ini dikerjakan bertahap oleh manusia, bukan digenerate sekali jalan.

**Aturan branch**

- Setiap step (perubahan mayor) dikerjakan di **branch baru dari `main`**:
  `feat/<nomor-step>-<slug>`, contoh `feat/07-progress-and-submission`.
- Perbaikan kecil di luar step: `fix/<slug>`. Dokumentasi saja: `docs/<slug>`.
- `main` selalu dalam kondisi bisa di-deploy. Dilarang push langsung ke `main`.
- Satu branch = satu step. Jangan menumpuk dua step dalam satu branch, karena
  itu menghapus jejak bertahapnya.

**Gerbang izin (berlaku untuk manusia maupun AI assistant)**

Tiga operasi berikut **tidak boleh dijalankan tanpa izin eksplisit** dari pemilik
proyek pada saat itu juga. Izin di satu step tidak berlaku untuk step berikutnya.

| Operasi | Aturan |
|---|---|
| `git commit` | Tunjukkan dulu ringkasan perubahan (`git status` + `git diff --stat`) dan draf pesan commit. Tunggu persetujuan. Baru commit. |
| `git push` | Sebutkan branch tujuan dan jumlah commit yang akan naik. Tunggu persetujuan. Baru push. |
| `git merge` / PR merge | Sebutkan branch sumber → tujuan dan ringkasan isinya. Tunggu persetujuan. Baru merge. |

**Yang dilarang tanpa pengecualian:** `git push --force`, `git reset --hard` pada
branch yang sudah dipush, merge ke `main` tanpa izin, dan commit otomatis
"sekalian" setelah menyelesaikan pekerjaan. Kalau ragu, berhenti dan tanya.

**Pesan commit.** Conventional Commits, satu commit satu maksud:

```text
feat(enrollment): block lesson content for unenrolled students
fix(submission): mark submission late using utc comparison
refactor(progress): extract completion calculation into helper
docs(readme): document append-only submission rule
```

Rubrik memberi 3 poin untuk commit message — commit `fix`, `update`, `wip`
membuang poin itu.

**Titik commit.** Setiap step di bagian 5 mencantumkan daftar **titik commit**:
tempat-tempat pekerjaan sudah cukup utuh untuk disimpan. Jangan satu step satu
commit raksasa, dan jangan pula commit setiap satu baris. Setiap titik commit
melewati gerbang izin di atas.

---

## 2. Prinsip Pengerjaan Bertingkat (Layered Development)

Ini pembeda antara proyek yang dikerjakan dan proyek yang digenerate.

**Aturan intinya:** sebuah file **tidak selesai dalam satu step**. File dibuat
dalam bentuk paling sederhana yang berguna, lalu di step berikutnya ditambah,
diubah, dan kadang dikurangi ketika ada bagian yang pindah ke tempat yang lebih
tepat.

### 2.1 Contoh nyata — `src/middlewares/error.ts`

| Step | Aksi | Isi setelah step ini |
|---|---|---|
| 3 | **BUAT** | Menangkap `HttpError`, sisanya jadi 500 generik |
| 4 | **TAMBAH** | Cabang khusus error JWT (`TokenExpiredError` → 401) |
| 6 | **TAMBAH** | Mapping Prisma `P2002` (enroll ganda) → 409 |
| 9 | **UBAH** | Stack trace disembunyikan saat `NODE_ENV=production` |
| 15 | **KURANGI** | `console.log` debug dibuang, diganti logger terstruktur |

Lima step menyentuh satu file yang sama, masing-masing dengan alasan yang
berbeda. Itulah bentuk riwayat commit yang wajar.

### 2.2 Contoh nyata — pemindahan logika (`KURANGI`)

Di Step 7 perhitungan persentase progres ditulis **langsung di dalam**
`modules/progress/service.ts` supaya cepat jalan. Di Step 12, saat dashboard
admin juga perlu menghitung progres tiap siswa, rumus yang sama dibutuhkan di
dua tempat — maka perhitungan itu **dipindahkan** ke
`modules/progress/calculator.ts`, dan `service.ts` **berkurang** isinya.

Ini bukan pekerjaan sia-sia. Refactor karena tekanan nyata adalah cara kode
sungguhan tumbuh, dan `refactor(progress): extract completion calculation into
helper` adalah commit yang bisa kamu pertahankan saat ditanya penguji.

### 2.3 Empat jenis aksi pada file

Setiap step punya tabel **Perubahan file** dengan salah satu aksi berikut:

| Aksi | Arti |
|---|---|
| **BUAT** | File belum ada. Buat dalam bentuk paling sederhana yang berguna — bukan versi finalnya. |
| **TAMBAH** | File sudah ada. Tambahkan kemampuan baru tanpa merombak yang lama. |
| **UBAH** | Perilaku yang sudah ada diganti karena kebutuhan berubah. |
| **KURANGI** | Ada yang dibuang atau dipindahkan keluar. Biasanya hasil refactor. |

### 2.4 Yang dilarang

- Menulis satu file langsung dalam bentuk finalnya "supaya tidak bolak-balik".
- Menyiapkan fungsi/komponen untuk kebutuhan step yang belum dikerjakan.
- Menyentuh file yang tidak tercantum di tabel Perubahan file step tersebut.
- Satu commit yang mengubah 20 file sekaligus. Itu tanda step-nya tidak dipecah.

### 2.5 Aturan khusus untuk schema database

Ada ketegangan antara "kunci schema di awal" dan "kerjakan bertingkat". Ini
penyelesaiannya:

- **Struktur inti dikunci di Step 2**: daftar entity dan relasi antar entity —
  terutama `Enrollment` sebagai jembatan many-to-many dan hierarki
  Course → Module → Lesson. Merombak relasi setelah ada data progres adalah
  pekerjaan berhari-hari.
- **Step berikutnya hanya boleh menambah secara aditif**: kolom baru, index
  baru, constraint baru, enum value baru — masing-masing lewat file migration
  sendiri yang di-commit terpisah.
- Kolom yang sudah dipakai jangan dihapus atau di-rename langsung. Kalau
  benar-benar perlu, pakai pola *expand-contract*: tambah kolom baru → pindahkan
  data → hentikan pemakaian kolom lama → baru hapus di migration terpisah.

Hasilnya: folder `prisma/migrations/` berisi 6–8 migration bertanggal, bukan
satu migration raksasa. Itu bukti nyata proyek ini berevolusi.

---

## 3. Constraints (Pagar Scope)

### 3.1 Constraint produk

- **C1 — Satu kategori saja.** LMS. Dilarang menambahkan booking jadwal
  konsultasi, marketplace kursus, atau sistem pembayaran. Itu proyek berbeda.
- **C2 — Satu konteks belajar saja.** Bootcamp *atau* sekolah *atau* pelatihan
  korporat. Jangan tiga-tiganya.
- **C3 — Tepat 2 role** untuk versi wajib: `STUDENT` dan `ADMIN` (admin
  merangkap instruktur). Role `INSTRUCTOR` terpisah hanya boleh ditambahkan
  setelah 120 poin mandatory aman.
- **C4 — Daftar fitur dikunci di Step 1** dan ditulis di README sebagai
  in-scope / out-of-scope. Perubahan scope hanya dengan persetujuan TL, dan
  dicatat tanggalnya.
- **C5 — Tanpa hosting video sendiri.** Video adalah lubang biaya dan waktu.
  Materi cukup berupa teks/PDF/link YouTube unlisted. Kalau tetap ingin file,
  batasi ke PDF/gambar via Cloudinary atau Supabase Storage.

### 3.2 Constraint teknis

- **C6 — Tech stack dikunci di Step 1.** Tidak boleh gonta-ganti framework di
  tengah jalan. Menambah library baru harus punya alasan yang bisa ditulis
  dalam satu kalimat.
- **C7 — Satu database, satu ORM.** Postgres + Prisma (rekomendasi).
- **C8 — Semua perubahan schema lewat file migration yang di-commit.**
  Dilarang mengubah struktur tabel langsung dari dashboard/GUI database.
- **C9 — Progres dan submission bersifat append-only.** Menimpa nilai lama
  tanpa jejak adalah cacat, bukan pilihan desain. Setiap percobaan/pengumpulan
  ulang menjadi baris baru.
- **C10 — Deploy sejak awal, bukan di akhir.** Backend harus sudah live sebelum
  frontend mulai serius. "Jalan di lokal" bernilai 0 poin.
- **C11 — Free tier saja.** Vercel (FE) + Render/Railway (BE) + Neon/Supabase
  (DB). Catat batasan free tier (cold start, sleep, kuota storage) di README.
- **C12 — Semua deadline disimpan UTC** dan ditampilkan dalam timezone
  pengguna. Deadline yang dihitung di timezone server akan merugikan siswa di
  zona lain.

### 3.3 Constraint proses

- **C13 — Satu step, satu branch.** Tidak ada pekerjaan mayor langsung di
  `main`. Lihat 1.5.
- **C14 — Commit, push, dan merge selalu minta izin dulu.** Tanpa pengecualian,
  termasuk untuk perubahan yang terlihat sepele.
- **C15 — Dilarang menyelesaikan file sekaligus.** Kerjakan hanya sebanyak yang
  dibutuhkan step berjalan (bagian 2).

### 3.4 Constraint prioritas

- **C16 — Optional features dikerjakan paling akhir.** Rubrik eksplisit: poin
  optional & unit testing **tidak dihitung** kalau ada mandatory yang belum
  beres. Dark mode sebelum flow enrollment selesai = 0 poin dark mode.
- **C17 — Kalau sebuah step macet terlalu lama**, berhenti, ambil solusi paling
  sederhana yang jalan, catat sebagai tech debt di `PROJECT-SCOPE.md`, lanjut.
- **C18 — UI tidak dipoles sebelum flow-nya lengkap.**

### 3.5 Out of scope (tulis ini di README)

Video streaming & transcoding, live class / video conference, sertifikat PDF
otomatis (kecuali diambil sebagai optional feature), forum diskusi publik,
gamifikasi (badge, leaderboard), pembayaran kursus, plagiarism checker,
proctoring ujian, aplikasi mobile native.

---

## 4. Keputusan Tech Stack (kunci di Step 1)

| Layer | Pilihan rekomendasi | Alasan singkat |
|---|---|---|
| Frontend | React + Vite + TypeScript, atau Next.js | Diminta rubrik: framework JS modern |
| Styling | Tailwind CSS | Responsive cepat (breakpoint 360/768/1280) |
| Data fetching | TanStack Query (React Query) | Loading & error state hampir gratis |
| Form | React Hook Form + Zod | Validasi FE sinkron dengan skema BE |
| Backend | Express + TypeScript (atau NestJS) | Modular routing sesuai rubrik |
| Validasi BE | Zod | Satu sumber schema, reusable |
| ORM | Prisma | Diminta eksplisit di brief |
| Database | PostgreSQL (Neon / Supabase) | Relasi banyak, butuh constraint |
| Auth | JWT (access token) + bcrypt | Cukup untuk 2 role, mudah dijelaskan |
| File (opsional) | Cloudinary / Supabase Storage | Signed URL, bukan URL publik permanen |
| Deploy FE | Vercel | Gratis, cepat |
| Deploy BE | Render / Railway | Gratis, mendukung Node + Postgres |
| Testing | Vitest (FE) + Jest/Vitest + Supertest (BE) | Untuk poin coverage |

---

## 5. Step Pengerjaan

Format tiap step: **Branch → Tujuan → Perubahan file → Task → Titik commit →
DoD → Poin rubrik → Competency guard**.

Simbol 🔒 menandai operasi yang butuh izin eksplisit sebelum dijalankan.

---

### STEP 0 — Definisi Use Case & Approval TL

**Branch:** belum ada repo kode. Simpan dokumen di folder kerja lokal dulu.

**Tujuan.** Mengunci "apa yang dibangun" sebelum satu baris kode ditulis.

**Task**

1. Tulis 1 paragraf problem statement. Contoh: "Bootcamp internal masih
   membagikan materi lewat Google Drive dan mengumpulkan tugas lewat form,
   sehingga progres tiap siswa tidak terlacak dan penilaian tercecer."
2. Tentukan 2 role dan hak akses masing-masing (tabel permission kasar).
3. Tulis daftar fitur in-scope, mapping 1:1 ke tabel Core Features di brief:
   auth & role, course/module management, enrollment & submission, progress
   tracking, re-submit/update, browse & search, dashboard.
4. Tulis daftar out-of-scope (bagian 3.5).
5. Buat sketsa user flow: flow STUDENT dan flow ADMIN.
6. **Ajukan ke TL dan tunggu approval.** Ini syarat wajib di brief.

**Output.** `docs/00-project-brief.md`, sketsa flow, approval TL (screenshot chat).

**DoD.** TL sudah menyetujui use case dan daftar fitur secara tertulis.

**Poin rubrik.** Prasyarat semua poin — tanpa approval, project bisa ditolak.
**Competency.** 1 (Requirements & Scoping), 4 (Stakeholder Management).

---

### STEP 1 — Competency Ledger & Setup Repo

**Branch:** `chore/01-project-setup` (di kedua repo, setelah commit awal `main`)

**Perubahan file**

| Repo | File | Aksi | Isi pada step ini |
|---|---|---|---|
| BE | `package.json`, `tsconfig.json` | BUAT | Dependency dasar + script `dev/build/lint` |
| BE | `.gitignore`, `.env.example` | BUAT | `.env` diblokir; `.env.example` berisi `PORT`, `DATABASE_URL` (masih kosong) |
| BE | `src/app.ts` | BUAT | Express minimal + `GET /api/health`. **Belum ada** route, error handler, atau CORS |
| BE | `src/server.ts` | BUAT | Baca `PORT`, `app.listen` |
| BE | `README.md` | BUAT | Deskripsi + status "in progress" saja |
| BE | `PROJECT-SCOPE.md` | BUAT | Ledger competency, semua status awal `unset` |
| FE | `package.json`, `vite.config.ts`, `tailwind.config.js` | BUAT | Scaffold Vite + Tailwind |
| FE | `src/App.tsx` | BUAT | Satu halaman placeholder. **Belum ada** router |
| FE | `.gitignore`, `.env.example`, `README.md` | BUAT | Sama seperti BE |

Perhatikan: `src/app.ts` sengaja dibuat kosong dari fitur. Ia akan bertambah di
Step 3, 4, 5, 6, 7, dan 9.

**Task**

1. Isi `PROJECT-SCOPE.md` memakai template guard, kategori `education`.
   Blocking: **25, 26, 16, 19, 22, 18, 48, 50, 12, 6**.
   Recommended: **23, 33, 38, 13, 10, 51, 21, 5**.
   Deferred by decision: **24 (multi-tenancy), 20 (concurrency — dibuka kalau
   ada kuota kelas terbatas atau ujian serentak), 39 (scalability)** — beserta
   trigger pembukaan kembali.
2. Buat 2 repository GitHub publik: `<nama>-lms-fe` dan `<nama>-lms-be`.
3. Siapkan kerangka folder (buat foldernya, biarkan kosong — diisi step
   berikutnya):

   ```text
   be/
     prisma/
     src/
       config/  modules/  middlewares/  utils/
   ```

   ```text
   fe/src/
     api/  components/  features/  hooks/  pages/  routes/  store/  types/  utils/
   ```

4. Pasang ESLint + Prettier + TypeScript strict di kedua repo.
5. Lindungi branch `main` di GitHub (require PR sebelum merge) kalau tersedia.

**Titik commit**

1. 🔒 `chore(setup): scaffold express app with health endpoint`
2. 🔒 `chore(setup): add eslint, prettier and strict typescript config`
3. 🔒 `docs(scope): add competency ledger for education category`
4. 🔒 push branch → 🔒 minta izin merge ke `main`

**DoD.** `npm run lint` dan `npm run build` hijau di kedua repo; `GET /api/health`
jalan di lokal.

**Poin rubrik.** Repository Management (1 + 3 + 3 = **7 poin**).
**Competency.** 42, 41, 29.

---

### STEP 2 — Data Modeling & ERD *(CHECKPOINT WAJIB)*

**Branch:** `feat/02-database-schema`

**Tujuan.** Mengunci **struktur inti** schema: entity dan relasi, terutama
enrollment, progress, dan attempt. Kolom detail masih boleh bertambah di
step-step berikutnya (aturan 2.5).

**Perubahan file**

| File | Aksi | Isi pada step ini |
|---|---|---|
| `prisma/schema.prisma` | BUAT | 8 model + relasi + enum. Kolom secukupnya, belum termasuk `isPublished`/`maxAttempts` |
| `prisma/migrations/xxx_init/` | BUAT | Migration pertama |
| `src/config/prisma.ts` | BUAT | Prisma client singleton |
| `docs/erd.png` | BUAT | Export dari dbdiagram.io |
| `docs/adr/001-progress-and-attempts.md` | BUAT | Keputusan append-only — **ditulis sebagai rencana**, buktinya menyusul di Step 7 |

**Entity inti (8 entity, jauh melebihi syarat 3 relasi):**

| Entity | Field pada step ini |
|---|---|
| `User` | id, name, email (unique), password, role, avatarUrl, timezone, createdAt |
| `Course` | id, title, slug (unique), description, category, level, thumbnailUrl, createdById (FK User) |
| `Module` | id, courseId (FK), title, order |
| `Lesson` | id, moduleId (FK), title, contentType, content, durationMinutes, order |
| `Enrollment` | id, userId (FK), courseId (FK), status, enrolledAt, completedAt — **`@@unique([userId, courseId])`** |
| `LessonProgress` | id, enrollmentId (FK), lessonId (FK), status, completedAt — **`@@unique([enrollmentId, lessonId])`** |
| `Assignment` | id, lessonId/courseId (FK), title, instructions, dueAt (UTC), maxScore |
| `Submission` | id, assignmentId (FK), userId (FK), attemptNumber, content, submittedAt, score, feedback, gradedById (FK User), gradedAt |

**Relasi (memenuhi syarat ≥3):**

- `User` 1—N `Enrollment` dan `Course` 1—N `Enrollment` → `User` **N—M**
  `Course` melalui `Enrollment` (many-to-many eksplisit)
- `Course` 1—N `Module` 1—N `Lesson` (hierarki one-to-many bertingkat)
- `Enrollment` 1—N `LessonProgress` (one-to-many)
- `Assignment` 1—N `Submission`, `User` 1—N `Submission` (one-to-many)

**Task**

1. Gambar ERD di **dbdiagram.io** — tabel, tipe data, PK/FK, kardinalitas.
   Simpan link di README dan export PNG ke `docs/erd.png`.
2. Tulis `schema.prisma` sesuai ERD. Deklarasikan constraint **di database**:
   `@unique` pada email dan slug, `@relation`, `onDelete`, `@default`.
3. Pastikan `Enrollment` punya unique `(userId, courseId)` — mencegah siswa
   terdaftar dua kali di kursus yang sama. Ini akan dipakai Step 6.
4. Tulis `docs/adr/001-progress-and-attempts.md` berisi **rencana** append-only:
   `Submission` menyimpan `attemptNumber`; submit ulang membuat baris baru,
   bukan meng-update baris lama. Tentukan aturan nilai akhir (attempt terakhir
   atau tertinggi) dan tulis alasannya. Implementasinya di Step 7.
5. **Timezone (gate #12).** Semua `DateTime` disimpan UTC; kolom `timezone` di
   `User` untuk merender deadline dengan benar.
6. Jalankan `npx prisma migrate dev --name init`.

**Titik commit**

1. 🔒 `feat(db): define core schema for course, module and lesson hierarchy`
2. 🔒 `feat(db): add enrollment, progress and submission models`
3. 🔒 `docs(adr): record append-only progress and attempt strategy`
4. 🔒 push → 🔒 minta izin merge

**DoD.** `npx prisma migrate dev` sukses; ERD punya ≥3 relasi eksplisit termasuk
satu many-to-many; ADR append-only sudah tertulis (meski belum diimplementasikan).

**Poin rubrik.** ERD 5, Data Variables & Types 5, Three Entity Relationships 5
= **15 poin**.
**Competency.** 16 ✅, 12 ✅, 17 (Migration), 19 (rencana — belum `applied`).

---

### STEP 3 — Backend Foundation: Seed & Error Contract

**Branch:** `feat/03-backend-foundation`

**Perubahan file**

| File | Aksi | Isi pada step ini |
|---|---|---|
| `src/utils/httpError.ts` | BUAT | Class `HttpError(status, message, errors?)` |
| `src/utils/apiResponse.ts` | BUAT | Helper `ok()` dan `fail()`. **Belum ada** helper pagination |
| `src/middlewares/error.ts` | BUAT | Tangkap `HttpError`, sisanya 500 generik |
| `src/middlewares/validate.ts` | BUAT | Validasi `req.body` dengan Zod. **Belum** menangani query/params |
| `src/app.ts` | **TAMBAH** | Pasang `express.json()`, handler 404, dan error handler di paling bawah |
| `prisma/seed.ts` | BUAT | Seed `User` saja (1 admin + 5–8 siswa). Course & lesson menyusul |
| `package.json` | **TAMBAH** | Script `seed` + konfigurasi `prisma.seed` |
| `.env.example` | **TAMBAH** | `DATABASE_URL` terisi contoh |

**Task**

1. Provision Postgres di Neon/Supabase. Isi `DATABASE_URL` di `.env` lokal.
2. Tetapkan **response contract** yang dipakai seluruh API:

   ```json
   { "success": true,  "message": "...", "data": {}, "meta": { "page": 1 } }
   { "success": false, "message": "...", "errors": [{ "field": "email", "message": "..." }] }
   ```

3. Semua error harus lewat `middlewares/error.ts` — tidak boleh ada stack trace
   bocor ke client.
4. Seed **data realistis** (rubrik menilai ini): nama siswa yang wajar, email
   yang masuk akal. Hindari "Test 1", "user@user.com".
5. Jalankan `npm run seed`, pastikan data masuk.

**Titik commit**

1. 🔒 `feat(core): add http error class and unified api response helper`
2. 🔒 `feat(core): add global error handler and zod body validation middleware`
3. 🔒 `feat(db): seed users with realistic data`
4. 🔒 push → 🔒 minta izin merge

**DoD.** Memanggil endpoint yang tidak ada mengembalikan JSON error rapi, bukan
HTML stack trace; `npm run seed` mengisi DB.

**Poin rubrik.** Implement Backend Database Connection 5, Database Security &
Error Handling 5 = **10 poin**.
**Competency.** 15, 14, 46 (parsial), 18 (parsial), 41.

---

### STEP 4 — Authentication & Role-Based Authorization *(CHECKPOINT WAJIB)*

**Branch:** `feat/04-auth-rbac`

**Perubahan file**

| File | Aksi | Isi pada step ini |
|---|---|---|
| `src/modules/auth/schema.ts` | BUAT | Zod schema register & login |
| `src/modules/auth/service.ts` | BUAT | `register()`, `login()`, hash bcrypt, sign JWT |
| `src/modules/auth/controller.ts` | BUAT | Tiga handler tipis |
| `src/modules/auth/route.ts` | BUAT | `POST /register`, `POST /login`, `GET /me` |
| `src/middlewares/auth.ts` | BUAT | `authenticate` + `authorize(...roles)`. **Belum ada** `requireEnrollment` |
| `src/middlewares/error.ts` | **TAMBAH** | Cabang `JsonWebTokenError` / `TokenExpiredError` → 401 |
| `src/app.ts` | **TAMBAH** | Mount `/api/auth` |
| `.env.example` | **TAMBAH** | `JWT_SECRET`, `JWT_EXPIRES_IN` |
| `prisma/seed.ts` | **UBAH** | Password user di-hash bcrypt, bukan plain text |

Ini contoh berlapis yang jelas: `error.ts` dan `app.ts` dari Step 3 bertambah,
`seed.ts` berubah perilakunya. `auth.ts` sendiri akan bertambah lagi di Step 6.

**Task**

1. `POST /api/auth/register` — bcrypt (salt rounds ≥10), email unique, role
   default `STUDENT`. Password **tidak pernah** dikembalikan.
2. `POST /api/auth/login` — verifikasi, terbitkan JWT berisi `{ id, role }`.
   `JWT_SECRET` dari env, bukan hardcode.
3. `GET /api/auth/me` — profil user dari token.
4. `authenticate` — baca `Authorization: Bearer <token>`, verifikasi, tempel
   `req.user`. Token invalid/expired → 401.
5. `authorize(...roles)` — cek `req.user.role`. Tidak berhak → 403.
6. **Identitas siswa stabil lintas perangkat (gate #25).** Login di HP dan
   laptop harus menunjuk ke user dan progres yang sama — jangan pernah
   menyimpan progres hanya di `localStorage`. Tulis catatan ini di README.

**Titik commit**

1. 🔒 `feat(auth): add register and login with bcrypt password hashing`
2. 🔒 `feat(auth): issue jwt and add authenticate middleware`
3. 🔒 `feat(auth): add role based authorize middleware`
4. 🔒 `fix(error): map jwt errors to 401 instead of 500`
5. 🔒 push → 🔒 minta izin merge

**DoD.** Diuji manual: route admin dengan token student → 403; route privat
tanpa token → 401; token kedaluwarsa → 401 (bukan 500).

**Poin rubrik.** Sign Up/Login 3, Role-based access 3, Role-based middleware 3,
Protected routes 5 = **14 poin**.
**Competency.** 25 ✅, 26 (parsial), 27 (parsial).

---

### STEP 5 — CRUD Konten: Course, Module, Lesson

**Branch:** `feat/05-course-content-crud`

**Perubahan file**

| File | Aksi | Isi pada step ini |
|---|---|---|
| `prisma/schema.prisma` | **TAMBAH** | Kolom `Course.isPublished` (migration kedua, aditif) |
| `prisma/migrations/xxx_add_course_publish_flag/` | BUAT | Migration kedua |
| `src/modules/courses/{schema,service,controller,route}.ts` | BUAT | CRUD course. List masih sederhana: tanpa filter, tanpa pagination |
| `src/modules/modules/{schema,service,controller,route}.ts` | BUAT | CRUD modul + pengaturan `order` |
| `src/modules/lessons/{schema,service,controller,route}.ts` | BUAT | CRUD lesson. **Konten masih terbuka** — gating menyusul di Step 6 |
| `src/middlewares/validate.ts` | **TAMBAH** | Dukungan validasi `req.query` dan `req.params` |
| `src/app.ts` | **TAMBAH** | Mount `/api/courses`, `/api/modules`, `/api/lessons` |
| `prisma/seed.ts` | **TAMBAH** | 4–6 kursus dengan 3–5 modul dan 3–6 lesson per modul |

Catatan penting: lesson sengaja **belum di-gating** di step ini. Gating dipasang
di Step 6 sebagai satu perubahan yang berdiri sendiri, supaya jejaknya jelas di
riwayat commit dan mudah dijelaskan saat presentasi.

**Task**

1. **Course CRUD**:

   | Method | Endpoint | Akses |
   |---|---|---|
   | GET | `/api/courses` | publik — hanya `isPublished=true` untuk non-admin |
   | GET | `/api/courses/:slug` | publik — **outline saja** |
   | POST | `/api/courses` | ADMIN |
   | PATCH | `/api/courses/:id` | ADMIN |
   | DELETE | `/api/courses/:id` | ADMIN (unpublish jika sudah ada enrollment) |

2. **Module CRUD** (nested di course) + pengaturan `order` (reorder).
3. **Lesson CRUD** (nested di module) + `order`, `contentType`, `content`.
4. Validasi server-side: judul wajib, `order` unik dalam parent, `contentType`
   sesuai enum, konten tidak kosong.
5. Status code benar: 200 baca, 201 create, 204 delete, 400 validasi, 401 auth,
   403 role, 404 tidak ada, 409 konflik.
6. **Jangan hard delete** course/lesson yang sudah punya progres siswa — pakai
   unpublish/soft delete (gate #19).

**Titik commit**

1. 🔒 `feat(db): add publish flag to course`
2. 🔒 `feat(course): add crud endpoints with admin only mutations`
3. 🔒 `feat(content): add module and lesson crud with ordering`
4. 🔒 `refactor(validate): support query and params validation`
5. 🔒 push → 🔒 minta izin merge

**DoD.** Admin bisa membangun satu kursus utuh (course → module → lesson) lewat
API tanpa menyentuh database.

**Poin rubrik.** Full CRUD ≥3 entity 5, Content Management 5, RESTful 3,
Modular routing 3.
**Competency.** 14, 18 ✅, 19 ✅, 50 (parsial).

---

### STEP 6 — Enrollment & Content Gating *(CHECKPOINT WAJIB — gate #26)*

**Branch:** `feat/06-enrollment-gating`

**Tujuan.** Ini pemisah antara "katalog kursus" dan "LMS sungguhan". Kalau
gating-nya bocor, seluruh konten bisa diambil siapa saja.

**Perubahan file**

| File | Aksi | Isi pada step ini |
|---|---|---|
| `src/modules/enrollments/{schema,service,controller,route}.ts` | BUAT | Enroll, daftar kursus saya, keluar dari kursus |
| `src/middlewares/enrollment.ts` | BUAT | `requireEnrollment` — cek `Enrollment` aktif di server |
| `src/modules/lessons/service.ts` | **UBAH** | `getLesson()` dari Step 5 diubah: konten hanya keluar setelah lolos gating |
| `src/modules/lessons/route.ts` | **TAMBAH** | Pasang `requireEnrollment` pada route detail lesson |
| `src/modules/courses/service.ts` | **TAMBAH** | `getOutline()` — struktur modul/lesson untuk siswa terdaftar |
| `src/middlewares/error.ts` | **TAMBAH** | Mapping Prisma `P2002` (enroll ganda) → 409 |
| `src/app.ts` | **TAMBAH** | Mount `/api/enrollments` |
| `prisma/seed.ts` | **TAMBAH** | Enrollment dengan progres bervariasi |
| `docs/adr/002-content-gating.md` | BUAT | Keputusan gating + hasil uji kebocoran |

`lessons/service.ts` adalah contoh **UBAH** paling jelas: fungsinya sudah ada
sejak Step 5, tapi perilakunya berubah total karena kebutuhan keamanan.

**Task**

1. `POST /api/courses/:id/enroll` — siswa mendaftar. Tolak kalau kursus belum
   dipublikasikan atau sudah terdaftar (unique constraint → 409).
2. `GET /api/enrollments/me` — daftar kursus yang diikuti.
3. `DELETE /api/enrollments/:id` — keluar dari kursus (status `DROPPED`,
   **bukan** hapus baris — riwayat belajar harus tetap ada).
4. **Middleware `requireEnrollment`** — sebelum menyajikan isi lesson, cek di
   server bahwa `Enrollment` aktif milik `req.user` untuk course tersebut.
5. `GET /api/lessons/:id` — isi lesson lengkap, **hanya** untuk siswa terdaftar
   atau admin. Ini titik paling sering bocor: jangan cuma menyembunyikan tombol
   di UI.
6. Kalau memakai file/materi terlampir: jangan pakai URL publik permanen.
   Gunakan **signed URL berumur pendek** yang dihasilkan setelah pengecekan
   enrollment (gate #22). Validasi MIME dan ukuran file di server saat upload.
7. `GET /api/courses/:id/outline` — struktur untuk siswa terdaftar.

**Titik commit**

1. 🔒 `feat(enrollment): add enroll and drop endpoints`
2. 🔒 `feat(enrollment): add requireEnrollment middleware`
3. 🔒 `fix(lesson): block lesson content for unenrolled students`
4. 🔒 `fix(error): translate duplicate enrollment into 409 conflict`
5. 🔒 `docs(adr): record content gating decision and leak test result`
6. 🔒 push → 🔒 minta izin merge

**DoD.** Diuji manual: siswa **belum** terdaftar memanggil
`GET /api/lessons/<id>` → 403. Salin URL materi milik siswa terdaftar, buka
tanpa token → ditolak/kedaluwarsa. Tempel hasil uji ini di
`docs/adr/002-content-gating.md` sebagai bukti #26.

**Poin rubrik.** User Interaction Flow 3.
**Competency.** 26 ✅ (dengan bukti), 22 ✅.

---

### STEP 7 — Progress Tracking & Assignment Submission

**Branch:** `feat/07-progress-and-submission`

**Perubahan file**

| File | Aksi | Isi pada step ini |
|---|---|---|
| `prisma/schema.prisma` | **TAMBAH** | `Assignment.maxAttempts`, enum `SubmissionStatus` (migration ketiga) |
| `src/modules/progress/{service,controller,route}.ts` | BUAT | Tandai lesson selesai + baca progres. Rumus persentase **sengaja ditulis inline dulu** |
| `src/modules/assignments/{schema,service,controller,route}.ts` | BUAT | CRUD assignment (admin) |
| `src/modules/submissions/{schema,service,controller,route}.ts` | BUAT | Submit (append-only), riwayat, penilaian |
| `src/modules/enrollments/service.ts` | **TAMBAH** | Status `COMPLETED` otomatis saat semua lesson selesai |
| `src/app.ts` | **TAMBAH** | Mount `/api/progress`, `/api/assignments`, `/api/submissions` |
| `prisma/seed.ts` | **TAMBAH** | Assignment + submission (campuran belum dinilai / sudah dinilai) |
| `docs/adr/001-progress-and-attempts.md` | **TAMBAH** | Rencana Step 2 menjadi bukti implementasi |

**Task**

1. `POST /api/lessons/:id/complete` — tandai lesson selesai:
   - Upsert `LessonProgress` dengan unique `(enrollmentId, lessonId)` —
     idempoten, memanggil dua kali tidak menggandakan baris.
   - Hitung ulang persentase progres (**tulis inline di `progress/service.ts`**
     dulu — akan dipindahkan di Step 12).
   - Kalau semua lesson selesai, set `Enrollment.status = COMPLETED` +
     `completedAt`.
   - **Jangan menulis progres pada setiap detik/scroll** — hanya pada aksi
     eksplisit "tandai selesai". Menulis progres tiap keystroke akan menghajar
     database.
2. `GET /api/enrollments/:id/progress` — detail progres per modul/lesson.
3. `POST /api/assignments/:id/submissions` — siswa mengumpulkan tugas:
   - Server menentukan `attemptNumber` = jumlah submission sebelumnya + 1
   - Tolak kalau `attemptNumber > maxAttempts`
   - Tandai `LATE` kalau `submittedAt > dueAt` (bandingkan dalam UTC)
   - **Selalu buat baris baru**, tidak pernah menimpa (gate #19)
4. `GET /api/submissions/me` — riwayat pengumpulan siswa sendiri.
5. `PATCH /api/submissions/:id/grade` — ADMIN memberi `score` + `feedback`.
   Validasi `0 ≤ score ≤ maxScore` **di server**.
6. `GET /api/assignments/:id/submissions` — ADMIN: semua submission untuk satu
   assignment.
7. Kalau menambahkan kuis: **kunci jawaban tidak pernah dikirim ke client** dan
   skor dihitung di server (gate #18).

**Titik commit**

1. 🔒 `feat(db): add max attempts and submission status enum`
2. 🔒 `feat(progress): mark lesson complete and recalculate enrollment progress`
3. 🔒 `feat(assignment): add assignment crud for admin`
4. 🔒 `feat(submission): add append-only submission with attempt numbering`
5. 🔒 `feat(submission): add grading endpoint with server side score validation`
6. 🔒 push → 🔒 minta izin merge

**DoD.** Submit ulang menghasilkan attempt baru, attempt lama tetap terlihat di
riwayat; persentase progres berubah benar setelah menyelesaikan lesson;
mengumpulkan melewati `maxAttempts` ditolak dengan pesan jelas.

**Poin rubrik.** Tracking & Status 5, Update or Cancel Action (re-submit) 5
= **10 poin**.
**Competency.** 19 ✅, 18 ✅.

---

### STEP 8 — Browse, Search & Filter

**Branch:** `feat/08-search-filter`

**Perubahan file**

| File | Aksi | Isi pada step ini |
|---|---|---|
| `src/modules/courses/schema.ts` | **TAMBAH** | Zod schema untuk query filter |
| `src/modules/courses/service.ts` | **UBAH** | `listCourses()` dari Step 5 dirombak: filter, sort, pagination, flag `isEnrolled` |
| `src/utils/apiResponse.ts` | **TAMBAH** | Helper `paginated()` yang mengisi `meta` |
| `prisma/schema.prisma` | **TAMBAH** | Index untuk `category`, `level`, `dueAt` (migration keempat) |

`listCourses()` adalah contoh **UBAH**: fungsinya sudah ada sejak Step 5, tapi
perilakunya diganti karena kebutuhan baru.

**Task**

1. `GET /api/courses` mendukung `?q=` (judul/deskripsi), `?category=`,
   `?level=`, `?sort=newest|title|popular`, `?page=&limit=`.
2. Untuk siswa yang login, sertakan flag `isEnrolled` per kursus agar UI bisa
   menampilkan "Lanjutkan" vs "Daftar".
3. Response menyertakan `meta`: `total`, `page`, `limit`, `totalPages`.
4. Pastikan kolom filter ter-index.
5. Rubrik memberi 5 poin tambahan untuk **advanced search filters**
   (kategori/level/status) — kombinasi di atas sudah memenuhi.

**Titik commit**

1. 🔒 `feat(course): add search, filter and sorting to course listing`
2. 🔒 `feat(core): add pagination meta helper to api response`
3. 🔒 `perf(db): add indexes for course filter columns`
4. 🔒 push → 🔒 minta izin merge

**DoD.** Filter bisa dikombinasikan (`?q=sql&category=data&level=beginner`) dan
menghasilkan data yang benar.

**Poin rubrik.** Browse & Search 3 (+5 optional Advanced Filters).
**Competency.** 21 (level dasar — cukup untuk skala ini), 15.

---

### STEP 9 — Deploy Backend *(CHECKPOINT WAJIB)*

**Branch:** `chore/09-deploy-backend`

**Perubahan file**

| File | Aksi | Isi pada step ini |
|---|---|---|
| `src/app.ts` | **TAMBAH** | `helmet`, CORS whitelist, rate limiter pada `/api/auth` dan endpoint submission |
| `src/middlewares/error.ts` | **UBAH** | Stack trace hanya muncul saat `NODE_ENV !== "production"` |
| `src/config/env.ts` | BUAT | Validasi env saat boot — gagal cepat kalau ada yang kurang |
| `src/server.ts` | **UBAH** | Panggil `env.ts` sebelum `listen` |
| `package.json` | **TAMBAH** | Script `start` + `prisma migrate deploy` di build command |
| `.env.example` | **TAMBAH** | `CORS_ORIGIN`, `NODE_ENV`, kredensial storage jika ada |
| `docs/runbook-restore.md` | BUAT | Langkah restore backup yang sudah benar-benar dicoba |
| `README.md` | **TAMBAH** | Link deployment BE + catatan limit free tier |

**Task**

1. Deploy ke Render/Railway. Set env var di dashboard.
2. `prisma migrate deploy` di build/start command — jangan `migrate dev`.
3. CORS ke origin frontend saja, bukan `*`.
4. `helmet` + HTTPS enforced (gate #27).
5. Rate limiting pada `/api/auth/*` dan endpoint submission.
6. Jalankan seed sekali di database produksi.
7. **Backup & restore (gate #48 — kritis untuk LMS).** Data progres tidak bisa
   direkonstruksi dari mana pun. Aktifkan backup otomatis, lalu **lakukan satu
   kali restore percobaan** dan catat langkahnya di `docs/runbook-restore.md`.
   Tanpa restore yang benar-benar diuji, status competency ini tetap `deferred`.
8. Catat perkiraan biaya & limit free tier (termasuk kuota storage) di README
   (competency #5).

**Titik commit**

1. 🔒 `feat(security): add helmet, cors whitelist and rate limiting`
2. 🔒 `feat(config): validate environment variables on boot`
3. 🔒 `fix(error): hide stack trace in production responses`
4. 🔒 `docs(ops): add tested database restore runbook`
5. 🔒 push → 🔒 minta izin merge

**DoD.** `GET /api/health` dari internet mengembalikan 200; register → login →
enroll → complete lesson → submit assignment berhasil lewat URL produksi.

**Poin rubrik.** BE deployed 3 poin.
**Competency.** 35, 27 ✅, 28 ✅, 48 ✅, 29 ✅.

---

### STEP 10 — Frontend Foundation

**Branch:** `feat/10-frontend-foundation`

**Perubahan file**

| File | Aksi | Isi pada step ini |
|---|---|---|
| `src/api/client.ts` | BUAT | Axios instance + `baseURL`. **Belum ada** interceptor |
| `src/api/client.ts` | **TAMBAH** | Interceptor request (Bearer token) dan response (401 → logout) |
| `src/store/auth.tsx` | BUAT | Context: token, user, `login`, `logout`, persist ke `localStorage` |
| `src/components/ui/Button.tsx` | BUAT | Variant `primary` dan `secondary` saja. **Belum ada** state loading |
| `src/components/ui/Input.tsx` | BUAT | Input + label + pesan error |
| `src/components/layout/AppLayout.tsx` | BUAT | Header + slot konten. **Belum ada** sidebar |
| `src/routes/index.tsx` | BUAT | Route publik + `ProtectedRoute`. **Belum ada** route admin |
| `src/pages/{Login,Register}.tsx` | BUAT | Form terhubung ke API produksi |
| `src/App.tsx` | **UBAH** | Placeholder Step 1 diganti router |
| `src/utils/datetime.ts` | BUAT | `formatDate()` sederhana. Konversi timezone menyusul Step 11 |
| `.env.example` | **TAMBAH** | `VITE_API_BASE_URL` |

Perhatikan `Button.tsx`: dibuat minimal di sini, ditambah `isLoading` di Step 11,
ditambah variant `danger` di Step 12. Jangan buat ketiganya sekarang.

**Task**

1. Setup Vite + React + TS + Tailwind + React Router + TanStack Query.
2. `client.ts` membaca `VITE_API_BASE_URL`; interceptor response menangani 401
   (logout + redirect) dan 403.
3. Auth store menyimpan token di `localStorage`; dokumentasikan trade-off-nya
   di README.
4. Routing tahap ini: `/`, `/login`, `/register`, `/courses`, `/courses/:slug`,
   plus `ProtectedRoute` untuk `/dashboard` (halaman masih kosong).
5. Layout responsif dasar: topbar yang runtuh jadi drawer di mobile.

**Titik commit**

1. 🔒 `feat(fe): scaffold router, tailwind and app layout`
2. 🔒 `feat(fe): add axios client with auth token interceptor`
3. 🔒 `feat(auth): add login and register pages wired to live api`
4. 🔒 `feat(ui): add base button and input components`
5. 🔒 push → 🔒 minta izin merge

**DoD.** Login di FE memakai backend produksi; refresh halaman tidak
menghilangkan sesi; siswa membuka route terproteksi diarahkan keluar.

**Poin rubrik.** Prasyarat semua poin FE.
**Competency.** 7, 9 ✅, 25 (sisi klien).

---

### STEP 11 — Frontend: Flow STUDENT

**Branch:** `feat/11-student-flow`

**Perubahan file**

| File | Aksi | Isi pada step ini |
|---|---|---|
| `src/api/client.ts` | **TAMBAH** | Normalisasi error backend jadi bentuk seragam untuk UI |
| `src/components/ui/Button.tsx` | **TAMBAH** | Prop `isLoading` (spinner + disabled) |
| `src/components/ui/{Modal,Badge,Spinner,EmptyState,ErrorState,Pagination,ProgressBar,Accordion}.tsx` | BUAT | Komponen dibuat saat pertama kali dibutuhkan, bukan diborong di awal |
| `src/features/courses/api.ts` | BUAT | Query katalog, detail, outline; mutation enroll |
| `src/features/learning/api.ts` | BUAT | Query lesson, mutation tandai selesai |
| `src/features/assignments/api.ts` | BUAT | Query assignment & submission, mutation submit |
| `src/pages/{Courses,CourseDetail}.tsx` | BUAT | Katalog + detail sebelum enroll |
| `src/pages/Learn.tsx` | BUAT | Halaman belajar + sidebar lesson |
| `src/pages/{Dashboard,Assignments}.tsx` | BUAT | Dashboard siswa & halaman tugas |
| `src/routes/index.tsx` | **TAMBAH** | Route `STUDENT` |
| `src/utils/datetime.ts` | **TAMBAH** | Konversi UTC → timezone pengguna + label zona + penanda deadline lewat |
| `src/components/layout/AppLayout.tsx` | **TAMBAH** | Menu navigasi untuk siswa login |

**Task**

1. **Katalog kursus**: grid kartu, search bar, filter (kategori, level),
   pagination. Skeleton loading, empty state, error state + tombol retry.
2. **Detail kursus (sebelum enroll)**: deskripsi, outline modul/lesson (judul
   saja, konten terkunci), tombol Daftar.
3. **Halaman belajar** (`/learn/:courseSlug/:lessonId`): sidebar daftar lesson
   dengan indikator selesai, konten lesson, tombol "Tandai Selesai", navigasi
   Sebelumnya/Berikutnya, progress bar kursus.
4. **Dashboard siswa**: kursus aktif dengan progress bar, tugas mendatang
   beserta deadline (dalam timezone pengguna, dengan label zona), ringkasan
   statistik.
5. **Halaman tugas**: daftar assignment, status (Belum dikumpulkan / Dikumpulkan
   / Dinilai / Terlambat), form pengumpulan, riwayat attempt beserta nilai dan
   feedback.
6. Validasi form dengan RHF + Zod; tombol submit `isLoading`.
7. Modal konfirmasi untuk aksi penting (keluar dari kursus, kumpulkan tugas).
   Toast sukses/gagal untuk setiap mutasi. Deadline yang sudah lewat ditampilkan
   dengan jelas.

**Titik commit**

1. 🔒 `feat(course): add catalog page with search and filters`
2. 🔒 `feat(course): add course detail with locked outline preview`
3. 🔒 `feat(learning): add lesson player with completion tracking`
4. 🔒 `feat(assignment): add submission form with attempt history`
5. 🔒 `feat(ui): add loading state to button component`
6. 🔒 push → 🔒 minta izin merge

**DoD.** Diuji di lebar 360px, 768px, 1280px tanpa horizontal scroll; setiap
pemanggilan API punya tiga state (loading, error, empty) yang terlihat.

**Poin rubrik.** Responsive UI 3, Error handling & loading states 5, dan
mendukung poin core feature.
**Competency.** 8 ✅, 46 ✅, 12 (rendering), 13, 10 (parsial).

---

### STEP 12 — Frontend: Flow ADMIN *(step refactor)*

**Branch:** `feat/12-admin-flow`

**Perubahan file**

| Repo | File | Aksi | Isi pada step ini |
|---|---|---|---|
| BE | `src/modules/progress/calculator.ts` | BUAT | Rumus persentase progres, **dipindahkan dari `progress/service.ts`** |
| BE | `src/modules/progress/service.ts` | **KURANGI** | Rumus inline dari Step 7 dihapus, diganti panggilan ke `calculator.ts` |
| BE | `src/modules/admin/service.ts` | BUAT | Statistik dashboard + enroll manual, memakai `calculator.ts` yang sama |
| FE | `src/components/ui/Table.tsx` | BUAT | Tabel generik, **mengambil alih** markup tabel yang sebelumnya ditulis manual |
| FE | `src/pages/Assignments.tsx` | **KURANGI** | Markup tabel manual dari Step 11 dihapus, diganti `<Table>` |
| FE | `src/components/ui/Button.tsx` | **TAMBAH** | Variant `danger` untuk aksi hapus |
| FE | `src/components/layout/AdminLayout.tsx` | BUAT | Sidebar admin |
| FE | `src/features/admin/api.ts` | BUAT | Query & mutation khusus admin |
| FE | `src/pages/admin/{Dashboard,Courses,CourseBuilder,Assignments,Grading,Students}.tsx` | BUAT | Halaman admin |
| FE | `src/routes/index.tsx` | **TAMBAH** | Route `ADMIN` + `RoleRoute` |

Step ini sengaja dirancang sebagai **step refactor** di kedua sisi — lihat
bagian 2.2. Backend: rumus progres diekstrak karena kini dibutuhkan dua tempat.
Frontend: `Table.tsx` menyerap duplikasi dari halaman yang sudah ada.

**Task**

1. **Dashboard admin**: statistik (total kursus, total siswa, enrollment aktif,
   submission menunggu penilaian), daftar submission terbaru.
2. **Manajemen kursus**: tabel dengan Create / Edit / Delete (modal form),
   toggle publish/unpublish, konfirmasi hapus.
3. **Course builder**: kelola modul & lesson dalam satu halaman — tambah modul,
   tambah lesson, ubah urutan, edit konten.
4. **Manajemen assignment**: buat/ubah tugas, atur `dueAt`, `maxScore`,
   `maxAttempts`.
5. **Penilaian**: daftar submission per assignment, buka detail, beri nilai +
   feedback, lihat semua attempt siswa.
6. **Manajemen siswa** (gate #50): lihat daftar siswa, enroll manual, koreksi
   progres, lihat riwayat belajar. Koreksi data rutin harus bisa dilakukan tanpa
   membuka database client.
7. Pastikan **perbedaan tampilan antar role terlihat jelas** — rubrik meminta
   screenshot yang membuktikan hak akses berbeda.

**Titik commit**

1. 🔒 `refactor(progress): extract completion calculation into helper`
2. 🔒 `refactor(ui): extract reusable table component`
3. 🔒 `feat(admin): add dashboard with learning statistics`
4. 🔒 `feat(admin): add course builder for modules and lessons`
5. 🔒 `feat(admin): add grading page and manual enrollment`
6. 🔒 push → 🔒 minta izin merge

**DoD.** Satu kursus utuh bisa dibuat dari nol lewat UI, lalu tugas siswa bisa
dinilai lewat UI, tanpa menyentuh database. `progress/service.ts` lebih pendek
dari akhir Step 7.

**Poin rubrik.** 2 distinct roles 3, Dashboard 3, Content Management 5.
**Competency.** 50 ✅.

---

### STEP 13 — Deploy Frontend & Integrasi Penuh

**Branch:** `chore/13-deploy-frontend`

**Perubahan file**

| File | Aksi | Isi pada step ini |
|---|---|---|
| `src/api/client.ts` | **UBAH** | Timeout dinaikkan + pesan khusus saat backend cold start |
| `src/components/layout/AppLayout.tsx` | **TAMBAH** | Indikator "menghubungkan ke server" untuk request pertama |
| `vercel.json` | BUAT | Rewrite SPA agar refresh di route dalam tidak 404 |
| BE `src/app.ts` | **UBAH** | `CORS_ORIGIN` diarahkan ke domain Vercel |
| `README.md` (FE & BE) | **TAMBAH** | Link kedua deployment + skor Lighthouse |

**Task**

1. Deploy ke Vercel, set `VITE_API_BASE_URL` ke URL backend produksi.
2. Update `CORS_ORIGIN` backend, redeploy backend.
3. Uji **seluruh** flow di produksi: register, login, browse, enroll, belajar,
   tandai selesai, kumpul tugas, admin menilai, logout.
4. Uji di HP sungguhan, bukan hanya devtools.
5. Perbaiki masalah khas produksi: cold start Render, mixed content, trailing
   slash, env yang lupa di-set.
6. Jalankan Lighthouse pada deployment; catat skornya di README.

**Titik commit**

1. 🔒 `chore(deploy): add spa rewrite config for vercel`
2. 🔒 `fix(api): raise timeout and handle backend cold start`
3. 🔒 `docs(readme): add deployment links and lighthouse score`
4. 🔒 push → 🔒 minta izin merge

**DoD.** Orang lain bisa membuka link, mendaftar, enroll, dan mengumpulkan tugas
tanpa bantuanmu. Rubrik: **deployment yang rusak tidak diberi poin.**

**Poin rubrik.** FE deployed 3.
**Competency.** 35 ✅, 13 ✅.

---

### STEP 14 — Dokumentasi (Kedua Repo)

**Branch:** `docs/14-final-documentation`

**Perubahan file**

| File | Aksi | Isi pada step ini |
|---|---|---|
| BE `README.md` | **UBAH** | Dirombak dari catatan bertahap menjadi dokumen utuh |
| BE `docs/api.md` | BUAT | Daftar seluruh endpoint + contoh request/response |
| FE `README.md` | **UBAH** | Dirombak + sisipkan screenshot |
| `docs/screenshots/` | **TAMBAH** | Rapikan koleksi dari Step 1–13 |
| `PROJECT-SCOPE.md` | **UBAH** | Semua competency diberi status final |
| `docs/policy.md` | BUAT | Lisensi konten & catatan data siswa |

**README Backend wajib memuat:** deskripsi & problem statement, daftar fitur,
tech stack, instalasi & cara pakai (clone → install → `.env` → migrate → seed →
dev), link deployment FE **dan** BE, **daftar seluruh API endpoint** dengan
method/path/akses role/contoh request & response, **link ERD** + gambar,
struktur folder, dan catatan keputusan penting (append-only submission, cara
menghitung progres, strategi content gating, timezone deadline).

**README Frontend wajib memuat:** lima poin pertama di atas, plus
**screenshot/GIF semua fitur utama dari kedua role** (rubrik 3 poin), plus
daftar halaman & role yang bisa mengaksesnya.

**Titik commit**

1. 🔒 `docs(api): document all endpoints with request and response examples`
2. 🔒 `docs(readme): rewrite backend readme with setup and architecture`
3. 🔒 `docs(readme): add feature screenshots for both roles`
4. 🔒 `docs(policy): publish content licensing and student data notice`
5. 🔒 push → 🔒 minta izin merge

**DoD.** Orang asing bisa menjalankan project dari nol hanya dengan README.

**Poin rubrik.** Documentation total **13 poin** (deskripsi 1, fitur 1, stack 1,
instalasi 1, link 1, screenshot 3, ERD 5).
**Competency.** 2 ✅, 3 ✅, 6 ✅.

---

### STEP 15 — Unit Testing *(hanya setelah semua mandatory beres)*

**Branch:** `test/15-unit-tests`

**Prasyarat mutlak.** Rubrik: poin unit testing tidak dihitung kalau ada
mandatory yang belum terpenuhi. Cek dulu bagian 6 (PREFLIGHT).

**Perubahan file**

| File | Aksi | Isi pada step ini |
|---|---|---|
| BE `vitest.config.ts` / `jest.config.ts` | BUAT | Konfigurasi + coverage threshold |
| BE `src/modules/progress/calculator.test.ts` | BUAT | Unit test rumus progres — mudah karena sudah diekstrak di Step 12 |
| BE `src/modules/auth/auth.test.ts` | BUAT | Integration test register/login/RBAC |
| BE `src/modules/enrollments/gating.test.ts` | BUAT | Integration test: siswa belum enroll → 403 |
| BE `src/modules/submissions/submission.test.ts` | BUAT | Attempt numbering, penolakan melebihi `maxAttempts`, deteksi terlambat |
| BE `src/middlewares/error.ts` | **KURANGI** | `console.log` debug dibuang, diganti logger terstruktur |
| FE `src/**/*.test.tsx` | BUAT | Test komponen & util |
| `.github/workflows/ci.yml` | BUAT | Lint + typecheck + test setiap push |
| `README.md` | **TAMBAH** | Screenshot & angka coverage |

**Task**

1. **Backend** (target >75% = 5 poin, + 3 poin pelaporan): unit test kalkulator
   progres, penentuan `attemptNumber`, deteksi terlambat, validasi rentang skor;
   integration test dengan Supertest (auth, RBAC 401/403, **content gating**,
   CRUD course, submission flow).
2. **Frontend** (target >75% = 5 poin, + 3 poin pelaporan): Vitest + React
   Testing Library — `ProgressBar`, form pengumpulan, badge status, empty/error
   state, util format deadline & konversi timezone.
3. Laporkan coverage di README kedua repo.

**Titik commit**

1. 🔒 `test(progress): cover completion calculation with unit tests`
2. 🔒 `test(auth): add integration tests for auth and rbac`
3. 🔒 `test(enrollment): verify unenrolled students cannot read lesson content`
4. 🔒 `ci: run lint, typecheck and tests on every push`
5. 🔒 `docs(readme): report test coverage results`
6. 🔒 push → 🔒 minta izin merge

**Poin rubrik.** Sampai **16 poin** (8 FE + 8 BE).
**Competency.** 43 ✅, 37 ✅.

---

### STEP 16 — Optional Features

**Branch:** satu branch per fitur — `feat/16a-advanced-filter`,
`feat/16b-profile-edit`, dan seterusnya. Jangan menumpuk beberapa fitur opsional
dalam satu branch.

| Prioritas | Fitur | Poin | Kenapa didahulukan |
|---|---|---|---|
| 1 | Advanced search filters | 5 | Hampir selesai dari Step 8 |
| 2 | Edit user profile | 3 | CRUD sederhana |
| 3 | Notification system (toast + email mock) | 7 | Toast sudah ada; tambah email pengingat deadline |
| 4 | Dark mode | 3 | **Harus menyeluruh** di semua komponen, bukan tombol dekoratif |
| 5 | File upload (tugas berupa file / avatar) | 5 | Cloudinary/Supabase; validasi MIME & ukuran di server, akses via signed URL |
| 6 | Export data (CSV/PDF nilai) | 7 | Rekap nilai per kursus → CSV; nilainya tinggi |
| 7 | Email verification | 7 | Butuh SMTP (Resend/Mailtrap) |
| 8 | OAuth Google | 7 | Effort menengah, terlihat profesional |
| 9 | Multi-language (ID/EN) | 7 | i18next; harus menyeluruh |
| 10 | Sertifikat kelulusan (PDF) | — | Bagus untuk demo; masuk kategori export |
| 11 | Real-time notification (WebSocket) | 7 | **Mengaktifkan modifier `+realtime`** — buka ulang scope dulu |
| 12 | Diskusi/komentar per lesson | 3–5 | **Mengaktifkan modifier `+public-ugc`** — butuh moderasi & rate limiting |
| 13 | Integrasi LLM (asisten belajar) | 7 | **Mengaktifkan modifier `+ai`** — butuh cost ceiling, validasi output, review prompt injection |

**Aturan.** Satu fitur diselesaikan penuh (BE → FE → dokumentasi → merge) sebelum
mulai fitur berikutnya. Lima fitur setengah jadi bernilai lebih rendah daripada
dua fitur yang matang, dan lebih sulit dipertahankan saat ditanya penguji.

Setiap fitur tetap melewati gerbang izin commit/push/merge.

---

### STEP 17 — PREFLIGHT & Persiapan Presentasi

**Branch:** `docs/17-presentation`

**Task**

1. Jalankan checklist PREFLIGHT (bagian 6) — verifikasi terhadap **kode**, bukan
   terhadap catatan.
2. Siapkan slide (10–12 slide): problem → target user → solusi → demo flow →
   arsitektur → ERD → keputusan teknis → tantangan & solusi → rencana
   pengembangan.
3. Siapkan **demo skenario**, bukan demo eksploratif:
   - login sebagai STUDENT → cari kursus → enroll → belajar 2 lesson → progress
     bar naik → kumpulkan tugas → lihat status
   - login sebagai ADMIN → buat kursus + modul + lesson → nilai tugas siswa tadi
   - kembali sebagai STUDENT → lihat nilai & feedback masuk
4. Siapkan akun demo (`student@demo.com` / `admin@demo.com`) dan tulis di slide.
5. Latih demo minimal 2 kali dengan timer. Siapkan video/GIF cadangan kalau
   deployment sedang lambat.
6. **Siapkan riwayat git sebagai alat bantu presentasi.** `git log --oneline
   --graph` yang menunjukkan branch per step adalah bukti kuat bahwa proyek ini
   dikerjakan bertahap. Siapkan satu slide berisi tangkapan layarnya.
7. Siapkan jawaban **pitching bisnis** (`Pitching Preparation.md`):
   - **User & Market Fit** — siapa penggunanya, pain point konkret, pembeda
     dibanding Google Classroom/Drive + Form
   - **Feature Prioritization** — fitur mana paling kritis (progress tracking &
     penilaian) dan kenapa; fitur mana yang pertama dipotong kalau waktu mepet
   - **Customer Journey & Retention** — onboarding siswa baru, apa yang membuat
     mereka bertahan (progres tersimpan, feedback instruktur, sertifikat)
   - **Operational & Scalability** — apa yang patah saat traffic melonjak (biaya
     penyimpanan/egress materi, koneksi DB, cold start) dan fungsi bisnis yang
     dibutuhkan (support siswa, kurator konten)
   - **Sustainable Growth** — strategi jangka panjang & keunggulan kompetitif
8. Siapkan jawaban teknis yang pasti ditanya:
   - "Bagaimana kamu memastikan siswa yang belum enroll tidak bisa mengakses
     materi?" → middleware `requireEnrollment` + hasil uji di ADR 002
   - "Kalau siswa mengumpulkan ulang, ke mana submission lama?" → append-only
     dengan `attemptNumber`
   - "Kenapa deadline disimpan UTC?"
   - "Kenapa rumus progres dipindah ke `calculator.ts`?" → jawab dengan alasan
     nyata di Step 12, bukan alasan teoretis
   - "Bagaimana progres dihitung, dan kenapa tidak disimpan di localStorage?"

**Titik commit**

1. 🔒 `docs(scope): final competency audit before submission`
2. 🔒 push → 🔒 minta izin merge

**Poin rubrik.** Presentation **14 poin** (overview 3, demo 3, penjelasan
keputusan 5, visual aids 3).

---

## 6. PREFLIGHT — Checklist Sebelum Menyatakan "Selesai"

Semua gate blocking kategori `education` harus `applied` dengan bukti nyata.
Jangan tandai berdasarkan niat.

| # | Competency | Bar yang harus dipenuhi | Bukti |
|---|---|---|---|
| 25 | Authentication | Identitas siswa stabil lintas perangkat | JWT + uji login di 2 device |
| 26 | Permissions & Access Control | Gating enrollment ditegakkan di server; URL konten tidak bisa ditebak | `middlewares/enrollment.ts` + hasil uji di ADR 002 |
| 16 | Data Modeling | Course, module, lesson, enrollment, progress, attempt dimodelkan eksplisit | `schema.prisma` + ERD |
| 19 | Data Lifecycle | Progres & penilaian append-only, tidak pernah ditimpa diam-diam | `attemptNumber` di `Submission` |
| 22 | File & Media | Akses materi ter-scope (signed URL); biaya penyimpanan dipahami | Kalau tanpa file → `n/a` dengan alasan; kalau ada → bukti signed URL |
| 18 | Data Validation | Submission & skor divalidasi di server; skor tidak dihitung di client | Zod schema + service |
| 48 | Backup & Recovery | Backup otomatis **dan** satu restore yang benar-benar diuji | `docs/runbook-restore.md` |
| 50 | Admin / Back-office | Enroll manual, koreksi progres, penilaian ulang | Halaman `/admin/*` |
| 12 | Timezone | Deadline benar per timezone siswa | UTC di DB + util konversi |
| 6 | Legal & Compliance | Lisensi konten & catatan data siswa dinyatakan | `docs/policy.md` |

**Checklist penyerahan**

- [ ] Dua repo publik, terpisah, folder rapi, commit deskriptif
- [ ] Riwayat git menunjukkan branch per step, bukan satu commit raksasa
- [ ] `main` bersih dan bisa di-deploy; tidak ada push langsung ke `main`
- [ ] Kedua deployment hidup dan sudah diuji dari perangkat lain
- [ ] Semua flow diuji di **produksi**, bukan lokal
- [ ] Seed data realistis (kursus & nama yang wajar, bukan "Course 1")
- [ ] Screenshot kedua role lengkap di README
- [ ] ERD dengan ≥3 relasi (termasuk many-to-many) ter-link di dokumentasi
- [ ] `.env` tidak pernah masuk git history
- [ ] Semua competency punya status di `PROJECT-SCOPE.md` — tidak ada `unset`
- [ ] Kamu bisa menjelaskan **setiap file** di kedua repo

**Aturan penutup.** Kalau ada satu saja gate blocking yang belum `applied`,
project belum boleh disebut selesai. Menunda sebuah gate itu sah — asalkan
tercatat sebagai `deferred` beserta alasan dan pemicunya, bukan didiamkan.

---

## 7. Peta Poin Rubrik → Step

| Kelompok | Poin | Step |
|---|---|---|
| Repository Management | 7 | 1 |
| Documentation | 13 | 14 |
| Front-end Application | 14 | 10–13 |
| Back-end Development | 14 | 3, 5, 7, 9 |
| Database Connection | 15 | 2, 3 |
| Auth & Authorization | 13 | 4, 6, 9 |
| Core Feature Implementation | 30 | 4–8, 11, 12 |
| Presentation | 14 | 17 |
| **Subtotal mandatory** | **120** | |
| Unit Testing (FE + BE) | 16 | 15 |
| Optional Features | s.d. 84 | 16 |

---

## 8. Peta Evolusi File Lintas Step

Rujukan cepat untuk memastikan tidak ada file yang "selesai sekaligus".

**Backend**

| File | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 12 | 15 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `src/app.ts` | BUAT | | TAMBAH | TAMBAH | TAMBAH | TAMBAH | TAMBAH | | TAMBAH | | |
| `prisma/schema.prisma` | | BUAT | | | TAMBAH | | TAMBAH | TAMBAH | | | |
| `src/middlewares/error.ts` | | | BUAT | TAMBAH | | TAMBAH | | | UBAH | | KURANGI |
| `src/middlewares/validate.ts` | | | BUAT | | TAMBAH | | | | | | |
| `src/middlewares/auth.ts` | | | | BUAT | | | | | | | |
| `src/middlewares/enrollment.ts` | | | | | | BUAT | | | | | |
| `src/utils/apiResponse.ts` | | | BUAT | | | | | TAMBAH | | | |
| `prisma/seed.ts` | | | BUAT | UBAH | TAMBAH | TAMBAH | TAMBAH | | | | |
| `src/modules/courses/service.ts` | | | | | BUAT | TAMBAH | | UBAH | | | |
| `src/modules/lessons/service.ts` | | | | | BUAT | UBAH | | | | | |
| `src/modules/progress/service.ts` | | | | | | | BUAT | | | KURANGI | |
| `src/modules/progress/calculator.ts` | | | | | | | | | | BUAT | TEST |

**Frontend**

| File | 10 | 11 | 12 | 13 |
|---|---|---|---|---|
| `src/api/client.ts` | BUAT + TAMBAH | TAMBAH | | UBAH |
| `src/components/ui/Button.tsx` | BUAT | TAMBAH | TAMBAH | |
| `src/components/ui/Table.tsx` | | | BUAT | |
| `src/pages/Assignments.tsx` | | BUAT | KURANGI | |
| `src/routes/index.tsx` | BUAT | TAMBAH | TAMBAH | |
| `src/utils/datetime.ts` | BUAT | TAMBAH | | |
| `src/components/layout/AppLayout.tsx` | BUAT | TAMBAH | | TAMBAH |

---

## 9. Jebakan Khas Kategori Education (hafalkan)

1. **URL materi publik dan permanen** — kursus bocor sehari setelah rilis.
   Selalu cek enrollment di server sebelum menyajikan konten.
2. **Kunci jawaban kuis dikirim ke client** untuk dinilai di browser. Penilaian
   selalu di server.
3. **Menulis progres pada setiap keystroke/scroll**, menghajar database. Tulis
   hanya pada aksi eksplisit.
4. **Logika deadline memakai timezone server**, merugikan siswa di zona lain.
5. **Menimpa nilai atau submission lama** — riwayat pembelajaran tidak bisa
   direkonstruksi setelah hilang.

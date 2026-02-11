# Panduan Deployment ke Vercel

Panduan ini menjelaskan cara deploy aplikasi Next.js ini ke Vercel, baik melalui GitHub Actions (otomatis) maupun manual.

## 📋 Prasyarat

1. Akun Vercel (daftar di [vercel.com](https://vercel.com))
2. Akun GitHub dengan repository yang sudah di-push
3. Node.js 20+ dan pnpm terinstall (untuk testing lokal)

## 🚀 Opsi 1: Deploy via GitHub Actions (Otomatis)

Workflow GitHub Actions yang ada sudah **cocok** untuk deploy ke Vercel. Berikut langkah-langkahnya:

### 1. Setup Vercel Project

1. Login ke [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik **"Add New..."** → **"Project"**
3. Import repository GitHub Anda
4. Vercel akan otomatis detect Next.js project
5. **JANGAN** klik deploy sekarang, kita akan setup GitHub Actions dulu

### 2. Setup Vercel Secrets di GitHub

1. Buka repository GitHub Anda
2. Pergi ke **Settings** → **Secrets and variables** → **Actions**
3. Tambahkan secrets berikut:

   ```
   VERCEL_TOKEN
   VERCEL_ORG_ID
   VERCEL_PROJECT_ID
   ```

   **Cara mendapatkan nilai-nilai ini:**
   
   - **VERCEL_TOKEN**: 
     - Pergi ke [Vercel Account Settings](https://vercel.com/account/tokens)
     - Klik **"Create Token"**
     - Beri nama token (contoh: "github-actions")
     - Copy token yang dihasilkan
   
   - **VERCEL_ORG_ID** dan **VERCEL_PROJECT_ID**:
     - Install Vercel CLI: `pnpm install -g vercel`
     - Jalankan: `vercel link`
     - Pilih project yang sudah dibuat di Vercel
     - File `.vercel/project.json` akan dibuat dengan informasi ini
     - Atau bisa dilihat di URL Vercel project: `https://vercel.com/[org-name]/[project-name]/settings`
     - **ORG_ID**: nama organization di Vercel
     - **PROJECT_ID**: bisa dilihat di project settings → General

### 3. Setup Environment Variables di Vercel

1. Di Vercel Dashboard, buka project Anda
2. Pergi ke **Settings** → **Environment Variables**
3. Tambahkan environment variables berikut:

   ```
   BASE_URL=https://your-project.vercel.app
   NEXT_PUBLIC_API_URL=(kosongkan dulu karena belum ada backend)
   ```

   **Catatan**: 
   - Set `BASE_URL` untuk production dan preview
   - `NEXT_PUBLIC_API_URL` bisa dikosongkan dulu karena landing page tidak perlu backend
   - Set environment variables untuk **Production**, **Preview**, dan **Development**

### 4. Verifikasi GitHub Workflows

Workflow yang ada sudah benar:
- ✅ `preview.yaml`: Deploy preview untuk semua branch kecuali `main`
- ✅ `production.yaml`: Deploy production untuk branch `main`

**Catatan**: Workflow menggunakan Vercel CLI yang akan otomatis install dependencies saat build, jadi tidak perlu menambahkan step `pnpm install` secara eksplisit.

### 5. Push ke GitHub

Setelah semua setup selesai:

```bash
git add .
git commit -m "Setup untuk deployment Vercel"
git push origin main
```

GitHub Actions akan otomatis trigger dan deploy ke Vercel!

## 🔧 Opsi 2: Deploy Manual via Vercel CLI

Jika ingin deploy manual tanpa GitHub Actions:

### 1. Install Vercel CLI

```bash
pnpm install -g vercel
```

### 2. Login ke Vercel

```bash
vercel login
```

### 3. Link Project

```bash
vercel link
```

Pilih:
- Existing project atau Create new
- Project name
- Directory (tekan Enter untuk current directory)

### 4. Deploy

**Preview deployment:**
```bash
vercel
```

**Production deployment:**
```bash
vercel --prod
```

## 📝 Environment Variables yang Diperlukan

Buat file `.env.local` untuk development (jangan commit ke git):

```env
BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=
```

Di Vercel, set environment variables berikut:

| Variable | Production | Preview | Development | Keterangan |
|----------|-----------|---------|-------------|------------|
| `BASE_URL` | ✅ | ✅ | ✅ | URL aplikasi (otomatis di Vercel) |
| `NEXT_PUBLIC_API_URL` | ❌ | ❌ | ❌ | Kosongkan dulu (belum ada backend) |

**Catatan**: Vercel otomatis menyediakan `VERCEL_URL` environment variable, tapi untuk konsistensi lebih baik set `BASE_URL` manual.

## ✅ Verifikasi Deployment

Setelah deploy berhasil:

1. **Landing Page harus bisa diakses**: `https://your-project.vercel.app/`
2. **Halaman lain harus redirect ke maintenance**: 
   - Coba akses `https://your-project.vercel.app/dashboard`
   - Harus redirect ke `/maintenance`
3. **Static assets harus bisa diakses**: 
   - Cek gambar, CSS, dan file lainnya loading dengan benar

## 🐛 Troubleshooting

### Build Error

Jika build error, cek:
- Node.js version di Vercel (harus 20+)
- Dependencies terinstall dengan benar
- Environment variables sudah di-set

**Fix**: Di Vercel project settings → General → Node.js Version, set ke `20.x`

### Deployment via GitHub Actions Gagal

1. Cek secrets di GitHub sudah benar
2. Cek Vercel token masih valid
3. Cek logs di GitHub Actions untuk detail error

### Landing Page Masih Redirect ke Maintenance

1. Cek middleware sudah di-update dengan benar
2. Cek environment variable `BASE_URL` sudah di-set
3. Clear cache browser atau test di incognito mode

## 📚 Referensi

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI](https://vercel.com/docs/cli)

## 🎯 Checklist Deployment

- [ ] Vercel project sudah dibuat
- [ ] GitHub secrets sudah di-set (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID)
- [ ] Environment variables sudah di-set di Vercel
- [ ] GitHub workflows sudah di-verify
- [ ] Code sudah di-push ke GitHub
- [ ] Deployment berhasil dan landing page bisa diakses
- [ ] Halaman lain redirect ke maintenance dengan benar

---

**Selamat deploy! 🚀**

Jika ada pertanyaan atau masalah, cek logs di Vercel Dashboard atau GitHub Actions.

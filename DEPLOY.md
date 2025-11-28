# Deploy ke Vercel

Aplikasi ini sudah siap untuk di-deploy ke Vercel dengan konfigurasi otomatis.

## Langkah Deploy

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Buka Vercel Dashboard**
   - Kunjungi https://vercel.com
   - Login dengan akun GitHub Anda

2. **Import Project**
   - Klik "Add New" → "Project"
   - Pilih repository `hafarna03aja-droid/foto-pro`
   - Klik "Import"

3. **Configure Project**
   - Framework Preset: **Vite** (otomatis terdeteksi)
   - Build Command: `npm run build` (sudah default)
   - Output Directory: `dist` (sudah default)
   
4. **Environment Variables**
   - Klik "Environment Variables"
   - Tambahkan:
     - Name: `VITE_API_KEY`
     - Value: [Your Google AI API Key]
   - Klik "Add"

5. **Deploy**
   - Klik "Deploy"
   - Tunggu proses build selesai (~2-3 menit)
   - Aplikasi Anda akan live di `https://foto-pro-xxx.vercel.app`

### Option 2: Deploy via Vercel CLI

```powershell
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Environment Variables yang Diperlukan

Pastikan menambahkan environment variable berikut di Vercel Dashboard:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_KEY` | Google AI API Key | ✅ Yes |

### Cara Mendapatkan Google AI API Key:
1. Kunjungi https://makersuite.google.com/app/apikey
2. Login dengan akun Google
3. Klik "Create API Key"
4. Copy API key tersebut
5. Paste di Vercel Environment Variables

## Custom Domain (Optional)

Setelah deploy berhasil:
1. Buka project di Vercel Dashboard
2. Go to "Settings" → "Domains"
3. Tambahkan custom domain Anda
4. Ikuti instruksi DNS configuration

## Auto Deploy

Vercel otomatis akan deploy ulang setiap kali Anda push ke GitHub:
- Push ke `main` branch = Production deployment
- Push ke branch lain = Preview deployment

## Troubleshooting

### Build Failed
- Pastikan `npm run build` berjalan sukses di lokal
- Check console log di Vercel untuk error details

### API Key Issues
- Pastikan VITE_API_KEY sudah ditambahkan di Environment Variables
- Variable harus prefix dengan `VITE_` untuk Vite apps

### 404 Errors
- File `vercel.json` sudah dikonfigurasi untuk SPA routing
- Semua routes akan redirect ke `index.html`

## Links
- 📦 Repository: https://github.com/hafarna03aja-droid/foto-pro
- 🚀 Vercel: https://vercel.com
- 📖 Docs: https://vercel.com/docs

---

# Deploy ke Netlify

Aplikasi ini juga siap untuk di-deploy ke Netlify.

## Langkah Deploy

### Option 1: Deploy via Netlify Dashboard (Recommended)

1. **Buka Netlify Dashboard**
   - Kunjungi https://app.netlify.com
   - Login dengan akun GitHub/GitLab/Bitbucket Anda

2. **Import Project**
   - Klik "Add new site" → "Import an existing project"
   - Pilih provider Git Anda (misal: GitHub)
   - Pilih repository `hafarna03aja-droid/foto-pro`

3. **Configure Project**
   - Build Command: `npm run build`
   - Publish directory: `dist`
   - **Netlify akan otomatis mendeteksi konfigurasi dari file `netlify.toml` yang sudah ada di repository ini.**

4. **Environment Variables**
   - Klik "Show advanced" atau pergi ke "Site settings" setelah deploy awal (jika gagal)
   - Tambahkan variable:
     - Key: `VITE_API_KEY`
     - Value: [Your Google AI API Key]

5. **Deploy**
   - Klik "Deploy site"

### Option 2: Deploy via Netlify CLI

```powershell
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize & Deploy
netlify init
# Ikuti instruksi di terminal:
# - Create & configure a new site
# - Team: [Your Team]
# - Site name: (Optional)
# - Build command: npm run build
# - Directory to deploy: dist

# Deploy to production
netlify deploy --prod
```

## Konfigurasi Khusus Netlify

File `netlify.toml` di root project menangani:
- Build settings
- Redirects untuk SPA (Single Page Application) agar routing React berfungsi dengan baik (menghindari 404 saat refresh halaman).

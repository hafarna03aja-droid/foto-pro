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

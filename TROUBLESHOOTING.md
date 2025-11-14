# 🔧 Troubleshooting Guide

Kumpulan solusi untuk masalah yang sering terjadi.

---

## 📦 Masalah Instalasi

### Error: "Cannot find module '@google/genai'"

**Penyebab:** Package belum terinstall atau corrupt

**Solusi:**
```bash
# Install ulang
npm install @google/genai

# Atau install specific version
npm install @google/genai@0.1.0

# Verify instalasi
npm list @google/genai
```

### Error: "ENOENT: no such file or directory"

**Penyebab:** File atau folder tidak ditemukan

**Solusi:**
```bash
# Pastikan Anda di folder yang benar
pwd  # Mac/Linux
cd   # Windows

# Seharusnya menunjuk ke: d:\app VS\

# Cek apakah package.json ada
ls package.json  # Mac/Linux
dir package.json # Windows
```

### Error: "npm ERR! code EACCES"

**Penyebab:** Permission error

**Solusi Mac/Linux:**
```bash
sudo chown -R $USER:$USER .
npm install
```

**Solusi Windows:**
- Buka Command Prompt sebagai Administrator
- Jalankan `npm install`

---

## 🔐 Masalah API Key

### Error: "API Key tidak ditemukan"

**Checklist:**
- [ ] File `.env` ada di root folder (bukan di subfolder)
- [ ] File bernama `.env` (bukan `.env.txt` atau `.env.example`)
- [ ] Format: `VITE_API_KEY=AIzaSy...` (tanpa spasi)
- [ ] Tidak ada tanda kutip: ❌ `"AIzaSy..."` ✅ `AIzaSy...`
- [ ] Dev server sudah di-restart setelah edit .env

**Verify .env:**
```bash
# Mac/Linux
cat .env

# Windows
type .env

# Seharusnya menampilkan:
# VITE_API_KEY=AIzaSyXXXX...
```

### Error: "Invalid API Key"

**Penyebab:** API Key salah atau expired

**Solusi:**
1. Buat API key baru di [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Pastikan copy **seluruh** API key
3. Paste ke `.env` (ganti yang lama)
4. Restart dev server

### API Key tidak ter-load

**Solusi:**
```bash
# 1. Stop dev server (Ctrl+C)
# 2. Clear cache
rm -rf node_modules/.vite

# 3. Jalankan ulang
npm run dev
```

---

## 🖥️ Masalah Development Server

### Error: "Port 5173 already in use"

**Solusi 1:** Kill process di port tersebut

**Windows:**
```bash
netstat -ano | findstr :5173
taskkill /PID [PID_NUMBER] /F
```

**Mac/Linux:**
```bash
lsof -ti:5173 | xargs kill -9
```

**Solusi 2:** Ganti port

Edit `vite.config.js`:
```javascript
server: {
  port: 3000, // atau port lain yang tersedia
}
```

### Server berjalan tapi halaman blank

**Checklist:**
- [ ] Buka DevTools (F12) dan cek Console untuk error
- [ ] Pastikan URL benar: `http://localhost:5173`
- [ ] Clear browser cache (Ctrl+Shift+R)
- [ ] Coba browser lain

**Solusi:**
```bash
# Clear cache
rm -rf node_modules/.vite

# Rebuild
npm run dev
```

---

## 🎨 Masalah UI / Styling

### Tailwind CSS tidak bekerja

**Solusi:**
```bash
# Install ulang Tailwind
npm install -D tailwindcss postcss autoprefixer

# Generate config (jika belum ada)
npx tailwindcss init -p

# Restart dev server
npm run dev
```

### Font atau styling rusak

**Solusi:**
```bash
# Clear cache
rm -rf node_modules/.vite
rm -rf dist

# Rebuild
npm run dev
```

---

## 🖼️ Masalah Upload/Generate Gambar

### Upload tidak berfungsi

**Checklist:**
- [ ] File size < 10MB
- [ ] Format: PNG, JPG, WEBP
- [ ] Browser support File API (Chrome/Firefox/Safari modern)

**Test di Console:**
```javascript
console.log(window.File); // harus ada output
```

### Generate gambar selalu error

**Checklist:**
- [ ] API Key valid
- [ ] Koneksi internet aktif
- [ ] File yang diupload valid
- [ ] Prompt tidak terlalu panjang (< 4000 karakter)

**Debug mode:**
```typescript
// Tambahkan di src/hooks/useImageGeneration.ts
console.log('API Key:', API_CONFIG.googleAI.apiKey.substring(0, 10) + '...');
console.log('Files:', files.length);
console.log('Prompt length:', prompt.length);
```

---

## 🔨 Masalah Build

### Error: "Type error" saat build

**Solusi:**
```bash
# Check TypeScript errors
npx tsc --noEmit

# Fix errors yang muncul
# Lalu build ulang
npm run build
```

### Build berhasil tapi tidak bisa dibuka

**Solusi:**
```bash
# Preview build locally
npm run preview

# Atau serve dengan http-server
npx http-server dist
```

---

## 🌐 Masalah Network

### Tidak bisa akses dari perangkat lain

**Solusi:**

Edit `vite.config.js`:
```javascript
server: {
  host: '0.0.0.0', // expose ke network
  port: 5173,
}
```

Lalu akses dari perangkat lain:

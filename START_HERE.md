# 🎬 START HERE - Foto PRO Setup

Panduan lengkap untuk menjalankan aplikasi dalam **5 menit**!

---

## 🚀 Quick Start (Recommended)

Jalankan perintah ini satu per satu:

### 1. Install Dependencies
```bash
npm install
```
⏱️ Waktu: ~2-3 menit (tergantung koneksi internet)

Ini akan menginstall:
- ✅ React & React DOM
- ✅ @google/genai (AI SDK)
- ✅ Vite, TypeScript, Tailwind CSS
- ✅ Semua dependencies lainnya

### 2. Setup Environment
```bash
# Windows Command Prompt
copy .env.example .env

# Windows PowerShell
Copy-Item .env.example .env

# Mac/Linux
cp .env.example .env
```

### 3. Tambahkan API Key

**a) Dapatkan API Key:**
- Buka: https://makersuite.google.com/app/apikey
- Login dengan Gmail
- Klik "Create API Key"
- Copy API key (format: `AIzaSy...`)

**b) Edit file .env:**
```bash
# Buka dengan editor favorit
notepad .env      # Windows
code .env         # VS Code
nano .env         # Linux/Mac
```

**c) Ganti placeholder dengan API key Anda:**
```env
VITE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```
💾 **JANGAN LUPA SAVE!**

### 4. Verifikasi Setup (Optional)
```bash
npm run check
```
Script ini akan mengecek apakah semua sudah siap.

### 5. Jalankan Aplikasi
```bash
npm run dev
```

✅ **DONE!** Aplikasi akan terbuka di `http://localhost:5173`

---

## 🆘 Troubleshooting Cepat

### Masalah 1: `npm install` error
```bash
# Clear cache dan install ulang
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Masalah 2: "Cannot find module '@google/genai'"
```bash
# Install manual
npm install @google/genai
```

### Masalah 3: "VITE_API_KEY is not defined"
**Checklist:**
- [ ] File `.env` ada di folder root (d:\app VS\)
- [ ] Sudah diisi dengan API key yang benar
- [ ] Tidak ada typo di nama variabel
- [ ] **Restart dev server** setelah edit .env (Ctrl+C, lalu `npm run dev` lagi)

### Masalah 4: Port 5173 sudah dipakai
**Solusi cepat:** Edit `vite.config.js`, ubah port:
```javascript
server: {
  port: 3000, // ganti dengan port lain
}
```

---

## 📋 Checklist Lengkap

Pastikan semua ini sudah dilakukan:

- [ ] Node.js terinstall (v16+) - cek: `node --version`
- [ ] npm terinstall - cek: `npm --version`
- [ ] `npm install` berhasil
- [ ] File `.env` sudah dibuat
- [ ] API key sudah dimasukkan ke `.env`
- [ ] `npm run dev` berjalan tanpa error
- [ ] Browser terbuka di `http://localhost:5173`
- [ ] Aplikasi tampil dengan baik

---

## 🎯 Apa Selanjutnya?

Setelah aplikasi berjalan, Anda bisa:

1. **Chat dengan Asisten** - Klik "Foto PRO Asisten" di sidebar
2. **Coba Gabung Gambar** - Upload beberapa foto dan gabungkan
3. **Eksplorasi Fitur Lain** - Pre-Wedding, Foto Model, dll.

---

## 📚 Dokumentasi Lengkap

Baca file-file ini untuk info lebih detail:

- `QUICKSTART.md` - Panduan cepat dengan penjelasan
- `INSTALL.md` - Panduan instalasi detail
- `TROUBLESHOOTING.md` - Solusi masalah lengkap
- `README.md` - Dokumentasi utama aplikasi

---

## 🔧 Perintah Berguna

```bash
# Development
npm run dev          # Jalankan dev server
npm run build        # Build untuk production
npm run preview      # Preview production build

# Maintenance
npm run check        # Check dependencies
npm run setup        # Auto setup (alternatif)
npm run lint         # Check code quality

# Troubleshooting
npm cache clean --force    # Clear npm cache
rm -rf node_modules        # Hapus node_modules
npm install               # Install ulang
```

---

## 💡 Tips

1. **Selalu restart dev server** setelah edit `.env`
2. **Jangan commit file `.env`** ke Git (sudah ada di .gitignore)
3. **Gunakan `npm run check`** untuk verifikasi setup
4. **Baca error message** dengan teliti sebelum search solusi
5. **Update dependencies** secara berkala: `npm update`

---

## 🆘 Masih Stuck?

1. Jalankan `npm run check` untuk diagnosis
2. Baca `TROUBLESHOOTING.md`
3. Check browser console (F12) untuk error
4. Pastikan API key valid
5. Coba browser lain (Chrome/Firefox)

---

## 📞 Support

- Stack Overflow: Tag `react`, `vite`, `google-genai`
- Google AI Documentation: https://ai.google.dev/
- Vite Documentation: https://vitejs.dev/

---

**🎉 Selamat mencoba Foto PRO!**

*Last updated: 2024*

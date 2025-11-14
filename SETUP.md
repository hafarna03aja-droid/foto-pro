# 🚀 Panduan Setup Foto PRO

## Langkah 1: Install Dependencies

```bash
npm install
```

## Langkah 2: Install Optional Dependencies (Untuk Fitur AI)

```bash
npm install @google/genai
```

## Langkah 3: Setup Environment Variables

1. Copy file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

2. Edit file `.env` dan tambahkan API key Anda:
```env
VITE_API_KEY=your_actual_google_ai_api_key_here
```

### Cara Mendapatkan API Key:

1. Kunjungi [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Login dengan akun Google Anda
3. Klik "Create API Key"
4. Copy API key yang dihasilkan
5. Paste ke file `.env`

## Langkah 4: Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## Langkah 5: Build untuk Production

```bash
npm run build
```

Hasil build akan ada di folder `dist/`

## ⚠️ Troubleshooting

### Error: "Cannot find module '@google/genai'"

Solusi:
```bash
npm install @google/genai
```

### Error: "API Key tidak ditemukan"

Solusi:
1. Pastikan file `.env` ada di root folder
2. Pastikan format: `VITE_API_KEY=your_key`
3. Restart development server

### Port 5173 sudah digunakan

Solusi: Edit `vite.config.js`, ubah port:
```javascript
server: {
  port: 3000, // ganti dengan port yang tersedia
  open: true,
}
```

## 📱 Testing di Mobile

1. Cari IP address komputer Anda:
```bash
ipconfig  # Windows
ifconfig  # Mac/Linux
```

2. Akses dari mobile: `http://YOUR_IP:5173`

## 🔒 Keamanan

- **JANGAN** commit file `.env` ke Git
- **JANGAN** share API key di public
- Untuk production, gunakan environment variables yang aman

## 📚 Dokumentasi Lengkap

Lihat `README.md` untuk informasi lebih detail.

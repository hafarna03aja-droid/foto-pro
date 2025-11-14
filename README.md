# 📸 Foto PRO - AI Photo Assistant

Aplikasi web modern untuk berbagai layanan AI photo editing dan generation dengan chatbot assistant yang membantu pengguna memahami semua fitur.

## ✨ Fitur Utama

### 🤖 Chatbot Assistant
- **Interactive Guide**: Chatbot AI yang membantu pengguna navigasi fitur
- **Search Functionality**: Cari percakapan dengan Ctrl+F
- **Dark Mode**: Dukungan penuh untuk dark mode
- **Markdown Support**: Respons dengan formatting markdown

### 🎨 Photo Features
1. **🖼️ Gabung Gambar** - Kombinasikan beberapa foto jadi satu karya
2. **🛍️ Photo Produk** - Generate foto produk profesional
3. **✨ Edit Foto** - Restorasi foto lama atau edit foto resmi
4. **💖 Pre-Wedding** - Foto pre-wedding sinematik
5. **👤 Foto Model** - Foto model berkualitas tinggi
6. **📸 Sewa Fotografer** - Face-swap dengan AI fotografer
7. **📢 Bikin Banner** - Desain banner promosi
8. **📱 Bikin Carousel** - Konten Instagram carousel 5 slide
9. **💌 Desain Undangan** - Undangan pernikahan digital
10. **🎨 Sketsa Gambar** - Ubah sketsa jadi foto berwarna

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Custom SVG Components
- **Markdown**: react-markdown + remark-gfm

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/yourusername/foto-pro.git

# Masuk ke direktori
cd foto-pro

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start dev server (localhost:5173)

# Build
npm run build        # Build untuk production
npm run preview      # Preview production build

# Linting
npm run lint         # Check kode dengan ESLint
```

## 📁 Project Structure

```
d:\app VS/
├── src/
│   ├── components/
│   │   ├── features/
│   │   │   └── ChatInterface.tsx    # Main chatbot component
│   │   ├── shared/
│   │   │   └── MarkdownMessage.tsx  # Markdown renderer
│   │   └── icons/                   # SVG icon components
│   ├── types/
│   │   └── index.ts                 # TypeScript types
│   ├── App.tsx                      # Main app component
│   └── main.tsx                     # Entry point
├── public/                          # Static assets
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 Usage

### Chatbot Commands

Ketik salah satu command berikut di chatbot:

- `bantuan` atau `help` - Lihat daftar semua fitur
- `hi`, `hai`, `halo` - Sapaan untuk memulai
- `gabung gambar` - Panduan gabung gambar
- `photo produk` - Panduan foto produk
- `edit foto` - Panduan edit foto
- Dan nama fitur lainnya...

### Search Messages

- Tekan `Ctrl+F` (atau `Cmd+F` di Mac) untuk membuka search
- Ketik kata kunci untuk mencari dalam percakapan
- Tekan `Esc` untuk menutup search

## 🌙 Dark Mode

Aplikasi secara otomatis mengikuti preferensi sistem operasi Anda. Toggle dark mode dari system settings.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Your Name** - *Initial work*

## 🙏 Acknowledgments

- React Team untuk framework yang amazing
- Tailwind CSS untuk utility-first CSS
- Vite untuk build tool yang super cepat

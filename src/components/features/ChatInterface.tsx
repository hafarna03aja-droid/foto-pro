import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../../types';
import { 
  Logo24Icon, 
  PaperAirplaneIcon, 
  SearchIcon, 
  UserCircleIcon 
} from '../icons';
import MarkdownMessage from '../shared/MarkdownMessage';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hai! Aku Foto PRO Asisten. Mau coba buat apa? Bilang aja 'bantuan' kalau bingung mau mulai dari mana! Pastikan sudah login pakai gmail ya!",
      sender: 'assistant',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        setShowSearch(true);
      }
      if (e.key === 'Escape' && showSearch) {
        setShowSearch(false);
        setSearchQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSearch]);

  const filteredMessages = searchQuery
    ? messages.filter((msg) =>
        msg.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-600 text-gray-900 dark:text-gray-100 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const getFeatureGuide = (query: string): string | null => {
    const lowerQuery = query.toLowerCase().trim();

    // Cek bantuan terlebih dahulu
    if (lowerQuery.includes('bantuan') || lowerQuery.includes('help') || lowerQuery === 'hi' || lowerQuery === 'hai' || lowerQuery === 'halo') {
        return `Tentu! 🤖 Aku bisa membantumu memahami semua fitur di Foto PRO.

**Fitur yang tersedia:**
- 🖼️ **Gabung Gambar:** Kombinasikan beberapa foto
- 🛍️ **Photo Produk:** Foto produk profesional
- ✨ **Edit Foto:** Perbaiki foto lama
- 💖 **Pre-Wedding:** Foto pre-wedding sinematik
- 👤 **Foto Model:** Foto model berkualitas tinggi
- 📸 **Sewa Fotografer:** Face-swap dengan foto profesional
- 📢 **Bikin Banner:** Desain banner promosi
- 📱 **Bikin Carousel:** Konten Instagram carousel
- 💌 **Desain Undangan:** Undangan pernikahan digital
- 🎨 **Sketsa Gambar:** Ubah sketsa jadi foto berwarna

Ketik nama fitur untuk panduan lengkap! 👇`;
    }

    const guides: { [key: string]: string } = {
        'gabung gambar': `**🖼️ Panduan Fitur: Gabung Gambar Profesional**
        
*Tujuan:* Menggabungkan beberapa gambar menjadi satu mahakarya yang mulus dan berkualitas HD.

**Langkah-langkahnya:**
1. 📂 **Unggah Gambar:** Klik area unggah untuk memilih beberapa gambar utama.
2. 🎨 **Pilih Gaya:** Tentukan gaya akhir seperti 'Realistis', 'Fantasi', atau 'Iklan'.
3. 📏 **Atur Aspek Rasio:** Pilih rasio yang sesuai (1:1 untuk Instagram).
4. ✍️ **Tambahkan Elemen:** Sisipkan teks dan logo jika diperlukan.
5. 🌟 **Gunakan Fitur Premium:** Aktifkan 'Kualitas HD' dan 'Hapus Latar Belakang'.
6. 🚀 **Klik 'Buat Gambar':** AI akan menggabungkan semuanya!`,
        
        'photo produk': `**🛍️ Panduan Fitur: Foto Produk Premium**

*Tujuan:* Menciptakan visual produk komersial yang menarik.

**Langkah-langkahnya:**
1. 📦 **Unggah Produk:** Upload foto produk Anda.
2. ✨ **Pilih Gaya:** Pilih gaya seperti 'Minimalist', 'Luxury', 'Lifestyle', atau 'Studio'.
3. 🎨 **Custom Background:** Tambahkan deskripsi background custom (opsional).
4. 📝 **Deskripsi Produk:** Jelaskan produk untuk hasil lebih akurat.
5. 🚀 **Klik 'Generate Photo':** AI akan menghasilkan foto produk profesional.`,

        'edit foto': `**✨ Panduan Fitur: Edit Foto**

*Tujuan:* Restorasi foto lama atau edit foto resmi.

**Langkah-langkahnya:**
1. 📷 **Unggah Foto:** Upload foto yang ingin diedit.
2. 🎯 **Pilih Tipe Edit:** 
   - *Restoration:* Perbaiki foto lama/rusak
   - *Formal Photo:* Ubah jadi foto resmi profesional
3. 📝 **Tambahkan Instruksi:** Jelaskan hasil yang diinginkan (opsional).
4. 🚀 **Klik 'Edit Photo':** AI akan memproses foto Anda.`,

        'pre wedding': `**💖 Panduan Fitur: Pre-Wedding**

*Tujuan:* Generate foto pre-wedding sinematik dan romantis.

**Langkah-langkahnya:**
1. 👫 **Unggah Foto Pasangan:** Upload foto couple.
2. 🎨 **Pilih Tema:** Beach Sunset, Garden, Urban, atau Mountain.
3. 🌟 **Pilih Style:** Romantic, Cinematic, Natural, atau Dramatic.
4. 📝 **Deskripsi Custom:** Tambahkan detail khusus (opsional).
5. 🚀 **Klik 'Generate Pre-Wedding Photo':** Dapatkan foto pre-wedding impian!`,

        'foto model': `**👤 Panduan Fitur: Foto Model**

*Tujuan:* Ciptakan foto model berkualitas tinggi.

**Langkah-langkahnya:**
1. 📸 **Unggah Foto:** Upload foto yang ingin dijadikan foto model.
2. 🎭 **Pilih Style:** Fashion, Editorial, Commercial, atau Portrait.
3. 💡 **Pilih Lighting:** Studio, Natural, Dramatic, atau Soft.
4. 📝 **Custom Instructions:** Tambahkan detail spesifik.
5. 🚀 **Klik 'Generate Model Photo':** Buat foto model profesional!`,

        'sewa fotografer': `**📸 Panduan Fitur: Sewa Fotografer (Face Swap)**

*Tujuan:* Face-swap dengan AI fotografer profesional.

**Langkah-langkahnya:**
1. 👤 **Unggah Foto Wajah:** Upload foto wajah Anda.
2. 📷 **Pilih Fotografer:** Corporate, Creative, Fashion, atau Wedding.
3. 📝 **Tambahkan Konteks:** Jelaskan setting yang diinginkan.
4. 🚀 **Klik 'Generate Photo':** Dapatkan hasil foto profesional!`,

        'bikin banner': `**📢 Panduan Fitur: Bikin Banner**

*Tujuan:* Desain banner promosi profesional.

**Langkah-langkahnya:**
1. 🎯 **Pilih Tipe:** Sale, Event, Product, atau Announcement.
2. 🎨 **Pilih Style:** Modern, Minimalist, Bold, atau Elegant.
3. 🌈 **Pilih Warna:** Vibrant, Pastel, Dark, atau Monochrome.
4. 📝 **Isi Detail:** Judul, deskripsi, dan CTA.
5. 🚀 **Klik 'Generate Banner':** Banner siap digunakan!`,

        'bikin carousel': `**📱 Panduan Fitur: Bikin Carousel Instagram**

*Tujuan:* Buat konten carousel Instagram 5 slide.

**Langkah-langkahnya:**
1. 🎯 **Pilih Tema:** Educational, Product, Tips, Story, atau Timeline.
2. 🎨 **Pilih Style:** Modern, Minimalist, Colorful, atau Professional.
3. 📝 **Isi Informasi:** Topik, poin-poin utama, dan CTA.
4. 🚀 **Klik 'Generate Carousel':** 5 slide siap posting!`,

        'desain undangan': `**💌 Panduan Fitur: Desain Undangan**

*Tujuan:* Buat undangan pernikahan digital.

**Langkah-langkahnya:**
1. 🎨 **Pilih Style:** Classic, Modern, Floral, atau Minimalist.
2. 🌈 **Pilih Warna:** Gold, Pastel, Sage, atau Navy.
3. 📝 **Isi Detail:** Nama pasangan, tanggal, lokasi, dan pesan.
4. 🚀 **Klik 'Generate Invitation':** Undangan cantik siap dibagikan!`,

        'sketsa gambar': `**🎨 Panduan Fitur: Sketsa Gambar**

*Tujuan:* Ubah sketsa hitam putih jadi foto berwarna realistis.

**Langkah-langkahnya:**
1. ✏️ **Unggah Sketsa:** Upload sketsa atau line art.
2. 🎨 **Pilih Style:** Realistic, Anime, Cartoon, atau Watercolor.
3. 🌈 **Pilih Color Scheme:** Natural, Vibrant, Pastel, atau Monochrome.
4. 📝 **Tambahkan Instruksi:** Detail tambahan untuk warna/style.
5. 🚀 **Klik 'Generate Colored Image':** Sketsa jadi foto berwarna!`,
    };

    for (const key in guides) {
        if (lowerQuery.includes(key)) {
            return guides[key];
        }
    }

    return null;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    const guide = getFeatureGuide(currentInput);

    setTimeout(() => {
      const assistantResponse: Message = {
        id: Date.now() + 1,
        text: guide || `Maaf, saya tidak dapat memproses permintaan itu. Ketik "bantuan" untuk melihat daftar fitur.`,
        sender: 'assistant',
      };
      setMessages((prev) => [...prev, assistantResponse]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <Logo24Icon className="w-8 h-8 text-teal-500 dark:text-cyan-400" />
          <h2 className="font-bold text-gray-800 dark:text-gray-100">Foto PRO Asisten</h2>
        </div>
        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="relative p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors group"
            aria-label="Search messages"
            title="Cari pesan (Ctrl+F)"
          >
            <SearchIcon className="w-6 h-6" />
            {showSearch && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-teal-500 dark:bg-cyan-400 rounded-full"></span>
            )}
          </button>
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
            <UserCircleIcon className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Search Bar */}
      {showSearch && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="relative max-w-2xl mx-auto">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pesan..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-cyan-400 text-gray-900 dark:text-gray-100 placeholder-gray-400"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
              Ditemukan {filteredMessages.length} dari {messages.length} pesan
            </p>
          )}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {searchQuery && filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <SearchIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Tidak ada hasil
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Tidak ditemukan pesan dengan kata kunci "{searchQuery}"
            </p>
          </div>
        ) : (
          <>
            {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-4 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
                {msg.sender === 'assistant' && (
                  <Logo24Icon className="w-10 h-10 flex-shrink-0" />
                )}
                <div
                  className={`max-w-lg p-4 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-teal-500 dark:bg-cyan-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {msg.sender === 'assistant' ? (
                    <MarkdownMessage content={msg.text} searchQuery={searchQuery} />
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">
                      {searchQuery ? highlightText(msg.text, searchQuery) : msg.text}
                    </p>
                  )}
                </div>
                {msg.sender === 'user' && (
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">U</span>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-4 justify-start">
                <Logo24Icon className="w-10 h-10 flex-shrink-0" />
                <div className="max-w-lg p-4 rounded-2xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <form onSubmit={handleSendMessage} className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ketik 'bantuan' atau nama fitur..."
            className="w-full pl-4 pr-12 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-cyan-400 transition text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-white bg-teal-500 dark:bg-cyan-500 hover:bg-teal-600 dark:hover:bg-cyan-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 transition"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

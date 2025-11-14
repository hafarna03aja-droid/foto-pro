import React from 'react';

// Import all feature components
import { ChatInterface } from './features/ChatInterface';
import { GabungGambarPro } from './features/GabungGambarPro';
import { PhotoProdukPro } from './features/PhotoProdukPro';
import { EditFoto } from './features/EditFoto';
import { PreWedding } from './features/PreWedding';
import { FotoModel } from './features/FotoModel';
import { SewaFotografer } from './features/SewaFotografer';
import { BikinBanner } from './features/BikinBanner';
import { BikinCarousel } from './features/BikinCarousel';
import { DesainUndangan } from './features/DesainUndangan';
import { SketsaGambar } from './features/SketsaGambar';

// Main Content Router
export const MainContent: React.FC<{ activeItem: string }> = ({ activeItem }) => {
  switch (activeItem) {
    case 'foto-pro-asisten':
      return <ChatInterface />;
    case 'gabung-gambar':
      return <GabungGambarPro />;
    case 'photo-produk':
      return <PhotoProdukPro />;
    case 'edit-foto':
      return <EditFoto />;
    case 'pre-wedding':
      return <PreWedding />;
    case 'foto-model':
      return <FotoModel />;
    case 'sewa-fotografer':
      return <SewaFotografer />;
    case 'bikin-banner':
      return <BikinBanner />;
    case 'bikin-carousel':
      return <BikinCarousel />;
    case 'desain-undangan':
      return <DesainUndangan />;
    case 'sketsa-gambar':
      return <SketsaGambar />;
    default:
      return <ChatInterface />;
  }
};
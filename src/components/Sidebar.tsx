import React from 'react';
// @ts-ignore - JSX module without type definitions
import { useAuth } from '../contexts/AuthContext';
import {
  Logo24Icon,
  AssistantIcon,
  CombineIcon,
  ProductIcon,
  EditIcon,
  WeddingIcon,
  ModelIcon,
  PhotographerIcon,
  BannerIcon,
  CarouselIcon,
  EnvelopeIcon,
  SketchIcon,
  UserCircleIcon,
  SettingsIcon,
  MicrophoneIcon,
} from './icons';

interface MenuItem {
  id: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description?: string;
}

const menuItems: MenuItem[] = [
  { id: 'foto-pro-asisten', label: 'Foto PRO Asisten', Icon: AssistantIcon, description: 'Chat dengan AI' },
  { id: 'gabung-gambar', label: 'Gabung Gambar', Icon: CombineIcon, description: 'Kombinasi gambar' },
  { id: 'photo-produk', label: 'Photo Produk', Icon: ProductIcon, description: 'Foto produk profesional' },
  { id: 'edit-foto', label: 'Edit Foto', Icon: EditIcon, description: 'Restorasi & edit' },
  { id: 'pre-wedding', label: 'Pre-Wedding', Icon: WeddingIcon, description: 'Foto pre-wedding' },
  { id: 'foto-model', label: 'Foto Model', Icon: ModelIcon, description: 'Foto model' },
  { id: 'sewa-fotografer', label: 'Sewa Fotografer', Icon: PhotographerIcon, description: 'AI Fotografer' },
  { id: 'bikin-banner', label: 'Bikin Banner', Icon: BannerIcon, description: 'Banner promosi' },
  { id: 'bikin-carousel', label: 'Bikin Carousel', Icon: CarouselIcon, description: 'Carousel Instagram' },
  { id: 'desain-undangan', label: 'Desain Undangan', Icon: EnvelopeIcon, description: 'Undangan pernikahan' },
  { id: 'sketsa-gambar', label: 'Sketsa Gambar', Icon: SketchIcon, description: 'Sketsa ke foto' },
  { id: 'transcriber', label: 'Transcriber', Icon: MicrophoneIcon, description: 'Speech to Text' },
];

interface SidebarProps {
  activeItem: string;
  onItemClick: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick, isOpen, onClose, onOpenSettings }) => {
  const { user, logout } = useAuth();
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static overflow-y-auto`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <Logo24Icon className="w-8 h-8 text-teal-500 dark:text-cyan-400" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Foto PRO</h1>
        </div>

        <nav className="p-2">
          {menuItems.map((item) => {
            const { id, label, Icon, description } = item;
            const isActive = activeItem === id;

            return (
              <button
                key={id}
                onClick={() => {
                  onItemClick(id);
                  onClose();
                }}
                className={`w-full flex items-start gap-3 p-3 rounded-lg mb-1 transition-all ${isActive
                  ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-cyan-400 border-l-4 border-teal-500 dark:border-cyan-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <div className="font-medium text-sm">{label}</div>
                  {description && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</div>
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-teal-50 to-purple-50 dark:from-teal-900/20 dark:to-purple-900/20 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-purple-500 rounded-full flex items-center justify-center">
              <UserCircleIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full py-2.5 px-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-colors font-medium text-sm flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Keluar
          </button>

          <div className="flex items-center justify-between">
            <button
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
              onClick={onOpenSettings}
              title="Pengaturan API Key"
            >
              <SettingsIcon className="w-6 h-6" />
              <span className="hidden md:inline">Pengaturan</span>
            </button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center pt-2">
            © 2025 by 24 Learning Centre
          </p>
        </div>
      </aside>

    </>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSelector({ compact = false, className = '' }) {
  const { currentLang = 'en', setLanguage = () => {}, languages = [], selectedLanguage, currentLangObj } = useLanguage();
  const activeLang = selectedLanguage || currentLangObj || (languages && languages.find((l) => l.code === currentLang)) || { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' };
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left select-none ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
          compact
            ? 'px-2 py-1 text-[11px] bg-white/[0.04] hover:bg-white/[0.09] text-slate-300 border border-white/10'
            : 'px-3 py-1.5 text-xs bg-black/40 hover:bg-white/[0.08] text-[#eedfc8] border border-[#d9b482]/25 shadow-sm hover:border-[#d9b482]/50'
        }`}
        aria-label="Change Language"
      >
        <Globe size={compact ? 12 : 13} className="text-[#d9b482]" />
        <span className="text-sm leading-none">{activeLang?.flag || '🇺🇸'}</span>
        <span className="font-semibold uppercase tracking-wider">{activeLang?.code || 'EN'}</span>
        <ChevronDown
          size={11}
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-2xl overflow-hidden shadow-2xl z-50 py-1.5 border border-[#d9b482]/30 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
          style={{
            background: 'rgba(15, 18, 26, 0.96)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 25px rgba(217, 180, 130, 0.15)'
          }}
        >
          <div className="px-3 py-1.5 mb-1 border-b border-white/10">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#d9b482] uppercase">
              Select Language
            </span>
          </div>

          <div className="max-h-60 overflow-y-auto space-y-0.5 px-1">
            {languages.map((lang) => {
              const isSelected = lang.code === currentLang;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition cursor-pointer text-left ${
                    isSelected
                      ? 'bg-[#d9b482]/20 text-[#ffdca8] font-bold'
                      : 'text-slate-300 hover:bg-white/[0.07] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="text-xs leading-tight">{lang.native}</span>
                      <span className="text-[9px] text-slate-400 leading-none">{lang.name}</span>
                    </div>
                  </div>
                  {isSelected && <Check size={13} className="text-[#d9b482]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

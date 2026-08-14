import React from 'react';

// Highly reliable, verified luxury gold & jewelry photography assets
export const FALLBACK_JEWELRY_IMAGES = {
  gold: '/images/jewelry_69ee78684cb4.jpg',
  bridal: '/images/jewelry_236b9320d4de.jpg',
  men: '/images/jewelry_9403aab1f250.jpg',
  silver: '/images/jewelry_9ae95ee78101.jpg',
  bullion: '/images/jewelry_839e207699b7.jpg',
  earrings: '/images/jewelry_fa252d6c0216.jpg',
  necklace: '/images/jewelry_3ed414afefb8.jpg',
  default: '/images/jewelry_69ee78684cb4.jpg',
};

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackType: keyof typeof FALLBACK_JEWELRY_IMAGES = 'default'
) => {
  const target = e.currentTarget;
  const fallbackSrc = FALLBACK_JEWELRY_IMAGES[fallbackType] || FALLBACK_JEWELRY_IMAGES.default;
  if (target.src !== fallbackSrc) {
    target.onerror = null; // prevent looping if fallback fails
    target.src = fallbackSrc;
  }
};

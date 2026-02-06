import { useState } from 'react';
import GalleryLightbox from '../components/GalleryLightbox';

const galleryImages = [
  {
    src: '/assets/generated/gallery-01.dim_1200x800.png',
    alt: 'Restaurant interior',
  },
  {
    src: '/assets/generated/gallery-02.dim_1200x800.png',
    alt: 'Plated Indian dish',
  },
  {
    src: '/assets/generated/gallery-03.dim_1200x800.png',
    alt: 'Indian thali',
  },
  {
    src: '/assets/generated/gallery-04.dim_1200x800.png',
    alt: 'Chef preparing food',
  },
  {
    src: '/assets/generated/gallery-05.dim_1200x800.png',
    alt: 'Dining table ambiance',
  },
  {
    src: '/assets/generated/gallery-06.dim_1200x800.png',
    alt: 'Spices and ingredients',
  },
  {
    src: '/assets/generated/gallery-07.dim_1200x800.png',
    alt: 'Bread oven scene',
  },
  {
    src: '/assets/generated/gallery-08.dim_1200x800.png',
    alt: 'Beverage presentation',
  },
];

export default function GalleryPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  return (
    <div className="section-container section-padding">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Take a visual journey through our restaurant, cuisine, and the artistry behind every dish
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => setSelectedImageIndex(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </div>
        ))}
      </div>

      <GalleryLightbox
        images={galleryImages}
        selectedIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
      />
    </div>
  );
}

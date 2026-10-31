import 'server-only'

export interface GalleryPhoto {
  src: string
  fullResSrc: string
  alt: string
  width: number
  height: number
}

export const galleryPhotos: GalleryPhoto[] = []

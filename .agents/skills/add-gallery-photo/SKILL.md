---
name: add-gallery-photo
description: >
  Load this skill when the task involves any of these words:
  "add photo", "new image", "gallery photo", "upload photo",
  "add picture", "update gallery", "remove photo", "edit gallery".
---

## What this skill does

Teaches the two-part ordered procedure for adding a photo to the gallery: placing the image file correctly in the filesystem, then creating the corresponding entry in `data/photos.ts`. The laws are in `rules/data-layer.md` (RULE-D1, RULE-D3, RULE-D4) and `rules/components.md` (RULE-A1, RULE-G4).

---

## Steps

1. **Receive and inspect the image file.**
   Confirm the file is at minimum 1,200px on its longest side. Note the exact pixel dimensions — you will need them in Step 5. If dimensions are unknown, run:
```bash
   python3 -c "from PIL import Image; img = Image.open('path/to/photo.jpg'); print(img.size)"
```

2. **Name the file using a consistent, lowercase, hyphenated slug.**
   Example: `adaeze-okonkwo-civic-summit-2024.jpg`. No spaces. No uppercase. No special characters. This name becomes the `src` path and must not change after it is written into `data/photos.ts`.

3. **Place the optimised image in `/public/images/gallery/`.**
   This is the file `next/image` will serve as the displayed image on the page.

4. **Place the full-resolution copy in `/public/images/gallery/full/`.**
   Create the `full/` subdirectory if it does not exist. Use the same filename. This is the file the `<a>` tag links to — what opens in the new tab when a visitor clicks the photo.

5. **Open `data/photos.ts` and confirm `import 'server-only'` is the first line.**
   If it is missing, add it before doing anything else. (RULE-D1)

6. **Construct the `GalleryPhoto` object.**
   All five fields are required. None may be blank.
   - `src` — path to the optimised image: `"/images/gallery/your-filename.jpg"`
   - `fullResSrc` — path to the full-resolution copy: `"/images/gallery/full/your-filename.jpg"`
   - `alt` — descriptive text for the image. Must be non-empty. Must describe what is shown. (RULE-A1)
   - `width` — exact pixel width of the optimised image as a number
   - `height` — exact pixel height of the optimised image as a number

7. **Write the `alt` text.**
   It must describe what is in the photo — who is in it, what they are doing, the context if relevant. `alt=""` is a hard failure. `alt="Photo"` is not descriptive enough. Example of correct alt: `"Adaeze Okonkwo speaking at the Pan-African Civic Forum, Lagos, 2024"`. (RULE-A1)

8. **Append the new object to the array in `data/photos.ts`.**
   The PRD does not specify a sort order for photos — append to the end unless the requester specifies a position.

9. **Check for placeholder patterns.**
   No field may contain text matching `/\[[^\]]+\]/g`. (RULE-D3)

10. **Run the pre-build scripts.**
```bash
    ts-node scripts/detect-placeholders.ts
    ts-node scripts/validate-data.ts
```
    Both must pass with zero findings.

11. **Run `next build`.**
    Must complete with zero TypeScript errors. (RULE-B2)

12. **Verify the gallery on the Home page in the browser or preview.**
    Confirm the new photo appears in the gallery. Confirm clicking it opens the full-resolution image in a new tab. Confirm no layout shift occurs on load (CLS check). Confirm the image renders in WebP format in the Network tab of Chrome DevTools.

---

## Code skeleton

```typescript
import 'server-only' // Must be line 1 — RULE-D1

import type { GalleryPhoto } from '@/types/photos'

export const galleryPhotos: GalleryPhoto[] = [
  // ... existing entries
  {
    src: "/images/gallery/adaeze-okonkwo-civic-summit-2024.jpg",
    fullResSrc: "/images/gallery/full/adaeze-okonkwo-civic-summit-2024.jpg",
    alt: "Adaeze Okonkwo speaking at the Pan-African Civic Forum, Lagos, 2024", // non-empty, descriptive — RULE-A1
    width: 1200,   // exact pixel width of the optimised image
    height: 800,   // exact pixel height of the optimised image
  },
]
```

The `<Image>` component and surrounding link in `PhotoGallery.tsx` follow this pattern (do not modify this component as part of adding a photo):

```tsx

  href={photo.fullResSrc}
  target="_blank"
  rel="noopener noreferrer"
>
  <span className="sr-only">(opens in new tab)</span> {/* RULE-A4 */}
  <Image
    src={photo.src}
    alt={photo.alt}
    width={photo.width}
    height={photo.height}
  />
</a>
```

---

## Traps

- **Skipping the full-resolution copy.** Writing only one file and using the same path for both `src` and `fullResSrc` means clicking the photo opens the optimised (potentially smaller) version, not the full-resolution one. These must be two separate files.
- **Wrong `width` or `height`.** Providing dimensions that do not match the actual image file causes layout shift (CLS above 0.1 threshold) and fails the performance KPI. Always measure before writing.
- **Empty or generic `alt` text.** `alt=""` fails RULE-A1. `alt="Image"` or `alt="Photo 3"` fails the accessibility requirement. The alt must describe what is shown in the photo.
- **Spaces or uppercase in the filename.** A filename of `Adaeze Okonkwo 2024.jpg` becomes a URL with encoded spaces (`%20`), which is fragile. Use lowercase hyphenated slugs.
- **Changing a filename after it is committed.** The filename is the path stored in `data/photos.ts`. Renaming the file without updating the data entry breaks the image on the live site.

---

## Verify before done

- [ ] Optimised image file exists at `/public/images/gallery/[filename]`
- [ ] Full-resolution file exists at `/public/images/gallery/full/[filename]`
- [ ] `import 'server-only'` is line 1 of `data/photos.ts`
- [ ] `alt` is non-empty and descriptive (RULE-A1)
- [ ] `width` and `height` match the actual pixel dimensions of the optimised image
- [ ] `src` and `fullResSrc` are different paths pointing to different files
- [ ] No field contains a `[placeholder]` pattern
- [ ] `ts-node scripts/detect-placeholders.ts` passes with zero findings
- [ ] `ts-node scripts/validate-data.ts` passes with zero errors
- [ ] `next build` completes with zero TypeScript errors
- [ ] Photo appears in gallery on `/` (Home page)
- [ ] Clicking the photo opens the full-resolution image in a new tab
- [ ] Image is served in WebP format (check Chrome DevTools Network tab)
- [ ] No layout shift on page load (CLS < 0.1)
- [ ] Gallery renders in 3-column masonry on desktop, 2-column on tablet, 1-column on mobile (RULE-G4)
- [ ] Vercel preview deployment verified before merge to `main` (RULE-B3)

**Tests to write:**
- Unit test confirming every `GalleryPhoto` object in the array has a non-empty `alt` string
- Unit test confirming `src` and `fullResSrc` are not identical for any entry
- Unit test confirming `width` and `height` are positive integers for every entry
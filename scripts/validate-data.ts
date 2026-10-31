import * as fs from 'fs'
import * as path from 'path'

const DATA_DIR = path.join(__dirname, '..', 'data')

// Mock 'server-only' so ts-node can require data modules during pre-build validation
try {
  const serverOnlyPath = require.resolve('server-only')
  require.cache[serverOnlyPath] = {
    id: serverOnlyPath,
    filename: serverOnlyPath,
    loaded: true,
    exports: {},
  } as unknown as NodeModule
} catch {
  // If not resolvable, ignore
}

interface ValidationError {
  file: string
  field: string
  entryIndex?: number
  message: string
}

function isBlank(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' && value.trim() === '') return true
  return false
}

function validateFile(filePath: string): ValidationError[] {
  const errors: ValidationError[] = []
  const fileName = path.basename(filePath)

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require(filePath)

  if (fileName === 'biography.js' || fileName === 'biography.ts') {
    const { biography } = mod
    if (!biography) {
      errors.push({ file: fileName, field: 'biography', message: 'Missing biography export' })
      return errors
    }
    if (isBlank(biography.name)) {
      errors.push({ file: fileName, field: 'name', message: 'Subject name is required' })
    }
    if (isBlank(biography.tagline)) {
      errors.push({ file: fileName, field: 'tagline', message: 'Tagline is required' })
    }
    if (!Array.isArray(biography.sections) || biography.sections.length === 0) {
      errors.push({ file: fileName, field: 'sections', message: 'At least one biography section is required' })
    } else {
      biography.sections.forEach((section: Record<string, unknown>, i: number) => {
        if (isBlank(section.id)) {
          errors.push({ file: fileName, field: `sections[${i}].id`, entryIndex: i, message: 'Section id is required' })
        }
        if (isBlank(section.heading)) {
          errors.push({ file: fileName, field: `sections[${i}].heading`, entryIndex: i, message: 'Section heading is required' })
        }
        if (isBlank(section.content)) {
          errors.push({ file: fileName, field: `sections[${i}].content`, entryIndex: i, message: 'Section content is required' })
        }
      })
    }
  }

  if (fileName === 'press.js' || fileName === 'press.ts') {
    const { pressEntries } = mod
    if (!Array.isArray(pressEntries)) {
      errors.push({ file: fileName, field: 'pressEntries', message: 'pressEntries must be an array' })
      return errors
    }
    pressEntries.forEach((entry: Record<string, unknown>, i: number) => {
      if (isBlank(entry.publication)) {
        errors.push({ file: fileName, field: `pressEntries[${i}].publication`, entryIndex: i, message: 'Publication is required' })
      }
      if (isBlank(entry.date)) {
        errors.push({ file: fileName, field: `pressEntries[${i}].date`, entryIndex: i, message: 'Date is required' })
      }
      if (isBlank(entry.title)) {
        errors.push({ file: fileName, field: `pressEntries[${i}].title`, entryIndex: i, message: 'Title is required' })
      }
      if (isBlank(entry.summary)) {
        errors.push({ file: fileName, field: `pressEntries[${i}].summary`, entryIndex: i, message: 'Summary is required' })
      }
      if (isBlank(entry.url)) {
        errors.push({ file: fileName, field: `pressEntries[${i}].url`, entryIndex: i, message: 'URL is required' })
      }
    })
  }

  if (fileName === 'work.js' || fileName === 'work.ts') {
    const { workEntries } = mod
    if (!Array.isArray(workEntries)) {
      errors.push({ file: fileName, field: 'workEntries', message: 'workEntries must be an array' })
      return errors
    }
    workEntries.forEach((entry: Record<string, unknown>, i: number) => {
      if (isBlank(entry.category)) {
        errors.push({ file: fileName, field: `workEntries[${i}].category`, entryIndex: i, message: 'Category is required' })
      }
      if (isBlank(entry.organization)) {
        errors.push({ file: fileName, field: `workEntries[${i}].organization`, entryIndex: i, message: 'Organization is required' })
      }
      if (isBlank(entry.role)) {
        errors.push({ file: fileName, field: `workEntries[${i}].role`, entryIndex: i, message: 'Role is required' })
      }
      if (isBlank(entry.startDate)) {
        errors.push({ file: fileName, field: `workEntries[${i}].startDate`, entryIndex: i, message: 'Start date is required' })
      }
      if (isBlank(entry.endDate)) {
        errors.push({ file: fileName, field: `workEntries[${i}].endDate`, entryIndex: i, message: 'End date is required' })
      }
      if (isBlank(entry.description)) {
        errors.push({ file: fileName, field: `workEntries[${i}].description`, entryIndex: i, message: 'Description is required' })
      }
    })
  }

  if (fileName === 'contact.js' || fileName === 'contact.ts') {
    const { contactInfo } = mod
    if (!contactInfo) {
      errors.push({ file: fileName, field: 'contactInfo', message: 'Missing contactInfo export' })
      return errors
    }
    if (isBlank(contactInfo.pressEmail)) {
      errors.push({ file: fileName, field: 'pressEmail', message: 'Press email is required' })
    }
    if (isBlank(contactInfo.bookingsEmail)) {
      errors.push({ file: fileName, field: 'bookingsEmail', message: 'Bookings email is required' })
    }
    if (!Array.isArray(contactInfo.socials)) {
      errors.push({ file: fileName, field: 'socials', message: 'socials must be an array' })
    }
  }

  if (fileName === 'photos.js' || fileName === 'photos.ts') {
    const { galleryPhotos } = mod
    if (!Array.isArray(galleryPhotos)) {
      errors.push({ file: fileName, field: 'galleryPhotos', message: 'galleryPhotos must be an array' })
      return errors
    }
    galleryPhotos.forEach((photo: Record<string, unknown>, i: number) => {
      if (isBlank(photo.src)) {
        errors.push({ file: fileName, field: `galleryPhotos[${i}].src`, entryIndex: i, message: 'Photo src is required' })
      }
      if (isBlank(photo.fullResSrc)) {
        errors.push({ file: fileName, field: `galleryPhotos[${i}].fullResSrc`, entryIndex: i, message: 'Photo fullResSrc is required' })
      }
      if (isBlank(photo.alt)) {
        errors.push({ file: fileName, field: `galleryPhotos[${i}].alt`, entryIndex: i, message: 'Photo alt text is required' })
      }
    })
  }

  return errors
}

function main(): void {
  const allErrors: ValidationError[] = []
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.ts') || f.endsWith('.js'))

  for (const file of files) {
    if (file.endsWith('.d.ts')) continue
    const filePath = path.join(DATA_DIR, file)
    const errors = validateFile(filePath)
    allErrors.push(...errors)
  }

  if (allErrors.length > 0) {
    console.error(`\nData validation failed with ${allErrors.length} error(s):\n`)
    for (const err of allErrors) {
      const entryPart = err.entryIndex !== undefined ? ` (entry ${err.entryIndex})` : ''
      console.error(`  ${err.file}: ${err.field}${entryPart} — ${err.message}`)
    }
    console.error('')
    process.exit(1)
  }

  console.log('Data validation passed.')
}

main()

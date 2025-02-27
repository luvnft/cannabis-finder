export function slugify(text: string): string {
  const germanCharMap: { [key: string]: string } = {
    ä: 'ae',
    ö: 'oe',
    ü: 'ue',
    ß: 'ss',
    Ä: 'Ae',
    Ö: 'Oe',
    Ü: 'Ue',
  }

  return text
    .toLowerCase()
    .replace(/[äöüßÄÖÜ]/g, match => {
      return germanCharMap[match] ?? match
    })
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

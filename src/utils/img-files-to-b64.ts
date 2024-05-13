const makeB64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = event => {
      const result = event.target?.result as string
      resolve(result)
    }
    reader.onerror = error => {
      reject(error)
    }
    reader.readAsDataURL(file)
  })
}

const processFiles = async (files: FileList): Promise<string[]> => {
  const photosPromises: Promise<string>[] = []
  for (let i = 0; i < files.length; i++) {
    photosPromises.push(makeB64(files[i]))
  }
  const photos = await Promise.all(photosPromises)
  return photos
}

export default processFiles
import * as fs from 'node:fs'
import { readFile } from 'node:fs/promises'
import * as https from 'node:https'
import { dirname } from 'node:path'

const countFileUrl = 'https://raw.githubusercontent.com/lanseria/map-data/main/data/parking-spot/count.json'
const countFilePath = 'public/parking-spot/count.json'
export function createDirectory(dirPath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirPath, { recursive: true }, (error) => {
      if (error)
        reject(error)
      else
        resolve()
    })
  })
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https.get(url, (response) => {
      response.pipe(file)
      file.on('finish', () => {
        file.close()
        resolve()
      })
    }).on('error', (error) => {
      fs.unlink(dest, () => {
        reject(error)
      })
    })
  })
}

async function downCreateFile(url, path) {
  const directoryPath = dirname(path)
  await createDirectory(directoryPath)
  await downloadFile(url, path)
  console.warn('File downloaded successfully.')
}

await downCreateFile(countFileUrl, countFilePath)
const data = await readFile(countFilePath, 'utf8')
/**
 * @type {Array<any>}
 */
const countObj = JSON.parse(data)

console.log(countObj)
countObj.forEach((item) => {
  item.children.forEach((ite) => {
    const url = `https://raw.githubusercontent.com/lanseria/map-data/main/data/parking-spot/${item.label}/${ite.label}.geojson`
    const path = `public/parking-spot/${item.label}/${ite.label}.geojson`
    downCreateFile(url, path)
  })
})
// earthQuake
await downCreateFile('https://raw.githubusercontent.com/lanseria/map-data/main/data/earth-quake/plate-boundaries-PlateInterface.geojson', 'public/earth-quake/plate-boundaries-PlateInterface.geojson')

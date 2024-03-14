export interface StyleImageInterface {
  width: number
  height: number
  data: Uint8Array | Uint8ClampedArray
  context?: CanvasRenderingContext2D | null
  render?: () => boolean
  onAdd?: (map: mapboxgl.Map, id: string) => void
  onRemove?: () => void
}
// This implements `StyleImageInterface`
// to draw a pulsing dot icon on the map.
export function pulsingDot(size = 200): StyleImageInterface {
  return {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // When the layer is added to the map,
    // get the rendering context for the map canvas.
    onAdd() {
      const canvas = document.createElement('canvas')
      canvas.width = this.width
      canvas.height = this.height
      this.context = canvas.getContext('2d')
    },

    // Call once before every frame where the icon will be used.
    render() {
      const duration = 1000
      const t = (performance.now() % duration) / duration

      const radius = (size / 2) * 0.3
      const outerRadius = (size / 2) * 0.7 * t + radius
      const context = this.context

      if (context) {
        // Draw the outer circle.
        context.clearRect(0, 0, this.width, this.height)
        context.beginPath()
        context.arc(
          this.width / 2,
          this.height / 2,
          outerRadius,
          0,
          Math.PI * 2,
        )
        context.fillStyle = `rgba(255, 200, 200, ${1 - t})`
        context.fill()

        // Draw the inner circle.
        context.beginPath()
        context.arc(
          this.width / 2,
          this.height / 2,
          radius,
          0,
          Math.PI * 2,
        )
        context.fillStyle = 'rgba(255, 100, 100, 1)'
        context.strokeStyle = 'white'
        context.lineWidth = 2 + 4 * (1 - t)
        context.fill()
        context.stroke()

        // Update this image's data with data from the canvas.
        this.data = context.getImageData(
          0,
          0,
          this.width,
          this.height,
        ).data

        // Continuously repaint the map, resulting
        // in the smooth animation of the dot.
        window.map.triggerRepaint()

        // Return `true` to let the map know that the image was updated.
        return true
      }
      else {
        return false
      }
    },
  }
}
function loadImg(name: string, url: string, sdf = false) {
  const map = window.map
  if (map.hasImage(name))
    return

  map.loadImage(url, (error, image) => {
    if (error)
      throw error
    image && map.addImage(name, image, { sdf })
  })
}
export function setMapPointImg(url: string) {
  const map = window.map
  const name = 'map-point'
  if (map.hasImage(name))
    map.removeImage(name)
  loadImg('map-point', url)
}

function createColorPoint(...color: number[]) {
  const d = 48
  const r = d / 2
  const r2 = r ** 2
  const bytesPerPixel = 4

  const data = new Uint8Array(d * d * bytesPerPixel)

  for (let x = 0; x < d; x++) {
    for (let y = 0; y < d; y++) {
      if ((x - r) ** 2 + (y - r) ** 2 >= r2)
        continue

      const offset = (y * d + x) * bytesPerPixel
      for (let b = 0; b < bytesPerPixel; b++)
        data[offset + b] = color[b]
    }
  }
  return { width: d, height: d, data }
}

/**
 * Add color points to the map.
 */
export function addColorPoint() {
  const map = window.map
  map.addImage('#00ff00', createColorPoint(80, 194, 64, 255))
  // map.addImage('#F3AE1A', createColorPoint(255, 193, 7, 255))
  map.addImage('#ff0000', createColorPoint(194, 71, 64, 255))
  // map.addImage('#BEBEBE', createColorPoint(125, 125, 125, 255))
}

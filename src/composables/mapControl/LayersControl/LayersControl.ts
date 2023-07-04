import Base from '../Base/Base'
import Button from '../Button/Button'
import type { LayerOption } from './types'

interface LayersControlOptions {
  /** Array of style options */
  layers?: LayerOption[]
  /** Triggered on style change */
  onChange?: (style: LayerOption) => void
}

export default class LayersControl extends Base {
  layers: LayerOption[]
  onChange?: (style: LayerOption) => void
  buttons: Button[]

  constructor(options?: LayersControlOptions) {
    super()
    this.layers = options?.layers ?? this.defaultOptions
    this.onChange = options?.onChange
    this.buttons = []
  }

  setLayer(layer: LayerOption) {
    const layerName = `${layer.value}-tiles`
    if (storeMapWeatherLayerEnable.value.includes(layer.value)) {
      this.map.setLayoutProperty(
        layerName,
        'visibility',
        'visible',
      )
    }
    else {
      this.map.setLayoutProperty(
        layerName,
        'visibility',
        'none',
      )
    }
  }

  insert() {
    this.addClassName('mapbox-control-layers')
    this.layers.forEach((layer) => {
      const button = new Button()
      button.setText(layer.name)
      button.onClick(() => {
        if (storeMapWeatherLayerEnable.value.includes(layer.value)) {
          storeMapWeatherLayerEnable.value.splice(
            storeMapWeatherLayerEnable.value.indexOf(layer.value),
            1,
          )
        }
        else {
          storeMapWeatherLayerEnable.value.push(layer.value)
        }
        this.setLayer(layer)
        if (this.onChange)
          this.onChange(layer)
      })
      if (storeMapWeatherLayerEnable.value.includes(layer.value))
        button.setActive(true)
      else
        button.setActive(false)

      this.buttons.push(button)
      this.addButton(button)
    })

    this.map.on('sourcedata', () => {
      this.buttons.forEach((button) => {
        button.setActive(false)
      })

      const values = this.layers.map(layer => layer.value)
      values.forEach((v, idx) => {
        if (storeMapWeatherLayerEnable.value.includes(v)) {
          const currentButton = this.buttons[idx]
          currentButton.setActive(true)
        }
        else {
          const currentButton = this.buttons[idx]
          currentButton.setActive(false)
        }
      })
    })
  }

  get defaultOptions(): LayerOption[] {
    return WEATHER_LIST
  }

  onAddControl() {
    this.insert()
  }
}

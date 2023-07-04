export interface LayerOption {
  /** Style label to display on switcher */
  name: string
  /* [Style name from spec](https://docs.mapbox.com/mapbox-gl-js/style-spec/#root-name) */
  value: string
  /* Style url */
  tiles: string
}

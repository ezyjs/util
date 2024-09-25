export type DateFormat = 'YYYY' | 'MM' | 'DD' | 'YYYY-MM' | 'YYYY-MM-DD'

export interface Config {
  [key: string]: string | number | boolean | Config
}
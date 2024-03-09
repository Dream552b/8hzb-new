import { ExampleComponentConfig } from '@/transforms/example'

import AdvancedPlayer from './01-advanced-player/index.vue'
import AdvancedPlayerRaw from './01-advanced-player/index.vue?raw'
const vueAdvanceExample: ExampleComponentConfig = {
  component: AdvancedPlayer,
  raw: AdvancedPlayerRaw,
  language: 'vue'
}

import ReactBasicPlayer from './07-react'
import ReactBasicPlayerRaw from './07-react?raw'
const reactBasicExample = {
  component: ReactBasicPlayer,
  raw: ReactBasicPlayerRaw,
  language: 'typescript'
}

const vueComponents = import.meta.glob<{ default: any }>('./*.vue', { eager: true })
const vueComponentRaws = import.meta.glob<string>('./*.vue', { as: 'raw', eager: true })
const vueExamples: Array<ExampleComponentConfig> = Object.keys(vueComponents).map((id) => ({
  component: vueComponents[id].default,
  raw: vueComponentRaws[id],
  language: 'vue'
}))

export default [vueAdvanceExample, ...vueExamples, reactBasicExample]

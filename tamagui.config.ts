import * as themes from './theme-output'
import { tokens } from '@tamagui/config/v3'
import { createTamagui } from "tamagui";

export const config = createTamagui({
    tokens,
    themes,
})

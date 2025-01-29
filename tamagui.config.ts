import * as themes from './theme-output';
import { tokens } from '@tamagui/config/v3';
import { createTamagui } from 'tamagui';
import { createAnimations } from '@tamagui/animations-react-native';

export const config = createTamagui({
  tokens,
  themes,
  animations: createAnimations({
    fast: {
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    },
    medium: {
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    slow: {
      damping: 20,
      stiffness: 60,
    },
  }),
});

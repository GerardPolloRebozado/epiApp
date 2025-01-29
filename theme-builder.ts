import { defaultSubThemes, defaultComponentThemes } from '@tamagui/themes/v3-themes';
import { createThemeBuilder } from '@tamagui/theme-builder';

const palettes = {
  light: [
    'hsla(250, 68%, 45%, 1)', // Darker blue to stand out
    'hsla(240, 20%, 100%, 1)', // Pure white
    'hsla(240, 20%, 95%, 1)', // Lightest shade for backgrounds
    'hsla(240, 20%, 85%, 1)', // Slightly darker for subtle contrast
    'hsla(240, 20%, 75%, 1)', // Moderate contrast for various elements
    'hsla(222, 28%, 95%, 1)', // Lighter blue (almost white)
    'hsla(222, 28%, 90%, 1)', // Lighter blue for background elements
    'hsla(222, 28%, 85%, 1)', // Subtle but noticeable blue for details
    'hsla(222, 28%, 80%, 1)', // Slightly deeper blue for text or accents
    'hsla(222, 28%, 75%, 1)', // Clear blue for text or buttons
    'hsla(222, 28%, 65%, 1)', // Deeper blue
    'hsla(222, 28%, 60%, 1)', // More pronounced for contrast
    'hsla(222, 28%, 50%, 1)', // Darker blue for headers
    'hsla(0, 0%, 10%, 1)', // Very dark for text (almost black)
    'hsla(0, 0%, 5%, 1)', // Near-black for very dark accents
    'hsla(0, 0%, 3%, 0.75)', // Slightly transparent black
    'hsla(0, 0%, 3%, 0.5)', // Transparent for darker background
    'hsla(0, 0%, 3%, 0.25)', // Subtle dark overlay
    'hsla(0, 0%, 0%, 0)', // Full transparency
    'hsla(250, 68%, 70%, 1)', // Light blue accent (for highlights)
  ],
  dark: [
    'hsla(250, 68%, 50%, 1)', // Slightly lighter blue for dark mode
    'hsla(220, 29%, 10%, 1)', // Very dark for background
    'hsla(220, 29%, 5%, 1)', // Darker shade for deep shadows
    'hsla(220, 29%, 10%, 0.25)', // Transparent black for layers
    'hsla(220, 29%, 10%, 0.5)', // Transparent for dark mode accents
    'hsla(222, 28%, 12%, 1)', // Darker blue shade for dark mode
    'hsla(222, 28%, 15%, 1)', // A little brighter for section divisions
    'hsla(222, 28%, 18%, 1)', // Darker sections of the UI
    'hsla(222, 28%, 22%, 1)', // Subtle contrast for lines/frames
    'hsla(222, 28%, 25%, 1)', // Light accent for visible borders
    'hsla(222, 28%, 28%, 1)', // Strong dark blue for text
    'hsla(222, 28%, 32%, 1)', // Deeper dark mode contrast
    'hsla(222, 28%, 40%, 1)', // Subtle, but distinct, text color
    'hsla(222, 28%, 45%, 1)', // Lighter dark tone for buttons
    'hsla(0, 0%, 100%, 1)', // White text in dark mode
    'hsla(0, 0%, 95%, 1)', // Lightest accent color for visibility
    'hsla(0, 0%, 90%, 0.75)', // Semi-transparent whites for hover
    'hsla(0, 0%, 85%, 0.5)', // Lighter white tones for transparency
    'hsla(0, 0%, 80%, 0.25)', // Very subtle white accents
    'hsla(0, 0%, 100%, 0)', // Full transparency for dark mode
  ],
  light_accent: [
    'hsla(222, 28%, 80%, 1)', // Lighter blue accents for highlights
    'hsla(250, 68%, 50%, 1)', // Bright blue for buttons and links
    'hsla(250, 68%, 60%, 1)', // Mid-tone blue for subtle hover effects
    'hsla(250, 68%, 65%, 1)', // Slightly deeper blue for accents
    'hsla(250, 68%, 70%, 1)', // Lightest accent blue for highlights
    'hsla(250, 68%, 72%, 1)', // Subtle accent on light backgrounds
    'hsla(250, 68%, 75%, 1)', // Bright blue text highlights
    'hsla(250, 68%, 77%, 1)', // Stronger blue for prominent sections
    'hsla(250, 68%, 80%, 1)', // More pronounced blue for action buttons
    'hsla(250, 68%, 85%, 1)', // Eye-catching blue highlights for buttons
    'hsla(250, 68%, 88%, 1)', // Lighter accent for UI elements
    'hsla(250, 68%, 90%, 1)', // Subtle accent for different sections
    'hsla(250, 68%, 92%, 1)', // Slight highlight for UI details
    'hsla(250, 68%, 95%, 1)', // Lightest blue for hover effects
    'hsla(250, 50%, 95%, 1)', // Very light blue for lighter backgrounds
    'hsla(222, 28%, 55%, 1)', // Deeper blue for contrast against light
  ],
  dark_accent: [
    'hsla(222, 28%, 40%, 1)', // Strong accent blue for dark mode
    'hsla(250, 68%, 50%, 1)', // Prominent accent color for buttons
    'hsla(250, 68%, 55%, 1)', // Brightened blue for links and hover
    'hsla(250, 68%, 60%, 1)', // Accentuating dark blue tones for sections
    'hsla(250, 68%, 65%, 1)', // Slightly lighter blue for emphasis
    'hsla(250, 68%, 70%, 1)', // Bright accent for dark mode UI
    'hsla(250, 68%, 75%, 1)', // Brighter tone for hover and focus
    'hsla(250, 68%, 80%, 1)', // Lighter accents for key elements
    'hsla(250, 68%, 85%, 1)', // Subtle but noticeable blue for text
    'hsla(250, 68%, 90%, 1)', // Lighter background blue accents
    'hsla(250, 68%, 95%, 1)', // Very light blue for accents
    'hsla(250, 50%, 95%, 1)', // Lightest possible blue for dark UI highlights
    'hsla(249, 52%, 95%, 0.75)', // Semi-transparent for hover effects
    'hsla(249, 52%, 95%, 0.5)', // Light transparent for dark UI
    'hsla(249, 52%, 95%, 0.25)', // Subtle transparency for elements
    'hsla(249, 52%, 95%, 0)', // Full transparency
  ],
};

const templates = {
  light_base: {
    accentBackground: 0,
    accentColor: 0,
    background0: 1,
    background025: 2,
    background05: 3,
    background075: 4,
    color1: 5,
    color2: 6,
    color3: 7,
    color4: 8,
    color5: 9,
    color6: 10,
    color7: 11,
    color8: 12,
    color9: 13,
    color10: 14,
    color11: 15,
    color12: 16,
    color0: -1,
    color025: -2,
    color05: -3,
    color075: -4,
    background: 5,
    backgroundHover: 4,
    backgroundPress: 6,
    backgroundFocus: 6,
    borderColor: 8,
    borderColorHover: 7,
    borderColorPress: 9,
    borderColorFocus: 8,
    color: -5,
    colorHover: -6,
    colorPress: -5,
    colorFocus: -6,
    colorTransparent: -1,
    placeholderColor: -8,
    outlineColor: -2,
  },
  light_alt1: { color: -6, colorHover: -7, colorPress: -6, colorFocus: -7 },
  light_alt2: { color: -7, colorHover: -8, colorPress: -7, colorFocus: -8 },
  light_surface1: { background: 6, backgroundHover: 5, backgroundPress: 7, backgroundFocus: 7, borderColor: 9, borderColorHover: 8, borderColorFocus: 9, borderColorPress: 10 },
  light_surface2: { background: 7, backgroundHover: 6, backgroundPress: 8, backgroundFocus: 8, borderColor: 10, borderColorHover: 9, borderColorFocus: 10, borderColorPress: 11 },
  light_surface3: { background: 8, backgroundHover: 7, backgroundPress: 9, backgroundFocus: 9, borderColor: 11, borderColorHover: 10, borderColorFocus: 11, borderColorPress: 12 },
  light_inverseSurface1: { color: 6, colorHover: 5, colorPress: 7, colorFocus: 7, background: -5, backgroundHover: -6, backgroundPress: -5, backgroundFocus: -6, borderColor: -7, borderColorHover: -8, borderColorFocus: -9, borderColorPress: -10 },
  light_inverseActive: { color: 6, colorHover: 5, colorPress: 7, colorFocus: 7, background: -7, backgroundHover: -8, backgroundPress: -7, backgroundFocus: -8, borderColor: -9, borderColorHover: -10, borderColorFocus: -11, borderColorPress: -12 },
  light_surfaceActive: { background: 10, backgroundHover: 10, backgroundPress: 11, backgroundFocus: 11, borderColor: 10, borderColorHover: 10, borderColorFocus: 11, borderColorPress: 11 },
  dark_base: {
    accentBackground: 0,
    accentColor: 0,
    background0: 1,
    background025: 2,
    background05: 3,
    background075: 4,
    color1: 5,
    color2: 6,
    color3: 7,
    color4: 8,
    color5: 9,
    color6: 10,
    color7: 11,
    color8: 12,
    color9: 13,
    color10: 14,
    color11: 15,
    color12: 16,
    color0: -1,
    color025: -2,
    color05: -3,
    color075: -4,
    background: 5,
    backgroundHover: 6,
    backgroundPress: 4,
    backgroundFocus: 4,
    borderColor: 8,
    borderColorHover: 9,
    borderColorPress: 7,
    borderColorFocus: 8,
    color: -5,
    colorHover: -6,
    colorPress: -5,
    colorFocus: -6,
    colorTransparent: -1,
    placeholderColor: -8,
    outlineColor: -2,
  },
  dark_alt1: { color: -6, colorHover: -7, colorPress: -6, colorFocus: -7 },
  dark_alt2: { color: -7, colorHover: -8, colorPress: -7, colorFocus: -8 },
  dark_surface1: { background: 6, backgroundHover: 7, backgroundPress: 5, backgroundFocus: 5, borderColor: 9, borderColorHover: 10, borderColorFocus: 9, borderColorPress: 8 },
  dark_surface2: { background: 7, backgroundHover: 8, backgroundPress: 6, backgroundFocus: 6, borderColor: 10, borderColorHover: 11, borderColorFocus: 10, borderColorPress: 9 },
  dark_surface3: { background: 8, backgroundHover: 9, backgroundPress: 7, backgroundFocus: 7, borderColor: 11, borderColorHover: 12, borderColorFocus: 11, borderColorPress: 10 },
  dark_inverseSurface1: { color: 6, colorHover: 7, colorPress: 5, colorFocus: 5, background: -5, backgroundHover: -6, backgroundPress: -5, backgroundFocus: -6, borderColor: -7, borderColorHover: -8, borderColorFocus: -9, borderColorPress: -10 },
  dark_inverseActive: { color: 6, colorHover: 7, colorPress: 5, colorFocus: 5, background: -7, backgroundHover: -8, backgroundPress: -7, backgroundFocus: -8, borderColor: -9, borderColorHover: -10, borderColorFocus: -11, borderColorPress: -12 },
  dark_surfaceActive: { background: 10, backgroundHover: 10, backgroundPress: 9, backgroundFocus: 9, borderColor: 10, borderColorHover: 10, borderColorFocus: 9, borderColorPress: 9 },
};

export const themes = createThemeBuilder()
  .addPalettes(palettes)
  .addTemplates(templates)
  .addThemes({
    light: {
      template: 'base',
      palette: 'light',
    },
    dark: {
      template: 'base',
      palette: 'dark',
    },
  })
  .addChildThemes(
    palettes.light_accent
      ? {
          accent: [
            {
              parent: 'light',
              template: 'base',
              palette: 'light_accent',
            },
            {
              parent: 'dark',
              template: 'base',
              palette: 'dark_accent',
            },
          ],
        }
      : {},
  )
  .addChildThemes(defaultSubThemes)
  .addChildThemes(defaultComponentThemes, {
    avoidNestingWithin: ['alt1', 'alt2', 'surface1', 'surface2', 'surface3', 'surface4', 'active'],
  })

  .build();

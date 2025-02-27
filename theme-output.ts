type Theme = {
  accentBackground: string;
  accentColor: string;
  background0: string;
  background025: string;
  background05: string;
  background075: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  color7: string;
  color8: string;
  color9: string;
  color10: string;
  color11: string;
  color12: string;
  color0: string;
  color025: string;
  color05: string;
  color075: string;
  background: string;
  backgroundHover: string;
  backgroundPress: string;
  backgroundFocus: string;
  borderColor: string;
  borderColorHover: string;
  borderColorPress: string;
  borderColorFocus: string;
  color: string;
  colorHover: string;
  colorPress: string;
  colorFocus: string;
  colorTransparent: string;
  placeholderColor: string;
  outlineColor: string;
};

function t(a: [number, number][]) {
  let res: Record<string, string> = {};
  for (const [ki, vi] of a) {
    res[ks[ki] as string] = vs[vi] as string;
  }
  return res as Theme;
}
const vs = [
  'hsla(250, 68%, 45%, 1)',
  'hsla(240, 20%, 100%, 1)',
  'hsla(240, 20%, 95%, 1)',
  'hsla(240, 20%, 85%, 1)',
  'hsla(240, 20%, 75%, 1)',
  'hsla(222, 28%, 95%, 1)',
  'hsla(222, 28%, 90%, 1)',
  'hsla(222, 28%, 85%, 1)',
  'hsla(222, 28%, 80%, 1)',
  'hsla(222, 28%, 75%, 1)',
  'hsla(222, 28%, 65%, 1)',
  'hsla(222, 28%, 60%, 1)',
  'hsla(222, 28%, 50%, 1)',
  'hsla(0, 0%, 10%, 1)',
  'hsla(0, 0%, 5%, 1)',
  'hsla(0, 0%, 3%, 0.75)',
  'hsla(0, 0%, 3%, 0.5)',
  'hsla(0, 0%, 0%, 0)',
  'hsla(0, 0%, 3%, 0.25)',
  'hsla(250, 68%, 50%, 1)',
  'hsla(220, 29%, 10%, 1)',
  'hsla(220, 29%, 5%, 1)',
  'hsla(220, 29%, 10%, 0.25)',
  'hsla(220, 29%, 10%, 0.5)',
  'hsla(222, 28%, 12%, 1)',
  'hsla(222, 28%, 15%, 1)',
  'hsla(222, 28%, 18%, 1)',
  'hsla(222, 28%, 22%, 1)',
  'hsla(222, 28%, 25%, 1)',
  'hsla(222, 28%, 28%, 1)',
  'hsla(222, 28%, 32%, 1)',
  'hsla(222, 28%, 40%, 1)',
  'hsla(222, 28%, 45%, 1)',
  'hsla(0, 0%, 100%, 1)',
  'hsla(0, 0%, 95%, 1)',
  'hsla(0, 0%, 90%, 0.75)',
  'hsla(0, 0%, 80%, 0.25)',
  'hsla(0, 0%, 85%, 0.5)',
  'hsla(250, 68%, 60%, 1)',
  'hsla(250, 68%, 65%, 1)',
  'hsla(250, 68%, 70%, 1)',
  'hsla(250, 68%, 72%, 1)',
  'hsla(250, 68%, 75%, 1)',
  'hsla(250, 68%, 77%, 1)',
  'hsla(250, 68%, 80%, 1)',
  'hsla(250, 68%, 85%, 1)',
  'hsla(250, 68%, 88%, 1)',
  'hsla(250, 68%, 90%, 1)',
  'hsla(250, 68%, 92%, 1)',
  'hsla(250, 68%, 95%, 1)',
  'hsla(250, 50%, 95%, 1)',
  'hsla(222, 28%, 55%, 1)',
  'hsla(250, 68%, 55%, 1)',
  'hsla(249, 52%, 95%, 0.75)',
  'hsla(249, 52%, 95%, 0.5)',
  'hsla(249, 52%, 95%, 0.25)',
  'hsla(249, 52%, 95%, 0)',
  'rgba(0,0,0,0.5)',
  'rgba(0,0,0,0.8)',
];

const ks = [
  'accentBackground',
  'accentColor',
  'background0',
  'background025',
  'background05',
  'background075',
  'color1',
  'color2',
  'color3',
  'color4',
  'color5',
  'color6',
  'color7',
  'color8',
  'color9',
  'color10',
  'color11',
  'color12',
  'color0',
  'color025',
  'color05',
  'color075',
  'background',
  'backgroundHover',
  'backgroundPress',
  'backgroundFocus',
  'borderColor',
  'borderColorHover',
  'borderColorPress',
  'borderColorFocus',
  'color',
  'colorHover',
  'colorPress',
  'colorFocus',
  'colorTransparent',
  'placeholderColor',
  'outlineColor',
];

const n1 = t([
  [0, 0],
  [1, 0],
  [2, 1],
  [3, 2],
  [4, 3],
  [5, 4],
  [6, 5],
  [7, 6],
  [8, 7],
  [9, 8],
  [10, 9],
  [11, 10],
  [12, 11],
  [13, 12],
  [14, 13],
  [15, 14],
  [16, 15],
  [17, 16],
  [18, 17],
  [19, 18],
  [20, 16],
  [21, 15],
  [22, 5],
  [23, 4],
  [24, 6],
  [25, 6],
  [26, 8],
  [27, 7],
  [28, 9],
  [29, 8],
  [30, 14],
  [31, 13],
  [32, 14],
  [33, 13],
  [34, 17],
  [35, 11],
  [36, 18],
]);

export const light = n1;
const n2 = t([
  [0, 19],
  [1, 19],
  [2, 20],
  [3, 21],
  [4, 22],
  [5, 23],
  [6, 24],
  [7, 25],
  [8, 26],
  [9, 27],
  [10, 28],
  [11, 29],
  [12, 30],
  [13, 31],
  [14, 32],
  [15, 33],
  [16, 34],
  [17, 35],
  [18, 36],
  [19, 37],
  [20, 35],
  [21, 34],
  [22, 24],
  [23, 25],
  [24, 23],
  [25, 23],
  [26, 27],
  [27, 28],
  [28, 26],
  [29, 27],
  [30, 33],
  [31, 32],
  [32, 33],
  [33, 32],
  [34, 36],
  [35, 30],
  [36, 37],
]);

export const dark = n2;
const n3 = t([
  [0, 8],
  [1, 8],
  [2, 19],
  [3, 38],
  [4, 39],
  [5, 40],
  [6, 41],
  [7, 42],
  [8, 43],
  [9, 44],
  [10, 45],
  [11, 46],
  [12, 47],
  [13, 48],
  [14, 49],
  [15, 50],
  [16, 51],
  [17, 51],
  [18, 50],
  [19, 49],
  [20, 48],
  [21, 47],
  [22, 41],
  [23, 40],
  [24, 42],
  [25, 42],
  [26, 44],
  [27, 43],
  [28, 45],
  [29, 44],
  [30, 46],
  [31, 45],
  [32, 46],
  [33, 45],
  [34, 50],
  [35, 43],
  [36, 49],
]);

export const light_accent = n3;
const n4 = t([
  [0, 31],
  [1, 31],
  [2, 19],
  [3, 52],
  [4, 38],
  [5, 39],
  [6, 40],
  [7, 42],
  [8, 44],
  [9, 45],
  [10, 47],
  [11, 49],
  [12, 50],
  [13, 53],
  [14, 54],
  [15, 55],
  [16, 56],
  [17, 56],
  [18, 55],
  [19, 54],
  [20, 53],
  [21, 50],
  [22, 40],
  [23, 42],
  [24, 39],
  [25, 39],
  [26, 45],
  [27, 47],
  [28, 44],
  [29, 45],
  [30, 49],
  [31, 47],
  [32, 49],
  [33, 47],
  [34, 55],
  [35, 44],
  [36, 54],
]);

export const dark_accent = n4;
const n5 = t([
  [30, 13],
  [31, 12],
  [32, 13],
  [33, 12],
]);

export const light_alt1 = n5;
const n6 = t([
  [30, 12],
  [31, 11],
  [32, 12],
  [33, 11],
]);

export const light_alt2 = n6;
const n7 = t([
  [22, 8],
  [23, 7],
  [24, 9],
  [25, 9],
  [26, 11],
  [27, 10],
  [29, 11],
  [28, 12],
]);

export const light_active = n7;
export const light_surface3 = n7;
export const light_Button = n7;
export const light_SliderTrackActive = n7;
const n8 = t([
  [22, 6],
  [23, 5],
  [24, 7],
  [25, 7],
  [26, 9],
  [27, 8],
  [29, 9],
  [28, 10],
]);

export const light_surface1 = n8;
export const light_ListItem = n8;
export const light_SelectTrigger = n8;
export const light_Card = n8;
export const light_Progress = n8;
export const light_TooltipArrow = n8;
export const light_SliderTrack = n8;
export const light_Input = n8;
export const light_TextArea = n8;
const n9 = t([
  [22, 7],
  [23, 6],
  [24, 8],
  [25, 8],
  [26, 10],
  [27, 9],
  [29, 10],
  [28, 11],
]);

export const light_surface2 = n9;
export const light_Checkbox = n9;
export const light_Switch = n9;
export const light_TooltipContent = n9;
export const light_RadioGroupItem = n9;
const n10 = t([
  [22, 10],
  [23, 10],
  [24, 11],
  [25, 11],
  [26, 10],
  [27, 10],
  [29, 11],
  [28, 11],
]);

export const light_surface4 = n10;
const n11 = t([
  [30, 32],
  [31, 31],
  [32, 32],
  [33, 31],
]);

export const dark_alt1 = n11;
const n12 = t([
  [30, 31],
  [31, 30],
  [32, 31],
  [33, 30],
]);

export const dark_alt2 = n12;
const n13 = t([
  [22, 27],
  [23, 28],
  [24, 26],
  [25, 26],
  [26, 30],
  [27, 31],
  [29, 30],
  [28, 29],
]);

export const dark_active = n13;
export const dark_surface3 = n13;
export const dark_Button = n13;
export const dark_SliderTrackActive = n13;
const n14 = t([
  [22, 25],
  [23, 26],
  [24, 24],
  [25, 24],
  [26, 28],
  [27, 29],
  [29, 28],
  [28, 27],
]);

export const dark_surface1 = n14;
export const dark_ListItem = n14;
export const dark_SelectTrigger = n14;
export const dark_Card = n14;
export const dark_Progress = n14;
export const dark_TooltipArrow = n14;
export const dark_SliderTrack = n14;
export const dark_Input = n14;
export const dark_TextArea = n14;
const n15 = t([
  [22, 26],
  [23, 27],
  [24, 25],
  [25, 25],
  [26, 29],
  [27, 30],
  [29, 29],
  [28, 28],
]);

export const dark_surface2 = n15;
export const dark_Checkbox = n15;
export const dark_Switch = n15;
export const dark_TooltipContent = n15;
export const dark_RadioGroupItem = n15;
const n16 = t([
  [22, 29],
  [23, 29],
  [24, 28],
  [25, 28],
  [26, 29],
  [27, 29],
  [29, 28],
  [28, 28],
]);

export const dark_surface4 = n16;
const n17 = t([
  [30, 45],
  [31, 44],
  [32, 45],
  [33, 44],
]);

export const light_accent_alt1 = n17;
export const dark_accent_alt2 = n17;
const n18 = t([
  [30, 44],
  [31, 43],
  [32, 44],
  [33, 43],
]);

export const light_accent_alt2 = n18;
const n19 = t([
  [22, 44],
  [23, 43],
  [24, 45],
  [25, 45],
  [26, 47],
  [27, 46],
  [29, 47],
  [28, 48],
]);

export const light_accent_active = n19;
export const light_accent_surface3 = n19;
export const light_accent_Button = n19;
export const light_accent_SliderTrackActive = n19;
const n20 = t([
  [22, 42],
  [23, 41],
  [24, 43],
  [25, 43],
  [26, 45],
  [27, 44],
  [29, 45],
  [28, 46],
]);

export const light_accent_surface1 = n20;
export const light_accent_ListItem = n20;
export const light_accent_SelectTrigger = n20;
export const light_accent_Card = n20;
export const light_accent_Progress = n20;
export const light_accent_TooltipArrow = n20;
export const light_accent_SliderTrack = n20;
export const light_accent_Input = n20;
export const light_accent_TextArea = n20;
const n21 = t([
  [22, 43],
  [23, 42],
  [24, 44],
  [25, 44],
  [26, 46],
  [27, 45],
  [29, 46],
  [28, 47],
]);

export const light_accent_surface2 = n21;
export const light_accent_Checkbox = n21;
export const light_accent_Switch = n21;
export const light_accent_TooltipContent = n21;
export const light_accent_RadioGroupItem = n21;
const n22 = t([
  [22, 46],
  [23, 46],
  [24, 47],
  [25, 47],
  [26, 46],
  [27, 46],
  [29, 47],
  [28, 47],
]);

export const light_accent_surface4 = n22;
const n23 = t([
  [30, 47],
  [31, 45],
  [32, 47],
  [33, 45],
]);

export const dark_accent_alt1 = n23;
const n24 = t([
  [22, 45],
  [23, 47],
  [24, 44],
  [25, 44],
  [26, 50],
  [27, 53],
  [29, 50],
  [28, 49],
]);

export const dark_accent_active = n24;
export const dark_accent_surface3 = n24;
export const dark_accent_Button = n24;
export const dark_accent_SliderTrackActive = n24;
const n25 = t([
  [22, 42],
  [23, 44],
  [24, 40],
  [25, 40],
  [26, 47],
  [27, 49],
  [29, 47],
  [28, 45],
]);

export const dark_accent_surface1 = n25;
export const dark_accent_ListItem = n25;
export const dark_accent_SelectTrigger = n25;
export const dark_accent_Card = n25;
export const dark_accent_Progress = n25;
export const dark_accent_TooltipArrow = n25;
export const dark_accent_SliderTrack = n25;
export const dark_accent_Input = n25;
export const dark_accent_TextArea = n25;
const n26 = t([
  [22, 44],
  [23, 45],
  [24, 42],
  [25, 42],
  [26, 49],
  [27, 50],
  [29, 49],
  [28, 47],
]);

export const dark_accent_surface2 = n26;
export const dark_accent_Checkbox = n26;
export const dark_accent_Switch = n26;
export const dark_accent_TooltipContent = n26;
export const dark_accent_RadioGroupItem = n26;
const n27 = t([
  [22, 49],
  [23, 49],
  [24, 47],
  [25, 47],
  [26, 49],
  [27, 49],
  [29, 47],
  [28, 47],
]);

export const dark_accent_surface4 = n27;
const n28 = t([
  [30, 6],
  [31, 5],
  [32, 7],
  [33, 7],
  [22, 14],
  [23, 13],
  [24, 14],
  [25, 13],
  [26, 12],
  [27, 11],
  [29, 10],
  [28, 9],
]);

export const light_SwitchThumb = n28;
export const light_SliderThumb = n28;
export const light_Tooltip = n28;
export const light_ProgressIndicator = n28;
const n29 = t([[22, 57]]);

export const light_SheetOverlay = n29;
export const light_DialogOverlay = n29;
export const light_ModalOverlay = n29;
export const light_accent_SheetOverlay = n29;
export const light_accent_DialogOverlay = n29;
export const light_accent_ModalOverlay = n29;
const n30 = t([
  [30, 25],
  [31, 26],
  [32, 24],
  [33, 24],
  [22, 33],
  [23, 32],
  [24, 33],
  [25, 32],
  [26, 31],
  [27, 30],
  [29, 29],
  [28, 28],
]);

export const dark_SwitchThumb = n30;
export const dark_SliderThumb = n30;
export const dark_Tooltip = n30;
export const dark_ProgressIndicator = n30;
const n31 = t([[22, 58]]);

export const dark_SheetOverlay = n31;
export const dark_DialogOverlay = n31;
export const dark_ModalOverlay = n31;
export const dark_accent_SheetOverlay = n31;
export const dark_accent_DialogOverlay = n31;
export const dark_accent_ModalOverlay = n31;
const n32 = t([
  [30, 42],
  [31, 41],
  [32, 43],
  [33, 43],
  [22, 46],
  [23, 45],
  [24, 46],
  [25, 45],
  [26, 44],
  [27, 43],
  [29, 42],
  [28, 41],
]);

export const light_accent_SwitchThumb = n32;
export const light_accent_SliderThumb = n32;
export const light_accent_Tooltip = n32;
export const light_accent_ProgressIndicator = n32;
const n33 = t([
  [30, 42],
  [31, 44],
  [32, 40],
  [33, 40],
  [22, 49],
  [23, 47],
  [24, 49],
  [25, 47],
  [26, 45],
  [27, 44],
  [29, 42],
  [28, 40],
]);

export const dark_accent_SwitchThumb = n33;
export const dark_accent_SliderThumb = n33;
export const dark_accent_Tooltip = n33;
export const dark_accent_ProgressIndicator = n33;

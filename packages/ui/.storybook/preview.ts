// packages/ui/.storybook/preview.ts
import type { Preview, Decorator } from '@storybook/react'; // 使用类型导入
import { withThemeByClassName } from '@storybook/addon-themes';

/*
CRUCIAL: Import your compiled Tailwind CSS.
This assumes your `build:css` script outputs to `../dist/styles.css`
relative to this preview.ts file.
Ensure `@luno/ui` is built once (`pnpm --filter @luno/ui build`) before running Storybook
so that dist/styles.css exists.
*/
import '../dist/styles.css'; // 路径相对于 .storybook 目录

export const decorators: Decorator[] = [ // 明确 Decorator 类型
  withThemeByClassName({
    themes: {
      light: '',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

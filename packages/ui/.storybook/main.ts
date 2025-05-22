// packages/ui/.storybook/main.mjs
/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addon: [
    '@storybook/addon-essentials', // Includes controls, actions, viewport, etc.
    '@storybook/addon-themes',   // For theme toggling
    '@storybook/blocks'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag', // Generates basic documentation for components
  },
  // Optional: If you need to customize Vite config for Storybook
  // async viteFinal(config) {
  //   // Merge custom configuration into the default Vite config
  //   return config;
  // },
  async viteFinal(config) {
    // Merge custom configuration into the default Vite config
    if (!config.resolve) config.resolve = {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'), // 确保路径正确指向 packages/ui/src
    };
    return config;
  },
};
export default config;

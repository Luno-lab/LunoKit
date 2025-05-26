import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ConnectButton } from './index';
import { useLunoTheme } from '../../providers/ThemeContext';

const meta: Meta<typeof ConnectButton> = {
  title: 'Components/ConnectButton',
  component: ConnectButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: {
      control: 'text',
    },
    accountStatus: {
      control: 'select',
      options: ['full', 'address'],
    },
    chainStatus: {
      control: 'select',
      options: ['full', 'icon', 'name', 'none'],
    },
    showBalance: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConnectButton>;

// 普通的 stories
export const Default: Story = {
  args: {
    size: 'md',
    label: 'Connect Wallet',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Connect Wallet',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Connect Wallet',
  },
};

// 带主题切换的 story - 正确的写法
export const WithThemeToggle: Story = {
  render: (args) => {
    // hooks 在 render 函数内部使用
    const { themeMode, toggleTheme } = useLunoTheme();

    return (
      <div className="space-y-4">
        {/* 主题切换按钮 */}
        <div className="flex items-center justify-center">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            切换到 {themeMode === 'light' ? 'Dark' : 'Light'} 主题
          </button>
        </div>

        {/* 显示当前主题 */}
        <div className="text-center text-sm text-gray-600">
          当前主题: {themeMode}
        </div>

        {/* ConnectButton */}
        <div className="flex justify-center">
          <ConnectButton {...args} />
        </div>
      </div>
    );
  },
  args: {
    variant: 'default',
    size: 'md',
    label: 'Connect Wallet',
  },
};

// 所有变体对比 - 正确的写法
export const AllVariantsWithThemeToggle: Story = {
  render: (args) => {
    // hooks 在 render 函数内部使用
    const { themeMode, toggleTheme } = useLunoTheme();

    return (
      <div className="space-y-6">
        {/* 主题切换按钮 */}
        <div className="flex items-center justify-center">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            切换到 {themeMode === 'light' ? 'Dark' : 'Light'} 主题
          </button>
        </div>

        {/* 显示当前主题 */}
        <div className="text-center text-sm">
          当前主题: <strong>{themeMode}</strong>
        </div>

        {/* 所有变体 */}
        <div className="grid grid-cols-2 gap-4 max-w-2xl">
          <div className="space-y-2 text-center">
            <h3 className="text-sm font-medium">sm</h3>
            <ConnectButton {...args} size="sm" />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-sm font-medium">md</h3>
            <ConnectButton {...args} size="md" />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-sm font-medium">lg</h3>
            <ConnectButton {...args} size="lg" />
          </div>

        </div>
      </div>
    );
  },
  args: {
    size: 'md',
    label: 'Connect Wallet',
  },
};

export const CustomLabel: Story = {
  render: (args) => {
    const { themeMode, toggleTheme } = useLunoTheme();

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            切换到 {themeMode === 'light' ? 'Dark' : 'Light'} 主题
          </button>
        </div>
        <div className="text-center text-sm text-gray-600">
          当前主题: {themeMode}
        </div>
        <div className="flex justify-center">
          <ConnectButton {...args} />
        </div>
      </div>
    );
  },
  args: {
    variant: 'default',
    size: 'md',
    label: '连接钱包',
  },
};

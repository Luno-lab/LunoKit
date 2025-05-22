// packages/ui/src/components/ConnectButton/ConnectButton.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ConnectButton } from './ConnectButton';

const meta: Meta<typeof ConnectButton> = {
  title: 'Components/ConnectButton',
  component: ConnectButton,
  parameters: {
    layout: 'centered', // Centers the component in the Canvas tab
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    children: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    }
  },
};

export default meta;
type Story = StoryObj<typeof ConnectButton>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete Item',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Learn More',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Action',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Dismiss',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Visit Website',
  },
};

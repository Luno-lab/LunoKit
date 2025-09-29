import type React from 'react';
import { ChainList } from '../ChainList';

interface ViewComponent extends React.FC<SwitchChainViewProps> {
  title?: string;
}

interface SwitchChainViewProps {
  onBack: () => void;
}

export const SwitchChainView: ViewComponent = ({ onBack }) => {
  return <ChainList className={'p-4 pt-0'} />
}

SwitchChainView.title = 'Select Networks';

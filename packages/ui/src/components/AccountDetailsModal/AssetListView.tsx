import type React from 'react';
import { AssetList } from '../AssetList';

interface ViewComponent extends React.FC {
  title?: string;
}

export const AssetListView: ViewComponent = () => {
  return (
    <div className={'relative'}>
      <AssetList />
    </div>
  );
};

AssetListView.title = 'View Assets';

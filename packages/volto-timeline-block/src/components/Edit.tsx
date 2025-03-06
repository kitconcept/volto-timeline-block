import React from 'react';

import TimelineView from './View.tsx';
import { SidebarPortal, BlockDataForm } from '@plone/volto/components';
import { layoutSchema } from './schema';
import type { timelineData } from './View.tsx';
import type { BlockEditProps } from '@plone/types';

interface timelineEditProps extends BlockEditProps {
  '@type': string;
  data: timelineData;
  block: string;
  onChangeBlock: (blockId: string, newData: timelineData) => void;
  selected: boolean;
}

const TimelineEdit = (props: timelineEditProps) => {
  const { data, block, onChangeBlock, selected } = props;

  return (
    <>
      <TimelineView {...props} isEditMode />
      <SidebarPortal selected={selected}>
        <BlockDataForm
          {...props}
          data={data}
          block={block}
          schema={layoutSchema(props)}
          onChangeBlock={onChangeBlock}
          formData={data}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
        />
      </SidebarPortal>
    </>
  );
};

export default TimelineEdit;

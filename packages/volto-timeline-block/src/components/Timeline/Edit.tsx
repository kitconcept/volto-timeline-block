import { useIntl } from 'react-intl';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import BlockDataForm from '@plone/volto/components/manage/Form/BlockDataForm';
import { layoutSchema } from './schema';
import TimelineView from './View';
import type { BlockEditProps } from '@plone/types';

const TimelineEdit = (props: BlockEditProps) => {
  const { data, block, onChangeBlock, selected } = props;
  const intl = useIntl();

  return (
    <>
      <TimelineView {...props} isEditMode />
      <SidebarPortal selected={selected}>
        <BlockDataForm
          {...props}
          data={data}
          block={block}
          schema={layoutSchema({ props, intl })}
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

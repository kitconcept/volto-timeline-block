import type { BlockConfigBase } from '@plone/types';
import timelineSVG from '@plone/volto/icons/settings.svg';
import TimelineEdit from './Edit';
import TimelineView from './View';
import { layoutSchema, ButtonStylingSchema } from './schema';

const blockConfig: BlockConfigBase = {
    id: 'timeline',
    title: 'Timeline',
    icon: timelineSVG,
    group: 'common',
    view: TimelineView,
    edit: TimelineEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    schema: layoutSchema,
    schemaEnhancer: ButtonStylingSchema,
};

export default blockConfig;

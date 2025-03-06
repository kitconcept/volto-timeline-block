import React from 'react';
import timelineSVG from '@plone/volto/icons/settings.svg';
import TimelineEdit from './components/Edit';
import TimelineView from './components/View';
import type { ConfigType } from '@plone/registry';

import { ButtonStylingSchema, defaultStylingSchema } from './components/schema';
import './theme/widget.scss';

import TimelineListingBlockTemplate from './components/Listing/TimelineTemplate';

import type { BlocksObjectWidgetProps } from '@kitconcept/volto-light-theme/components/Widgets/BlocksObjectWidget';
import BlocksObjectWidget from '@kitconcept/volto-light-theme/components/Widgets/BlocksObjectWidget';
import ColorPickerWidget from '@kitconcept/volto-light-theme/components/Widgets/BlocksObjectWidget';

declare module '@plone/types' {
  export interface BlockConfigBase {
    allowed_headline_tags?: string[][];
  }

  export interface BlocksConfigData {
    //timeline
    timeline: React.ComponentType<any>;
  }
  export interface WidgetsConfigByWidget {
    blocksObjectWidget: React.FC<BlocksObjectWidgetProps>;
  }
  export interface WidgetsConfigByType {
    timeline: React.FC<BlocksObjectWidgetProps>;
  }
}

const applyConfig = (config: ConfigType) => {
  // Palettes
  config.blocks.themes = [
    {
      style: {
        '--theme-color': '#fff', // Block Wrapper
        '--theme-high-contrast-color': '#ecebeb', // Cards in Grid block
        '--theme-foreground-color': '#000',
        '--theme-low-contrast-foreground-color': '#555555',
      },
      name: 'default',
      label: 'Default',
    },
    {
      style: {
        '--theme-color': '#ecebeb',
        '--theme-high-contrast-color': '#fff',
        '--theme-foreground-color': '#000',
        '--theme-low-contrast-foreground-color': '#555555',
      },
      name: 'grey',
      label: 'Grey',
    },
  ];

  config.blocks.blocksConfig.listing = {
    ...config.blocks.blocksConfig.listing,
    schemaEnhancer: defaultStylingSchema,
    allowed_headline_tags: [['h2', 'h2']],
    variations: [
      ...config.blocks.blocksConfig.listing.variations,
      {
        id: 'timeline',
        title: 'Timeline',
        template: TimelineListingBlockTemplate,
      },
    ],
  };

  config.blocks.blocksConfig.timeline = {
    id: 'timeline',
    title: 'Timeline',
    group: 'common',
    icon: timelineSVG,
    view: TimelineView,
    edit: TimelineEdit,
    mostUsed: true,
    sidebarTab: 1,

    schemaEnhancer: ButtonStylingSchema,
  };

  config.widgets.widget.blocksObjectWidget = BlocksObjectWidget;
  config.widgets.type.timeline = BlocksObjectWidget;
  config.widgets.widget.color_picker = ColorPickerWidget;
  return config;
};

export default applyConfig;

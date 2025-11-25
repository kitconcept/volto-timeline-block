import type { ConfigType } from '@plone/registry';
import installSettings from './config/settings';
import type { BlockConfigBase } from '@plone/types';
import { defaultStylingSchema } from './components/Timeline/schema';
import TimelineTemplate from './components/Listing/TimelineTemplate';
import blockConfig from './components/Timeline';


declare module '@plone/types' {
  export interface BlocksConfigData {
    timeline: BlockConfigBase;
  }
}

function applyConfig(config: ConfigType) {
  installSettings(config);
  config.blocks.blocksConfig.listing = {
    ...config.blocks.blocksConfig.listing,
    schemaEnhancer: defaultStylingSchema,
    variations: [
      ...config.blocks.blocksConfig.listing.variations,
      {
        id: 'timeline',
        title: 'Timeline',
        template: TimelineTemplate,
      },
    ],
  };
  config.blocks.blocksConfig.timeline = blockConfig;
  return config;
}

export default applyConfig;

import { defineMessages } from 'react-intl';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';
import config from '@plone/volto/registry';
import type { BlockEditProps } from '@plone/types';
import type { IntlShape } from 'react-intl';

const messages = defineMessages({
  Default: {
    defaultMessage: 'Default',
    id: 'default',
  },
  content: {
    defaultMessage: 'Description',
    id: 'content',
  },
  item: {
    defaultMessage: 'Timeline',
    id: 'Timeline',
  },
  addTimeline: {
    defaultMessage: 'Add Timeline',
    id: 'addTimeline',
  },
  title: {
    defaultMessage: 'Title',
    id: 'title',
  },
  timeline: {
    defaultMessage: 'Timeline',
    id: 'timeline',
  },
  time: {
    defaultMessage: 'Title',
    id: 'time',
  },
  backgroundColor: {
    id: 'Background color',
    defaultMessage: 'Background color',
  },
});

const timelineSchema = ({
  props,
  intl,
}: {
  props: BlockEditProps;
  intl: IntlShape;
}) => {
  return {
    title: intl.formatMessage(messages.item),
    addMessage: intl.formatMessage(messages.addTimeline),
    fieldsets: [
      {
        id: 'default',
        title: intl.formatMessage(messages.Default),
        fields: ['time', 'content'],
      },
    ],
    properties: {
      title: {
        title: intl.formatMessage(messages.title),
      },

      content: {
        title: intl.formatMessage(messages.content),
        widget: 'textarea',
      },
      time: {
        title: intl.formatMessage(messages.time),
        type: 'Text',
      },
    },

    required: [],
  };
};

export const layoutSchema = ({
  props,
  intl,
}: {
  props: BlockEditProps;
  intl: IntlShape;
}) => {
  return {
    title: intl.formatMessage(messages.title),
    fieldsets: [
      {
        id: 'default',
        title: intl.formatMessage(messages.Default),
        fields: ['data'],
      },
    ],
    properties: {
      data: {
        title: intl.formatMessage(messages.timeline),
        type: 'timeline',
        widget: 'object_list',
        schema: timelineSchema({ props, intl }),
      },
    },
    required: ['data'],
  };
};
export const TimelineStylingSchema = ({ schema, formData, intl }) => {
  defaultStylingSchema({ schema, formData, intl });
  return schema;
};

export const defaultStylingSchema = ({ schema, formData, intl }) => {
  const themes =
    config.blocks?.blocksConfig?.[formData['@type']]?.themes ||
    config.blocks.themes;

  const defaultTheme =
    config.blocks?.blocksConfig?.[formData['@type']]?.defaultTheme ||
    // The default color is the first color in the themes list
    config.blocks.themes?.[0].name;

  addStyling({ schema, intl });

  const stylingIndex = schema.fieldsets.findIndex(
    (item) => item.id === 'styling',
  );
  schema.fieldsets[stylingIndex].fields = [
    ...schema.fieldsets[stylingIndex].fields,
    'theme',
  ];
  schema.properties.theme = {
    widget: 'color_picker',
    title: intl.formatMessage(messages.backgroundColor),
    themes,
    default: defaultTheme,
  };

  return schema;
};

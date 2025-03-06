import { defineMessages } from 'react-intl';

import { cloneDeepSchema } from '@plone/volto/helpers/Utils/Utils';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';
import config from '@plone/volto/registry';
import type { BlockEditProps, JSONSchema } from '@plone/types';

interface timelineSchemaProps extends JSONSchema {
  addMessage: string;
}
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

const timelineSchema = (props: BlockEditProps) => {
  const intl = props.intl;
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
        type: 'Text',
      },
      time: {
        title: intl.formatMessage(messages.time),
        type: 'Text',
      },
    },

    required: [],
  };
};

const toggleIconField = (schema: timelineSchemaProps) => {
  const cloned = cloneDeepSchema(schema);
  cloned.fieldsets[0].fields = [...cloned.fieldsets[0].fields];

  return cloned;
};

export const layoutSchema = (props: BlockEditProps) => {
  const intl = props.intl;
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
        schema: timelineSchema(props),
        schemaExtender: toggleIconField,
      },
    },

    required: ['data'],
  };
};
export const ButtonStylingSchema = ({ schema, formData, intl }) => {
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
    (item: { id: string }) => item.id === 'styling',
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

export const removeStylingSchema = ({ schema, formData, intl }) => {
  schema.fieldsets = schema.fieldsets.filter(
    (item: { id: string }) => item.id !== 'styling',
  );
  return schema;
};

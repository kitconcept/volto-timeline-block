import React, { useRef } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Message } from 'semantic-ui-react';
import cx from 'classnames';
import { defineMessages, useIntl } from 'react-intl';
import type { BlockViewProps } from '@plone/types';

const messages = defineMessages({
  PleaseAddTimeline: {
    id: 'Please add Timeline contents here',
    defaultMessage: 'Please add Timeline contents here',
  },
});

interface timelineViewProps extends BlockViewProps {
  '@type': string;
  data: timelineData;
  isEditMode: boolean;
}
export type timelineData = {
  data: {
    blocks: timelineBlock;
    blocks_layout: {
      items: string[];
    };
  };
  gap: string;
  style: string;
};
type timelineBlock = {
  content: string;
};

const TimelineView = (props: timelineViewProps) => {
  const intl = useIntl();
  const index = useRef(0);
  const { isEditMode } = props;
  const { data } = props.data;

  return (
    <>
      <div className="timeline-block">
        <ul className="timeline">
          {!isEmpty(data?.blocks)
            ? data.blocks_layout.items.map((itemId, count) => {
                index.current = count;

                const positions = index.current % 2 === 0 ? 'right' : 'left';

                return (
                  <li key={itemId} className={cx('timeline-item', positions)}>
                    <div className="timeline-separator">
                      <span
                        className={cx('timeline-dot', ['outlined', 'gap'])}
                      ></span>
                      {data?.blocks_layout.items.length - 1 > count && (
                        <span className="timeline-connector"></span>
                      )}
                    </div>

                    <div className={cx('timeline-content', positions)}>
                      {data?.blocks?.[itemId]?.time && (
                        <div className="timeline-time">
                          {data?.blocks?.[itemId]?.time}
                        </div>
                      )}
                      <div className="timeline-data">
                        {data?.blocks?.[itemId]?.content}
                      </div>
                    </div>
                  </li>
                );
              })
            : isEmpty(data?.blocks) &&
              isEditMode && (
                <Message>
                  <div className="grid-teaser-item default">
                    <p>{intl.formatMessage(messages.PleaseAddTimeline)}</p>
                  </div>
                </Message>
              )}
        </ul>
      </div>
    </>
  );
};

export default TimelineView;

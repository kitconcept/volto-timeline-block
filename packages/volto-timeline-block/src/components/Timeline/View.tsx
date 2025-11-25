import { useRef } from 'react';
import cx from 'classnames';
import { defineMessages, useIntl } from 'react-intl';
import type { BlockViewProps } from '@plone/types';

const messages = defineMessages({
  PleaseAddTimeline: {
    id: 'Please add Timeline contents here',
    defaultMessage: 'Please add Timeline contents here',
  },
});
type timelineItem = {
  content: string;
  time?: string;
  '@id': string;
}[];
const TimelineView = (props: BlockViewProps) => {
  const intl = useIntl();
  const index = useRef(0);

  const { isEditMode } = props;
  const data = props.data.data as timelineItem;
  return (
    <>
      <div className="timeline-block">
        <ul className="timeline">
          {Array.isArray(data) && data.length > 0
            ? data.length > 0 &&
              data.map((item, count) => {
                index.current = count;
                const positions = index.current % 2 === 0 ? 'right' : 'left';

                return (
                  <li
                    key={item['@id']}
                    className={cx('timeline-item', positions)}
                  >
                    <div className="timeline-separator">
                      <span
                        className={cx('timeline-dot', ['outlined', 'gap'])}
                      ></span>
                      {data.length - 1 > count && (
                        <span className="timeline-connector"></span>
                      )}
                    </div>

                    <div className={cx('timeline-content', positions)}>
                      {item.time && (
                        <div className="timeline-time">{item.time}</div>
                      )}
                      <div className="timeline-data">{item.content}</div>
                    </div>
                  </li>
                );
              })
            : isEditMode && (
                <div className="timeline-block-placeholder">
                  <p>{intl.formatMessage(messages.PleaseAddTimeline)}</p>
                </div>
              )}
        </ul>
      </div>
    </>
  );
};

export default TimelineView;

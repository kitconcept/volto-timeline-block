import { useRef } from 'react';
import cx from 'classnames';
import { useIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
  PleaseAddTimeline: {
    id: 'PleaseAddTimeline',
    defaultMessage: 'Please Add Timeline',
  },
});

const TimelineTemplate = ({ items, isEditMode, className, style }) => {
  const intl = useIntl();
  const index = useRef(0);

  return (
    <>
      <div style={style} className={cx('block timeline', className)}>
        <ul className="timeline-list">
          {Array.isArray(items) && items.length > 0
            ? items.map((item, count) => {
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
                      <span className="timeline-connector"></span>
                    </div>

                    <div className={cx('timeline-content', positions)}>
                      {item.title && (
                        <div className="timeline-time">{item.title}</div>
                      )}
                      <div className="timeline-data">{item.description}</div>
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

export default TimelineTemplate;

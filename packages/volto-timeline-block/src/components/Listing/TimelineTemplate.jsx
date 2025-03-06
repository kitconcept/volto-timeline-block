import { useRef } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import cx from 'classnames';
import { Message } from 'semantic-ui-react';
import { useIntl, messages } from 'react-intl';

const TimelineTemplate = ({ items, isEditMode }) => {
  const intl = useIntl();
  const index = useRef(0);

  return (
    <>
      <div className="timeline-block">
        <ul className="timeline">
          {!isEmpty(items)
            ? items.map((item, count) => {
                index.current = count;
                const positions = index.current % 2 === 0 ? 'right' : 'left';

                return (
                  <li key={item} className={cx('timeline-item', positions)}>
                    <div className="timeline-separator">
                      <span
                        className={cx('timeline-dot', ['outlined', 'gap'])}
                      ></span>
                      {items.length - 1 > count && (
                        <span className="timeline-connector"></span>
                      )}
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
            : isEmpty(items) &&
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

TimelineTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default TimelineTemplate;

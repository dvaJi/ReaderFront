import React, { PureComponent } from 'react';
import WorkItem from './WorkItem';
import WorkItemEmpty from './WorkItemEmpty';
import Lazyload from 'react-lazyload';
import { subString } from '../../utils/helpers';
import { getStatusTagStyle, getWorkThumb } from '../../utils/common';

export default class WorkList extends PureComponent {
  render() {
    const { works, filterText, isLoading } = this.props;
    const rows = [];
    const truncate = work => {
      return subString(work.description, 120);
    };

    const statusTag = statusId => {
      return getStatusTagStyle(statusId);
    };

    const redirectTo = work => {
      return `/work/${work.stub}`;
    };

    const thumbUrl = work => {
      const dir = work.stub + '_' + work.uniqid;
      return getWorkThumb(dir, work.covers);
    };

    if (isLoading || (!isLoading && works.length === 0)) {
      for (let index = 0; index < 6; index++) {
        rows.push(<WorkItemEmpty key={index} work={{}} size={'normal'} />);
      }
    } else {
      let mapList = [],
        count = 0;
      works
        .filter(work =>
          work.name.toUpperCase().startsWith(filterText.toUpperCase())
        )
        .forEach((work, index) => {
          mapList[count] = mapList[count] || [];
          const isEven = index % 2 === 0;
          const workItem = (
            <WorkItem
              key={work.id}
              truncate={truncate}
              redirectTo={redirectTo}
              thumbUrl={thumbUrl}
              statusTag={statusTag}
              work={work}
              size={'normal'}
            />
          );
          mapList[count] = [...mapList[count], workItem];
          if (!isEven) {
            count++;
          }
        });

      mapList.forEach((workList, index) => {
        rows.push(
          <Lazyload
            key={index}
            height={220}
            once={true}
            throttle={200}
            offset={100}
          >
            <div>{workList.map(work => work)}</div>
          </Lazyload>
        );
      });
    }
    return rows;
  }
}

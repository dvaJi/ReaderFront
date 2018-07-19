import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Card from '../../../works/components/WorkItem';
import CardLoading from '../../../works/components/WorkItemEmpty';
import { subString } from '../../../utils/helpers';
import { getStatusTagStyle, getWorkThumb } from '../../../utils/common';

const WorksList = styled.div`
  margin-top: 30px;
`;

export default class LatestWork extends PureComponent {
  handleTruncate = work => {
    return subString(work.description, 120);
  };

  handleRedirectTo = work => {
    return `/work/${work.stub}`;
  };

  handleThumbUrl = work => {
    const dir = work.stub + '_' + work.uniqid;
    return getWorkThumb(dir, work.covers);
  };

  handleStatusTag = statusId => {
    return getStatusTagStyle(statusId);
  };

  render() {
    return (
      <div className="LatestWorks mb-4">
        <h3>{this.props.title}</h3>
        <WorksList>
          {!this.props.isLoading
            ? this.props.works.map(work => (
                <Card
                  key={work.id}
                  truncate={this.handleTruncate}
                  redirectTo={this.handleRedirectTo}
                  thumbUrl={this.handleThumbUrl}
                  statusTag={this.handleStatusTag}
                  work={work}
                  size={'small'}
                />
              ))
            : Array.from(new Array(4)).map((fk, index) => (
                <CardLoading key={index} work={{}} size={'small'} />
              ))}
        </WorksList>
      </div>
    );
  }
}

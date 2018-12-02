import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

// App imports
import Card from '../../../works/components/WorkItem';
import CardLoading from '../../../works/components/WorkItemEmpty';
import { subString, renderIf } from '../../../utils/helpers';
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
    return getWorkThumb(dir, work.thumbnail, 'medium');
  };

  handleStatusTag = statusId => {
    return getStatusTagStyle(statusId);
  };

  renderWorks(works) {
    return works.map(work => (
      <Card
        key={work.id}
        truncate={this.handleTruncate}
        redirectTo={this.handleRedirectTo}
        thumbUrl={this.handleThumbUrl}
        statusTag={this.handleStatusTag}
        work={work}
        size={'small'}
      />
    ));
  }

  renderSkeleton() {
    return Array.from(new Array(4)).map((item, index) => (
      <CardLoading key={'lw-card-loading-' + item} work={{}} size={'small'} />
    ));
  }

  render() {
    const { works, isLoading } = this.props;
    return (
      <div className="LatestWorks mb-4">
        <h1>
          <FormattedMessage
            id="recently_added"
            defaultMessage="Recently added"
          />
        </h1>
        <WorksList>
          {renderIf(isLoading, this.renderSkeleton)}
          {renderIf(!isLoading, () => this.renderWorks(works))}
        </WorksList>
      </div>
    );
  }
}

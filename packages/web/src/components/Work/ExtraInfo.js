import React, { memo } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { ExtraListWrapper } from '@components/Work/styles';

const List = styled.div`
  padding-left: 0;
  padding-right: 0;
`;

const Item = styled.div`
  flex-direction: row;
  align-items: center;
  padding: 0.75rem 0.625rem;
`;

function Info({ work }) {
  const { formatMessage: f } = useIntl();

  return (
    <ExtraListWrapper className="mt-2">
      <List className="list">
        <Item>
          <div className="flex">
            <div className="item-feed">
              {f({ id: 'type', defaultMessage: 'Type' })}
            </div>
          </div>
          <div className="no-wrap">
            <div className="item-date text-muted text-sm">
              {f({ id: work.type, defaultMessage: work.type })}
            </div>
          </div>
        </Item>
        <Item>
          <div className="flex">
            <div className="item-feed">
              {f({ id: 'demographic', defaultMessage: 'Demographic' })}
            </div>
          </div>
          <div className="no-wrap">
            <div className="item-date text-muted text-sm">
              {f({
                id: work.demographic_name,
                defaultMessage: work.demographic_name
              })}
            </div>
          </div>
        </Item>
        <Item>
          <div className="flex">
            <div className="item-feed">
              {f({ id: 'status', defaultMessage: 'Status' })}
            </div>
          </div>
          <div className="no-wrap">
            <div className="item-date text-muted text-sm">
              {f({ id: work.status_name, defaultMessage: work.status_name })}
            </div>
          </div>
        </Item>
        <Item>
          <div className="flex">
            <div className="item-feed">
              {f({ id: 'adult', defaultMessage: 'Adult' })}
            </div>
          </div>
          <div className="no-wrap">
            <div className="item-date text-muted text-sm">
              {f({
                id: work.adult ? 'yes' : 'no',
                defaultMessage: work.adult ? 'Yes' : 'No'
              })}
            </div>
          </div>
        </Item>
        <Item>
          <div className="flex">
            <div className="item-feed">
              {f({ id: 'licensed', defaultMessage: 'Licensed' })}
            </div>
          </div>
          <div className="no-wrap">
            <div className="item-date text-muted text-sm">
              {f({
                id: work.licensed ? 'yes' : 'no',
                defaultMessage: work.licensed ? 'Yes' : 'No'
              })}
            </div>
          </div>
        </Item>
      </List>
    </ExtraListWrapper>
  );
}

export default memo(Info);

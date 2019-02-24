import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// App imports
import ChapterForm from './ChapterForm';
import { Card } from '../../common/UI';
import { MetaTagCreate } from '../ACPChaptersMetaTags';
import { FETCH_CHAPTERS } from '../../works/query';
import { CREATE_CHAPTER } from '../mutations';
import 'react-datepicker/dist/react-datepicker.css';

export const chapterEmpty = {
  id: 0,
  workId: 0,
  chapter: 0,
  subchapter: 0,
  volume: 0,
  language: 0,
  name: '',
  stub: '',
  uniqid: '',
  hidden: false,
  description: '',
  thumbnail: '',
  releaseDate: new Date()
};

class CreateChapter extends Component {
  onSubmit = async (event, chapter) => {
    event.preventDefault();
    const { match, mutate } = this.props;

    const result = await mutate({
      variables: { ...chapter },
      refetchQueries: [
        {
          query: FETCH_CHAPTERS,
          variables: { language: -1, workStub: match.params.stub }
        }
      ],
      ignoreResults: false
    });

    this.props.history.push(
      '/admincp/work/' +
        match.params.workId +
        '/' +
        match.params.stub +
        '/chapter/' +
        result.data.chapterCreate.id
    );
  };

  render() {
    const { match } = this.props;
    return (
      <div className="container">
        <MetaTagCreate />
        <Card>
          <Container>
            <Link
              to={
                '/admincp/work/' + match.params.workId + '/' + match.params.stub
              }
            >
              <Button>
                <FontAwesomeIcon icon={faArrowLeft} />{' '}
                <FormattedMessage id="go_back" defaultMessage="Back" />
              </Button>
            </Link>

            <h4>
              <FormattedMessage id="create" defaultMessage="Create" />{' '}
              <FormattedMessage id="chapter" defaultMessage="Chapter" />
            </h4>
            <div>
              <ChapterForm
                chapter={{
                  ...chapterEmpty,
                  workId: parseInt(match.params.workId, 0)
                }}
                onSubmit={this.onSubmit}
                intl={this.props.intl}
              />
            </div>
          </Container>
        </Card>
      </div>
    );
  }
}

export default graphql(CREATE_CHAPTER)(injectIntl(withRouter(CreateChapter)));

// Imports
import { GraphQLObjectType } from 'graphql';

// App Imports
import * as user from '../../modules/user/query';
import * as works from '../../modules/works/query';
import * as WorksGenre from '../../modules/works-genre/query';
import * as chapter from '../../modules/chapter/query';
import * as page from '../../modules/page/query';
import * as people from '../../modules/people/query';
import * as post from '../../modules/post/query';
import * as registry from '../../modules/registry/query';

// Query
const query = new GraphQLObjectType({
  name: 'query',
  description: 'API Queries [Read]',
  fields: () => ({
    ...user,
    ...works,
    ...chapter,
    ...page,
    ...WorksGenre,
    ...people,
    ...post,
    ...registry
  })
});

export default query;

// Imports
import { GraphQLObjectType } from 'graphql';

// App Imports
import * as user from '../../modules/user/mutations';
import * as chapter from '../../modules/chapter/mutations';
import * as page from '../../modules/page/mutations';
import * as works from '../../modules/works/mutations';
import * as worksDescription from '../../modules/works-description/mutations';
import * as worksGenre from '../../modules/works-genre/mutations';
import * as people from '../../modules/people/mutations';
import * as post from '../../modules/post/mutations';

// Mutation
const mutation = new GraphQLObjectType({
  name: 'mutations',
  description: 'API Mutations [Create, Update, Delete]',

  fields: {
    ...user,
    ...works,
    ...chapter,
    ...page,
    ...worksDescription,
    ...worksGenre,
    ...people,
    ...post
  }
});

export default mutation;

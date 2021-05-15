import { withApollo } from '../lib/apollo';

import Home from './home';

const IndexPage = () => <Home />;

export default withApollo(IndexPage);

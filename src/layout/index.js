import React from 'react';
import {Layout} from 'antd';

import Headers from "./header";

const { Content } = Layout;

export default props => (
    <Layout>
        <Headers/>
        <Content>
            {props.children}
        </Content>
    </Layout>
);

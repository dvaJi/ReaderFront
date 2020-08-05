import React from 'react';
import { mount } from 'enzyme';
import Image from './lazy-component';
import * as config from '../../config';

const readerPath = config.READER_PATH;
const idProd = config.IS_PROD;
const s3Endpoint = config.S3_ENDPOINT;

beforeAll(() => {
  config.IS_PROD = true;
  config.READER_PATH = 'https://img.myawesome.reader';
  config.S3_ENDPOINT = null;
});

afterAll(() => {
  config.IS_PROD = idProd;
  config.READER_PATH = readerPath;
  config.S3_ENDPOINT = s3Endpoint;
});

it('should render without throwing an error', () => {
  const wrapper = mount(
    <Image src={'/public/images/default-cover.png'} height={100} width={100} />
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should render a default image without throwing an error', () => {
  const wrapper = mount(<Image src={null} height={100} width={100} />);
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

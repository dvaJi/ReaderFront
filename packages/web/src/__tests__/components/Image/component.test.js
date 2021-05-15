import React from 'react';
import { mount } from 'enzyme';
import { animated } from 'react-spring';

import Image from '@components/Image/component';
import * as config from 'lib/config';

const filename = '/image/my.jpg';
const readerPath = config.READER_PATH;
const idProd = config.IS_PROD;
const s3Endpoint = config.S3_ENDPOINT;

jest.mock('@readerfront/shared/build/hash', () => {
  return { hashToNum: (host, index, min, max) => 2, hashCode: str => '12345' };
});

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

beforeEach(async () => {
  jest.clearAllMocks();
});

it('should render without throwing an error', () => {
  const wrapper = mount(
    <Image src={filename} alt="My image" height={200} width={200} />
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should render a custom element using tag', () => {
  const wrapper = mount(
    <Image
      tag={animated.img}
      src={filename}
      alt="My image"
      height={200}
      width={200}
    />
  );
  expect(wrapper).toBeTruthy();
  expect(wrapper.find('ForwardRef')).toBeTruthy();
  wrapper.unmount();
});

it('should render a img using the photon cdn', () => {
  config.CDN = 'photon';

  const wrapper = mount(
    <Image src={filename} alt="My image" height={200} width={200} />
  );
  const img = wrapper.find('img');

  expect(img.prop('src')).toBe(
    `https://i2.wp.com/${'img.myawesome.reader'}${filename}?strip=all&quality=100&w=200`
  );
  wrapper.unmount();
});

it('should render a img using the photon cdn with the original size', () => {
  config.CDN = 'photon';

  const wrapper = mount(<Image src={filename} alt="My image" />);
  const img = wrapper.find('img');

  expect(img.prop('src')).toBe(
    `https://i2.wp.com/${'img.myawesome.reader'}${filename}?strip=all&quality=100`
  );
  wrapper.unmount();
});

it('should render a img using the google cdn', () => {
  config.CDN = 'google';

  const wrapper = mount(
    <Image src={filename} alt="My image" height={200} width={200} />
  );
  expect(wrapper).toBeTruthy();
  const img = wrapper.find('img');
  expect(img.prop('src')).toBe(
    `https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&resize_w=200&rewriteMime=image/*&url=${encodeURIComponent(
      config.READER_PATH + filename
    )}`
  );
  wrapper.unmount();
});

it('should render a img using the google cdn with the original size', () => {
  config.CDN = 'google';

  const wrapper = mount(<Image src={filename} alt="My image" />);
  expect(wrapper).toBeTruthy();
  const img = wrapper.find('img');
  expect(img.prop('src')).toBe(
    `https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&rewriteMime=image/*&url=${encodeURIComponent(
      config.READER_PATH + filename
    )}`
  );
  wrapper.unmount();
});

it('should render a img using the staticaly cdn', () => {
  config.CDN = 'staticaly';

  const wrapper = mount(
    <Image src={filename} alt="My image" height={200} width={200} />
  );
  expect(wrapper).toBeTruthy();
  const img = wrapper.find('img');
  expect(img.prop('src')).toBe(
    `https://cdn.staticaly.com/img/${'img.myawesome.reader'}${filename}?w=200`
  );
  wrapper.unmount();
});

it('should render a img using the staticaly cdn with the original size', () => {
  config.CDN = 'staticaly';

  const wrapper = mount(<Image src={filename} alt="My image" />);
  expect(wrapper).toBeTruthy();
  const img = wrapper.find('img');
  expect(img.prop('src')).toBe(
    `https://cdn.staticaly.com/img/${'img.myawesome.reader'}${filename}`
  );
  wrapper.unmount();
});

it('should render a img not using a cdn', () => {
  config.CDN = 'no';

  const wrapper = mount(
    <Image src={filename} alt="My image" height={200} width={200} />
  );
  expect(wrapper).toBeTruthy();
  const img = wrapper.find('img');
  expect(img.prop('src')).toBe(config.READER_PATH + filename);
  wrapper.unmount();
});

it('should use S3 endpoint', () => {
  config.S3_ENDPOINT = 'https://mybucket.s3.aws.com';
  const wrapper = mount(
    <Image src={filename} alt="My image" height={200} width={200} />
  );
  expect(wrapper).toBeTruthy();
  const img = wrapper.find('img');
  expect(img.prop('src')).toBe(config.S3_ENDPOINT + filename);
  wrapper.unmount();
});

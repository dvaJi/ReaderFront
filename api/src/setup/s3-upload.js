import AWS from 'aws-sdk';

import {
  S3_BUCKET_NAME,
  S3_ACCESS_KEY,
  S3_ENDPOINT,
  S3_SECRET_ACCESS_KEY,
  USE_S3
} from '../config/env';

const PUBLIC_ACL = 'public-read';
export const useS3 = USE_S3;

const s3 = new AWS.S3({
  endpoint: S3_ENDPOINT,
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_ACCESS_KEY
});

export const getS3BaseUrl = () => `https://${S3_BUCKET_NAME}.${S3_ENDPOINT}`;

/**
 * Upload a file into S3
 * @param {string} filepath filename including path. eg: /1234asd/mypage00.png
 * @param {Promise<Buffer|Uint8Array|Blob|string|Readable>} buffer Image buffer
 */
export const uploadFile = (filepath, mime, buffer) => {
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: filepath.replace(/\\/g, '/'),
    Body: buffer,
    ACL: PUBLIC_ACL,
    ContentType: mime
  };

  return new Promise((resolve, reject) => {
    s3.putObject(params, error => {
      if (error) {
        reject(error);
      } else {
        resolve(
          `https://${S3_BUCKET_NAME}.${S3_ENDPOINT}/${filepath.replace(
            /\\/g,
            '/'
          )}`
        );
      }
    });
  });
};

/**
 * Delete a file from S3
 * @param {string} filepath filename including path. eg: /1234asd/mypage00.png
 */
export const deleteFile = filename => {
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: filename.replace(/\\/g, '/')
  };

  return new Promise((resolve, reject) => {
    s3.deleteObject(params, error => {
      if (error) {
        reject(error);
      } else {
        resolve(filename);
      }
    });
  });
};

/**
 * Download a file from S3
 * @param {string} filepath filename including path. eg: /1234asd/mypage00.png
 * @returns {Promise<NodeJS.ArrayBufferView>} buffer
 */
export const downloadFile = filename => {
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: filename.replace(/\\/g, '/')
  };

  return new Promise((resolve, reject) => {
    s3.getObject(params, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data.Body);
      }
    });
  });
};

import request from 'supertest';

it('returns a list of works', async () => {
  // make a request to create an order
  const { body } = await request(global.myapp)
    .post('/')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      query: '{ works { id } }'
    });

  expect(body.data.works).toHaveLength(1);
});

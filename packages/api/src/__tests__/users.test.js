import request from 'supertest';

it('returns an error if user is not logged in', async () => {
  // make a request to create an order
  const { body } = await request(global.myapp)
    .post('/')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      query: `{
          users {
            id
          }
        }`
    });

  expect(body.errors).toBeTruthy();
});

// it('returns an error if user is not admin', async () => {
//   // make a request to create an order
//   const { body } = await request(server)
//     .post('/')
//     .set('Content-Type', 'application/json')
//     .set('Accept', 'application/json')
//     .send({
//       query: `{
//           users {
//             id
//           }
//         }`
//     });

//   expect(body.errors).toBeTruthy();
// });

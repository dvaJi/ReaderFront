export function getPosts(amount = 2) {
  let posts = [];
  for (let index = 1; index < amount; index++) {
    let user = {
      id: 1,
      name: 'The Admin',
      role: 'ADMIN'
    };
    let post = {
      id: 2,
      uniqid: '123gsasd0dk' + (index * 3),
      type: 1,
      title: 'Lorem Ipsum 1',
      stub: 'lorem-ipsum',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam elit odio.',
      user: user,
      category: 3,
      status: 1,
      sticky: false,
      language: 1,
      thumbnail: 'cover_awesomepost.png',
      createdAt: new Date('2018-07-20'),
      updatedAt: new Date('2018-07-20')
    };
    posts.push(post);
  }
  return posts;
}

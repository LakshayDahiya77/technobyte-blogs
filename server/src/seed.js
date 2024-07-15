import Blog from '../src/model/blog.js'

const seedData = [{
  _id: '6687a832f73838cbf41ce4b2',
  title: 'Blog 1',
  content: 'This is my new blog 1',
  image: 'https://example.com/image.jpg',
  review: 'approved',
  reviewMessage: '',
  tags: [],
  comments: [],
},
{
  _id: '6687a832f73838cbf41ce4b3',
  title: 'Blog 2',
  content: 'This is my new blog 2',
  image: 'https://example.com/image.jpg',
  review: 'approved',
  reviewMessage: '',
  tags: [],
  comments: [],
}
];

export const seed = async () => {
  try {
    await Blog.insertMany(seedData); // Insert the seed data
    console.log('Seed data inserted successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

export default seed;

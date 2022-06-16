// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';

const tasksSuccessResponse = () => [...Array(10)].map((element, i) => ({
  id: faker.random.uuid(),
  name: faker.commerce.productName(),
  completed: faker.random.boolean(),
  description: faker.commerce.productDescription(),
  order: i,
}));

const tasksSuccess = JSON.stringify(tasksSuccessResponse());

export default tasksSuccess;
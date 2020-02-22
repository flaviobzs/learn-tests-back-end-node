import faker from 'faker';
import { factory } from 'factory-girl';

import Account from '../../src/app/models/Account';

factory.define('Account', Account, {
  name: faker.name.findName(),
  user_id: faker.random.number(),
});

export default factory;

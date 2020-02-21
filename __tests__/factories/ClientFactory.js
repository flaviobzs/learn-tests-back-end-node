import faker from 'faker';
import { factory } from 'factory-girl';

import Client from '../../src/app/models/Client';

factory.define('Client', Client, {
  name: faker.name.findName(),
  mail: faker.internet.email(),
  password: faker.internet.password(),
});

export default factory;

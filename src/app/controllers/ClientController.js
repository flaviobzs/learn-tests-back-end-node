import Client from '../models/Client';

class ClientController {
  async index(req, res) {
    // const users = [{ name: 'John Doe', mail: 'john@mail.com' }];

    const clients = await Client.findAll();

    return res.status(200).json(clients);
  }

  async store(req, res) {
    const client = await Client.create(req.body);

    // res.status(201).json(req.body);
    return res.status(201).json(client);
  }
}

export default new ClientController();

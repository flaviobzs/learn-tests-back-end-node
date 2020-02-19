import Client from '../models/Client';

class ClientController {
  async index(req, res) {
    const users = [
      { name: 'John Doe', mail: 'john@mail.com'},
    ];

    // const clients = await Client.findAll()

    res.status(200).json(users);
  }

  async store(req, res) {

    // const client = await Client.create({});

    res.status(201).json(req.body);

  }
}

export default new ClientController();

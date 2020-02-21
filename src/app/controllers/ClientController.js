import Client from '../models/Client';

class ClientController {
  async index(req, res) {
    // const users = [{ name: 'John Doe', mail: 'john@mail.com' }];

    const clients = await Client.findAll();

    return res.status(200).json(clients);
  }

  async store(req, res) {
    // validação de nome
    if (!req.name) {
      return res.status(400).error('Name is obrigatory');
    }
    if (!req.mail) {
      return res.status(400).error('Mail is obrigatory');
    }

    if (!req.password) {
      return res.status(400).error('Password is obrigatory');
    }

    const { email } = req.body;

    const checkEmail = await Client.findOne({ where: { email } });

    if (checkEmail) {
      return res
        .status(400)
        .json({ error: 'Duplicated email, user already exists.' });
    }

    const client = await Client.create(req.body);

    // res.status(201).json(req.body);
    return res.status(201).json(client);
  }
}

export default new ClientController();

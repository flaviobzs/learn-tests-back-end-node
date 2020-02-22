import User from '../models/User';

class UserController {
  async index(req, res) {
    // const users = [{ name: 'John Doe', mail: 'john@mail.com' }];
    const users = await User.findAll();

    return res.status(200).json(users);
  }

  async store(req, res) {
    console.log(req.body);

    const { mail, password, name } = req.body;

    // validação de nome
    if (!name) {
      return res.status(400).json({ error: 'Name is obrigatory' });
    }

    if (!mail) {
      return res.status(400).json({ error: 'Mail is obrigatory' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Password is obrigatory' });
    }

    const checkEmail = await User.findOne({ where: { mail } });

    if (checkEmail) {
      return res
        .status(400)
        .json({ error: 'Duplicated email, user already exists.' });
    }

    const user = await User.create({
      name,
      mail,
      password,
    });

    // res.status(201).json(req.body);
    return res.status(201).json(user);
  }
}

export default new UserController();

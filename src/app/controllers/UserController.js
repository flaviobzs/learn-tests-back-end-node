import bcrypt from 'bcryptjs';
import User from '../models/User';

class UserController {
  async index(req, res) {
    // const users = [{ name: 'John Doe', mail: 'john@mail.com' }];
    const users = await User.findAll({ attributes: ['id', 'name', 'mail'] });

    return res.status(200).json(users);
  }

  async store(req, res) {
    const { mail, name, password } = req.body;
    // validação de nome
    if (!name) {
      return res.status(400).json({ error: 'Name is obrigatory' });
    }
    // validação de email
    if (!mail) {
      return res.status(400).json({ error: 'Mail is obrigatory' });
    }

    // validação de password
    if (!password) {
      return res.status(400).json({ error: 'Password is obrigatory' });
    }

    const checkEmail = await User.findOne({ where: { mail } });

    if (checkEmail) {
      return res
        .status(400)
        .json({ error: 'Duplicated email, user already exists.' });
    }

    const password_hash = await bcrypt.hash(password, 8);

    const { id, mail: email, name: name_user } = await User.create({
      mail,
      name,
      password: password_hash,
    });

    return res.status(201).json({
      id,
      mail: email,
      name: name_user,
    });
  }
}

export default new UserController();

import Account from '../models/Account';

class AccountController {
  async index(req, res) {
    const account = await Account.findAll();

    return res.status(200).json(account);
  }

  async store(req, res) {
    const { name, user_id } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is obrigatory' });
    }

    const account = await Account.create({
      name,
      user_id,
    });

    return res.status(201).json(account);
  }

  async show(req, res) {
    const { id } = req.params;

    const account = await Account.findByPk(id);

    return res.status(200).json(account);
  }

  async update(req, res) {
    const { id } = req.params;

    const account = await Account.findByPk(id);

    const { name, user_id } = await account.update(req.body);

    return res.status(200).json({
      id,
      name,
      user_id,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const account = await Account.findByPk(id);
    account.destroy(id);

    return res.status(204).json();
  }
}

export default new AccountController();

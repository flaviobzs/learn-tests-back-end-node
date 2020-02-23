import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

import User from '../models/User';

class AuthController {
  async store(req, res) {
    const { mail, password } = req.body;

    const user = await User.findOne({
      where: { mail },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const payload = {
      id: user.id,
      name: user.name,
      mail: user.mail,
    };

    const token = jwt.sign(payload, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.status(200).json({ token });
  }
}

export default new AuthController();

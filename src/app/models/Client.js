import Sequelize, { Model } from 'sequelize';
// import bcrypt from 'bcryptjs';

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        mail: Sequelize.STRING,
        password: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    // this.addHook('beforeSave', async user => {
    //   if (user.password) {
    //     user.password_hash = await bcrypt.hash(user.password, 8);
    //   }
    // });

    return this;
  }
}

export default Client;

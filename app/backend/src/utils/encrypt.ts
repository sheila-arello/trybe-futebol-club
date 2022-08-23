import * as bcrypt from 'bcryptjs';

const encryptedPassword = {
  encryptPassword: (password: string) => {
    const salt = bcrypt.genSaltSync(1);
    const encrypted = bcrypt.hashSync(password, salt);
    return encrypted;
  },

  compare: (password: string, hash: string) => {
    const result = bcrypt.compareSync(password, hash);
    return result;
  },
};

export default encryptedPassword;

import bcrypt from "bcrypt";

const bcryptPasswordHash = {
  async hash(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  },

  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  },
};

export default bcryptPasswordHash;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

class AuthService {
  constructor() {
    this.secretKey = process.env.JWT_SECRET;
  }

  async registerSupplier(companyName, phoneNumber, email, fullName) {
    console.log(fullName);
    //אולי לעשות לפי מייל
    const existingUser = await usersModel.findOne({ phoneNumber });
    if (existingUser) {
      return { success: false, message: 'המשתמש קיים במערכת' }
    }
    const maxUser = await usersModel.findOne().sort({ ID: -1 }).select('ID -_id');
    const ID = maxUser ? maxUser.ID + 1 : 1;
    //const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new usersModel({ ID, companyName, phoneNumber, email, fullName, role: "supplier" });
    await newUser.save();
    //לבקש פה תוקן ולשלוח 
    // const token = jwt.sign({ userId: user._id }, this.secretKey, { expiresIn: '1h' });
    // return { success: true, token: token, user: newUser };
    return { success: true, user: newUser };
  }

  async loginSupplier(phoneNumber) {
    const user = await usersModel.findOne({ phoneNumber })
    if (!user) {
      return { success: false, message: 'המשתמש לא נמצא' }
    }
    // const validPassword = await bcrypt.compare(password, user.password);
    // if (!validPassword) {
    //   throw new Error('Invalid password');
    // }
    const token = jwt.sign({ userId: user._id }, this.secretKey, { expiresIn: '1h' })
    return { success: true, token: token, user: user }
  };

}

let authService = new AuthService();
module.exports = authService;

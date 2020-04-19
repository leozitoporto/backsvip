import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('email/password incorretos.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('email/password incorretos.');
    }

    // palavra chave = mamãe é o topo do mundo
    const token = sign({}, 'ac13eb306d8509ea3cd082963b4dc79e', {
      subject: user.id,
      expiresIn: '180d',
    });
    return { user, token };
  }
}

export default AuthenticateUserService;

import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('permite atualizar os dados do usuario', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updetedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tr6e',
      email: 'johntre@example.com',
    });

    expect(updetedUser.name).toBe('John Tr6e');
    expect(updetedUser.email).toBe('johntre@example.com');
  });

  it('não permite atualizar os dados do usuario de um email já existente', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('permite atualizar a senha', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updetedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tr6e',
      email: 'johntre@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updetedUser.password).toBe('123123');
  });

  it('nao permiti atualizar a senha sem informar a senha antiga', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tr6e',
        email: 'johntre@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('nao permiti atualizar a senha se informar a senha antiga errada', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tr6e',
        email: 'johntre@example.com',
        old_password: 'senha_antiga_errada',
        password: '111222',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não permite atualizar perfil de um usuario inexistente', async () => {
    expect(
      updateProfile.execute({
        user_id: 'id_inexistente',
        name: 'Test',
        email: 'test@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

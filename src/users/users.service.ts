import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await this.userHash(createUserDto.password);
      return this.userModel.create(createUserDto);
    } catch (err) {
      console.error('Create User on Database Error', err);
    }
  }

  async findAll() {
    try {
      const findedUsers = await this.userModel.find().select('-password');
      return findedUsers;
    } catch (err) {
      console.error('Find All Users on Database Error', err);
    }
  }

  async findOne(email: string) {
    const findedUser = await this.userModel.findOne({ email });
    return findedUser;
  }

  async findById(id: string) {
    console.log('oi', id);
    const findedUser = await this.userModel.findById(id).select('-password');
    console.log(findedUser);
    return findedUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = this.userModel
      .findByIdAndUpdate(
        id,
        {
          name: updateUserDto.name,
          password: updateUserDto.password,
          email: updateUserDto.email,
        },
        { new: true },
      )
      .select('-password');
    return updatedUser;
  }

  async delete(id: string) {
    return await this.userModel.findByIdAndDelete(id).select('-password');
  }

  private async userHash(pass: string) {
    const saltOrRounds = 10;

    const hashedPass = await bcrypt.hash(pass, saltOrRounds);
    return hashedPass;
  }
}

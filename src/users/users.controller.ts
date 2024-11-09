import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const createdUser = this.usersService.create(createUserDto);
    return createdUser;
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    const findedUser = this.usersService.findById(id);
    return findedUser;
  }

  @Get('/buscar/:name')
  findOne(@Param('name') name: string) {
    const findedUser = this.usersService.findOne(name);
    return findedUser;
  }

  @Put(':id')
  updated(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = this.usersService.update(id, updateUserDto);
    return updatedUser;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    const deletedUser = this.usersService.delete(id);
    return deletedUser;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const validPassword: boolean = await bcrypt.compare(pass, user.password);

    if (!validPassword) throw new UnauthorizedException();

    const payload = { sub: user._id, nome: user.name };

    return {
      acess_token: await this.jwtService.signAsync(payload),
    };
  }
}

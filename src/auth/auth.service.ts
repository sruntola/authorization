import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async signUserIn(createAuthDto: CreateAuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: createAuthDto.email,
        },
      });
      if (!user) {
        throw new NotFoundException('User is not found');
      }
      const payload = { email: user.email, id: user.id };
      return { access_token: this.jwtService.sign(payload) };
    } catch (ex) {
      throw new NotFoundException(ex);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  async getProfile(id: number) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
    } catch (ex) {
      throw new ForbiddenException(ex.message);
    }
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

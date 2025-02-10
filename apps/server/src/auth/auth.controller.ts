import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO: { username: string; password }) {
    return this.authService.login(
      await this.authService.validateUser(loginDTO.username, loginDTO.password),
    );
  }
}

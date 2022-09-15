import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export async function getJWTConfig(
  configService: ConfigService,
): Promise<JwtModuleOptions> {
  const secret = configService.get('JWT_SECRET');
  const maxAge = configService.get('JWT_MAX_AGE');
  
  return {
    secret,
    signOptions: {
      expiresIn: maxAge
    }
  };
}

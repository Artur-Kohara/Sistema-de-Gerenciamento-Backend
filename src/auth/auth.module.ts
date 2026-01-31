import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';

@Module({
  imports: [JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      secret: config.getOrThrow<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: config.getOrThrow<string>('JWT_EXPIRES_IN') as any,
      },
    }),
  }),],
  providers: [AuthService, PrismaService],
  controllers: [AuthController]
})
export class AuthModule {}

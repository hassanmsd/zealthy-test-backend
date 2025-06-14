import { Module } from '@nestjs/common';

import { FirebaseService } from 'src/firebase/firebase.service';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService, FirebaseService],
  controllers: [UserController],
})
export class UserModule {}

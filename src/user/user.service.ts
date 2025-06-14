import { Injectable } from '@nestjs/common';

import { SaveUserDataDto } from './dto/save-user-data.dto';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class UserService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async saveUserData(body: SaveUserDataDto) {
    const { userId, ...rest } = body;

    try {
      // Use FirebaseService to save data
      await this.firebaseService.saveUserData(userId, rest);
      return {
        message: 'User data saved successfully',
      };
    } catch (error) {
      throw new Error(`Error saving user data: ${error.message}`);
    }
  }

  // Fetch all users
  async getAllUsers() {
    try {
      const users = await this.firebaseService.getAllUsers();
      return users;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }
}

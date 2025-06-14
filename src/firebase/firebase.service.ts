import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as admin from 'firebase-admin';
import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { Firestore } from 'firebase-admin/firestore';

@Injectable()
export class FirebaseService {
  private db: Firestore;

  constructor(private configService: ConfigService) {
    const serviceAccount = {
      type: this.configService.get<string>('TYPE'),
      project_id: this.configService.get<string>('PROJECT_ID'),
      private_key: this.configService
        .get<string>('PRIVATE_KEY')
        ?.replace(/\\n/g, '\n'),
      client_email: this.configService.get<string>('CLIENT_EMAIL'),
      client_id: this.configService.get<string>('CLIENT_ID'),
      auth_uri: this.configService.get<string>('AUTH_URI'),
      token_uri: this.configService.get<string>('TOKEN_URI'),
      auth_provider_x509_cert_url: this.configService.get<string>(
        'AUTH_PROVIDER_X509_CERT_URL',
      ),
      client_x509_cert_url: this.configService.get<string>(
        'CLIENT_X509_CERT_URL',
      ),
      universe_domain: this.configService.get<string>('UNIVERSE_DOMAIN'),
    };

    // Initialize Firebase if not already done
    if (!admin.apps.length) {
      initializeApp({
        credential: cert(serviceAccount as ServiceAccount),
      });
    }

    // Initialize the Firestore reference
    this.db = admin.firestore();
  }

  async saveUserData(userId: string, userData: any) {
    try {
      const userRef = this.db.collection('users').doc(userId);
      await userRef.set(userData);
      return {
        message: 'User data saved successfully',
      };
    } catch (error) {
      throw new Error(`Error saving user data: ${error.message}`);
    }
  }

  async getUserData(userId: string) {
    try {
      const userRef = this.db.collection('users').doc(userId);
      const doc = await userRef.get();

      if (!doc.exists) {
        throw new Error('User not found');
      }

      return doc.data();
    } catch (error) {
      throw new Error(`Error fetching user data: ${error.message}`);
    }
  }

  async getAllUsers() {
    try {
      const snapshot = await this.db.collection('users').get();
      const users = snapshot.docs.map((doc) => doc.data());
      return users;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }
}

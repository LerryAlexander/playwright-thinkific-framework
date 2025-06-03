import dotenv from 'dotenv';
dotenv.config();

import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

export interface ThinkificCredentials {
  Username: string;
  Password: string;
}

export async function getUserCredentials(): Promise<ThinkificCredentials> {
  const secretName = process.env.AWS_SECRET_NAME
    ? process.env.AWS_SECRET_NAME
    : 'Thinkific_Credentials_Course_Creator';

  const region = process.env.AWS_REGION
    ? process.env.AWS_REGION
    : 'us-east-1';
  const client = new SecretsManagerClient({ region });

  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
        VersionStage: 'AWSCURRENT',
      })
    );

    if (response.SecretString) {
      const secretJson = JSON.parse(response.SecretString);
      return {
        Username: secretJson.Username,
        Password: secretJson.Password,
      };
    } else {
      throw new Error('SecretString is empty');
    }
  } catch (error) {
    console.error('Error retrieving user credentials from Secrets Manager:', error);
    throw error;
  }
}

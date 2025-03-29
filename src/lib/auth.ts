import { compare } from 'bcrypt';
import { prisma } from './db';

export async function verifyCredentials(email: string, password: string) {
  console.log(`Attempting to verify credentials for email: ${email}`);
  
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log(`User found:`, user ? 'Yes' : 'No');

    if (!user) {
      console.log('No user found with this email');
      return null;
    }

    const isPasswordValid = await compare(password, user.password);
    console.log(`Password valid:`, isPasswordValid ? 'Yes' : 'No');

    if (!isPasswordValid) {
      console.log('Password validation failed');
      return null;
    }

    console.log('Authentication successful');
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    console.error('Error in verifyCredentials:', error);
    return null;
  }
} 
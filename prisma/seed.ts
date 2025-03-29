import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@mrri.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@mrri.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  console.log('Admin user created/updated successfully');

  // Create initial seminars
  const seminars = [
    {
      title: 'Building Strong Foundations in Marriage',
      description: 'A comprehensive seminar on establishing and maintaining healthy relationships.',
      date: new Date('2024-02-28'),
      location: 'Johannesburg',
      imageUrl: '/seminars/1.jpeg',
      audienceType: 'For Couples',
      slug: 'building-foundations',
    },
    {
      title: 'Pastoral Leadership Excellence',
      description: 'Empowering pastoral leaders with effective ministry strategies.',
      date: new Date('2024-03-15'),
      location: 'Cape Town',
      imageUrl: '/seminars/2.jpeg',
      audienceType: 'For Ministry Leaders',
      slug: 'pastoral-excellence',
    },
    {
      title: 'Communication in Marriage',
      description: 'Master effective communication strategies for a stronger relationship.',
      date: new Date('2024-04-05'),
      location: 'Durban',
      imageUrl: '/seminars/3.jpeg',
      audienceType: 'For Couples',
      slug: 'communication-marriage',
    },
  ];

  console.log('Starting to seed the database...');
  
  for (const seminar of seminars) {
    await prisma.seminar.upsert({
      where: { slug: seminar.slug },
      update: {},
      create: seminar,
    });
  }

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding the database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
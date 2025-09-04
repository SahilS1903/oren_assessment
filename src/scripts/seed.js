const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data (optional - comment out if you want to preserve data)
  await prisma.response.deleteMany();
  await prisma.question.deleteMany();
  await prisma.user.deleteMany();
  console.log('🗑️ Cleared existing data');

  // Seed Questions
  const questions = [
    // Environmental Questions
    { id: 1, category: 'environmental', title: 'Total electricity consumption', type: 'number', unit: 'kWh', order_num: 1 },
    { id: 2, category: 'environmental', title: 'Renewable electricity consumption', type: 'number', unit: 'kWh', order_num: 2 },
    { id: 3, category: 'environmental', title: 'Total fuel consumption', type: 'number', unit: 'liters', order_num: 3 },
    { id: 4, category: 'environmental', title: 'Carbon emissions', type: 'number', unit: 'T CO₂e', order_num: 4 },

    // Social Questions  
    { id: 5, category: 'social', title: 'Total number of employees', type: 'number', unit: null, order_num: 1 },
    { id: 6, category: 'social', title: 'Number of female employees', type: 'number', unit: null, order_num: 2 },
    { id: 7, category: 'social', title: 'Average training hours per employee (per year)', type: 'number', unit: 'hours', order_num: 3 },
    { id: 8, category: 'social', title: 'Community investment spend', type: 'number', unit: 'INR', order_num: 4 },

    // Governance Questions
    { id: 9, category: 'governance', title: '% of independent board members', type: 'number', unit: '%', order_num: 1 },
    { id: 10, category: 'governance', title: 'Data privacy policy', type: 'dropdown', unit: null, order_num: 2 },
    { id: 11, category: 'governance', title: 'Total revenue', type: 'number', unit: 'INR', order_num: 3 }
  ];

  console.log('📊 Seeding questions...');
  for (const question of questions) {
    await prisma.question.upsert({
      where: { id: question.id },
      update: question,
      create: question
    });
  }
  console.log(`✅ Created ${questions.length} questions`);

  // Create test user
  const hashedPassword = await bcrypt.hash('password123', 12);
  
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      name: 'Test User',
      email: 'test@example.com',
      password_hash: hashedPassword
    }
  });
  console.log('👤 Created test user: test@example.com');

  // Seed some sample responses for the test user
  const sampleResponses = [
    // 2024-25 data
    { user_id: testUser.id, question_id: 1, year: '2024-25', value: '120000' },   // Total electricity
    { user_id: testUser.id, question_id: 2, year: '2024-25', value: '60000' },    // Renewable electricity
    { user_id: testUser.id, question_id: 3, year: '2024-25', value: '15000' },    // Fuel consumption
    { user_id: testUser.id, question_id: 4, year: '2024-25', value: '450' },      // Carbon emissions
    { user_id: testUser.id, question_id: 5, year: '2024-25', value: '250' },      // Total employees
    { user_id: testUser.id, question_id: 6, year: '2024-25', value: '125' },      // Female employees
    { user_id: testUser.id, question_id: 7, year: '2024-25', value: '40' },       // Training hours
    { user_id: testUser.id, question_id: 8, year: '2024-25', value: '2500000' },  // Community spend
    { user_id: testUser.id, question_id: 9, year: '2024-25', value: '33.3' },     // Independent board %
    { user_id: testUser.id, question_id: 10, year: '2024-25', value: 'Yes' },     // Data privacy policy
    { user_id: testUser.id, question_id: 11, year: '2024-25', value: '50000000' }, // Total revenue

    // 2023-24 data for comparison
    { user_id: testUser.id, question_id: 1, year: '2023-24', value: '110000' },
    { user_id: testUser.id, question_id: 2, year: '2023-24', value: '45000' },
    { user_id: testUser.id, question_id: 3, year: '2023-24', value: '18000' },
    { user_id: testUser.id, question_id: 4, year: '2023-24', value: '520' },
    { user_id: testUser.id, question_id: 5, year: '2023-24', value: '200' },
    { user_id: testUser.id, question_id: 6, year: '2023-24', value: '90' },
    { user_id: testUser.id, question_id: 7, year: '2023-24', value: '35' },
    { user_id: testUser.id, question_id: 8, year: '2023-24', value: '2000000' },
    { user_id: testUser.id, question_id: 9, year: '2023-24', value: '30' },
    { user_id: testUser.id, question_id: 10, year: '2023-24', value: 'Yes' },
    { user_id: testUser.id, question_id: 11, year: '2023-24', value: '42000000' }
  ];

  console.log('📈 Seeding sample responses...');
  for (const response of sampleResponses) {
    await prisma.response.upsert({
      where: {
        user_id_question_id_year: {
          user_id: response.user_id,
          question_id: response.question_id,
          year: response.year
        }
      },
      update: { value: response.value },
      create: response
    });
  }
  console.log(`✅ Created ${sampleResponses.length} sample responses`);

  console.log('🎉 Database seeding completed successfully!');
  console.log('');
  console.log('Test Credentials:');
  console.log('Email: test@example.com');
  console.log('Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

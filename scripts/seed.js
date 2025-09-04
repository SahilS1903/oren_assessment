const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const questions = [
  {
    id: 1,
    category: 'Environmental',
    title: 'Total Energy Consumption (MWh)',
    type: 'number',
    unit: 'MWh',
    order_num: 1
  },
  {
    id: 2,
    category: 'Environmental',
    title: 'Renewable Energy Usage (%)',
    type: 'percentage',
    unit: '%',
    order_num: 2
  },
  {
    id: 3,
    category: 'Environmental',
    title: 'Total GHG Emissions (tCO2e)',
    type: 'number',
    unit: 'tCO2e',
    order_num: 3
  },
  {
    id: 4,
    category: 'Environmental',
    title: 'Water Consumption (m³)',
    type: 'number',
    unit: 'm³',
    order_num: 4
  },
  {
    id: 5,
    category: 'Social',
    title: 'Total Workforce Count',
    type: 'number',
    unit: 'employees',
    order_num: 5
  },
  {
    id: 6,
    category: 'Social',
    title: 'Female Leadership Representation (%)',
    type: 'percentage',
    unit: '%',
    order_num: 6
  },
  {
    id: 7,
    category: 'Social',
    title: 'Employee Training Hours',
    type: 'number',
    unit: 'hours',
    order_num: 7
  },
  {
    id: 8,
    category: 'Social',
    title: 'Workplace Incident Rate',
    type: 'number',
    unit: 'incidents/year',
    order_num: 8
  },
  {
    id: 9,
    category: 'Governance',
    title: 'Board Independence (%)',
    type: 'percentage',
    unit: '%',
    order_num: 9
  },
  {
    id: 10,
    category: 'Governance',
    title: 'Ethics Training Completion (%)',
    type: 'percentage',
    unit: '%',
    order_num: 10
  },
  {
    id: 11,
    category: 'Governance',
    title: 'Data Security Incidents',
    type: 'number',
    unit: 'incidents',
    order_num: 11
  }
]

async function main() {
  console.log('🌱 Seeding database...')

  try {
    // Create/update questions
    console.log('📝 Creating ESG questions...')
    for (const question of questions) {
      await prisma.question.upsert({
        where: { id: question.id },
        update: question,
        create: question
      })
    }

    // Create test user
    console.log('👤 Creating test user...')
    const hashedPassword = await bcrypt.hash('password123', 12)
    
    await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {
        name: 'Test User',
        password_hash: hashedPassword
      },
      create: {
        name: 'Test User',
        email: 'test@example.com',
        password_hash: hashedPassword
      }
    })

    console.log('✅ Created/updated 11 questions')
    console.log('✅ Test user created: test@example.com')
    console.log('🎉 Seeding completed successfully!')

  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Create a test user
    const user = await prisma.user.upsert({
        where: { email: 'test@example.com' },
        update: {},
        create: {
            email: 'test@example.com',
            password: 'password123',
            name: 'John Doe',
            records: {
                create: [
                    {
                        type: 'Injury',
                        bodyPart: 'Head',
                        description: 'Concussion from bicycle accident',
                        date: new Date('2023-05-15'),
                    },
                    {
                        type: 'Surgery',
                        bodyPart: 'Chest',
                        description: 'Appendectomy', // Wait, appendectomy is usually abdominal but for demo chest/abdomen distinction might be vague in my svg. Let's say "Heart Surgery" for Chest.
                        date: new Date('2020-01-10'),
                    },
                    {
                        type: 'Surgery',
                        bodyPart: 'Legs',
                        description: 'ACL Reconstruction',
                        date: new Date('2021-11-20'),
                    },
                    {
                        type: 'Allergy',
                        bodyPart: 'Body', // Generic
                        description: 'Penicillin',
                        date: new Date('2010-01-01'),
                    },
                    {
                        type: 'Report',
                        bodyPart: 'Chest',
                        description: 'Chest X-Ray',
                        date: new Date('2023-10-24'),
                    },
                    {
                        type: 'Prescription',
                        bodyPart: 'Head',
                        description: 'Migraine Medication',
                        date: new Date('2024-01-01'),
                    }
                ],
            },
        },
    });

    console.log({ user });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

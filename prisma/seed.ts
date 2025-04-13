const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Seed Inspection Types
  const visual = await prisma.inspectionType.create({
    data: { name: 'Visual Inspection' },
  });

  const measurement = await prisma.inspectionType.create({
    data: { name: 'Measurement Check' },
  });

  // Seed Factories
  const factoryAlpha = await prisma.factory.create({
    data: { name: 'Alpha Textiles' },
  });

  const factoryBeta = await prisma.factory.create({
    data: { name: 'Beta Garments' },
  });

  // Seed Inspections for factoryAlpha
  await prisma.inspection.create({
    data: {
      factoryId: factoryAlpha.id,
      inspectedAt: new Date('2025-04-10T10:00:00Z'),
      barcodeNumber: 'ALP123',
      respectivePerson: 'John Doe',
      styleNumber: 'STY-A1',
      selectedQuantity: 100,
      failQuantity: 5,
      findings: {
        create: [
          { inspectionTypeId: visual.id, rating: 4 },
          { inspectionTypeId: measurement.id, rating: 3 },
        ],
      },
    },
  });

  await prisma.inspection.create({
    data: {
      factoryId: factoryAlpha.id,
      inspectedAt: new Date('2025-04-11T11:30:00Z'),
      barcodeNumber: 'ALP124',
      respectivePerson: 'Jane Smith',
      styleNumber: 'STY-A2',
      selectedQuantity: 120,
      failQuantity: 6,
      findings: {
        create: [
          { inspectionTypeId: visual.id, rating: 5 },
        ],
      },
    },
  });

  // Seed Inspections for factoryBeta
  await prisma.inspection.create({
    data: {
      factoryId: factoryBeta.id,
      inspectedAt: new Date('2025-04-12T09:00:00Z'),
      barcodeNumber: 'BET321',
      respectivePerson: 'Alice Green',
      styleNumber: 'STY-B1',
      selectedQuantity: 80,
      failQuantity: 2,
      findings: {
        create: [
          { inspectionTypeId: measurement.id, rating: 4 },
          { inspectionTypeId: visual.id, rating: 4 },
        ],
      },
    },
  });

  await prisma.inspection.create({
    data: {
      factoryId: factoryBeta.id,
      inspectedAt: new Date('2025-04-13T14:45:00Z'),
      barcodeNumber: 'BET322',
      respectivePerson: 'Tom White',
      styleNumber: 'STY-B2',
      selectedQuantity: 150,
      failQuantity: 10,
      findings: {
        create: [
          { inspectionTypeId: visual.id, rating: 3 },
        ],
      },
    },
  });

  console.log('✅ Seed data inserted!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

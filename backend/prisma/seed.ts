import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  
  const seedFilePath = path.join(__dirname, 'seedData.json');
  const fileContents = fs.readFileSync(seedFilePath, 'utf-8');
  const colleges = JSON.parse(fileContents);

  console.log(`Parsed ${colleges.length} colleges from seed file.`);

  for (const c of colleges) {
    const existingCollege = await prisma.college.findFirst({
      where: { name: c.name }
    });

    if (!existingCollege) {
      await prisma.college.create({
        data: {
          name: c.name,
          location: c.location,
          state: c.state,
          fees: c.fees,
          rating: c.rating,
          placement_percent: c.placement_percent,
          established_year: c.established_year,
          description: c.description,
          image_url: c.image_url,
          courses: JSON.stringify(c.courses)
        }
      });
      console.log(`Added college: ${c.name}`);
    } else {
      console.log(`College already exists: ${c.name}`);
    }
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

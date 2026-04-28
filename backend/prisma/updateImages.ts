import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const colleges = await prisma.college.findMany();
  const images = ['/college_campus_1.png', '/college_campus_2.png', '/college_campus_3.png'];

  for (let i = 0; i < colleges.length; i++) {
    await prisma.college.update({
      where: { id: colleges[i].id },
      data: { image_url: images[i % 3] }
    });
  }

  console.log('Successfully updated all college images to local files.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("password", 10);
  await prisma.role.upsert({
    where: { id: "admin" },
    update: {},
    create: {
      id: "admin",
      description: "This is the admin role",
    },
  });
  await prisma.role.upsert({
    where: { id: "mod" },
    update: {},
    create: {
      id: "mod",
      description: "This is the moderator role",
    },
  });
  await prisma.role.upsert({
    where: { id: "guest" },
    update: {},
    create: {
      id: "guest",
      description: "This is the guest role",
    },
  });
  await prisma.user.upsert({
    where: { id: "c27d8400-a71a-4ad2-8975-98d30f6d55d2" },
    update: {},
    create: {
      id: "c27d8400-a71a-4ad2-8975-98d30f6d55d2",
      email: "admin@mail.com",
      username: "Administrator",
      password,
    },
  });
  await prisma.userRole.upsert({
    where: {
      id: { userId: "c27d8400-a71a-4ad2-8975-98d30f6d55d2", roleId: "admin" },
    },
    update: {},
    create: {
      userId: "c27d8400-a71a-4ad2-8975-98d30f6d55d2",
      roleId: "admin",
    },
  });
  await prisma.user.upsert({
    where: { id: "2fde5a75-c713-474f-8e80-70f6598bad9d" },
    update: {},
    create: {
      id: "2fde5a75-c713-474f-8e80-70f6598bad9d",
      email: "user@mail.com",
      username: "User",
      password,
    },
  });
  await prisma.section.upsert({
    where: { id: "126d27a7-4efd-439d-881d-f3ec4379fbe6" },
    update: {},
    create: {
      id: "126d27a7-4efd-439d-881d-f3ec4379fbe6",
      name: "Announcements",
    },
  });
  await prisma.category.upsert({
    where: { id: "6a74202f-a3ed-4da8-a5f6-6d7934ba2b0d" },
    update: {},
    create: {
      id: "6a74202f-a3ed-4da8-a5f6-6d7934ba2b0d",
      name: "Forum News and Updates",
      description: "Official news, updates, and changes regarding the forum",
      sectionId: "126d27a7-4efd-439d-881d-f3ec4379fbe6",
    },
  });
  await prisma.category.upsert({
    where: { id: "b9603801-a5c6-41e6-98e2-dcdb168360a5" },
    update: {},
    create: {
      id: "b9603801-a5c6-41e6-98e2-dcdb168360a5",
      name: "Rules and Guidelines",
      description: "Forum policies and guidelines that members must follow.",
      sectionId: "126d27a7-4efd-439d-881d-f3ec4379fbe6",
    },
  });
  await prisma.category.upsert({
    where: { id: "c9128d75-35f6-47ae-b08a-140cb3de9a2b" },
    update: {},
    create: {
      id: "c9128d75-35f6-47ae-b08a-140cb3de9a2b",
      name: "Community Announcements",
      description:
        "Important announcements related to the community, events, and activities.",
      sectionId: "126d27a7-4efd-439d-881d-f3ec4379fbe6",
    },
  });
  await prisma.section.upsert({
    where: { id: "8aa0f927-af46-4474-b3cf-a39f1a658e2f" },
    update: {},
    create: {
      id: "8aa0f927-af46-4474-b3cf-a39f1a658e2f",
      name: "General Discussion",
    },
  });
  await prisma.category.upsert({
    where: { id: "12ad8e87-f62a-4aff-9ab8-4bbcfd1748c4" },
    update: {},
    create: {
      id: "12ad8e87-f62a-4aff-9ab8-4bbcfd1748c4",
      name: "Off-Topic",
      description: "Casual conversations that don't fit into other categories",
      sectionId: "8aa0f927-af46-4474-b3cf-a39f1a658e2f",
    },
  });
  await prisma.category.upsert({
    where: { id: "435296b6-de32-49f9-808b-52f0bde78f75" },
    update: {},
    create: {
      id: "435296b6-de32-49f9-808b-52f0bde78f75",
      name: "Introductions and Farewells",
      description:
        "New members introduce themselves, and departing members say goodbye",
      sectionId: "8aa0f927-af46-4474-b3cf-a39f1a658e2f",
    },
  });
  await prisma.section.upsert({
    where: { id: "ca21da54-5794-48b9-b3b0-ca9fb6d8f0e2" },
    update: {},
    create: {
      id: "ca21da54-5794-48b9-b3b0-ca9fb6d8f0e2",
      name: "Specific Discussion",
    },
  });
  await prisma.category.upsert({
    where: { id: "33bb9356-51a6-4bee-8eed-c29bb22260fc" },
    update: {},
    create: {
      id: "33bb9356-51a6-4bee-8eed-c29bb22260fc",
      name: "Hobbies and Interests",
      description:
        "Discussions about various hobbies and interests like photography, gaming, and cooking.",
      sectionId: "ca21da54-5794-48b9-b3b0-ca9fb6d8f0e2",
    },
  });
  await prisma.category.upsert({
    where: { id: "83fff378-9c63-477d-8014-00f1a84e48b4" },
    update: {},
    create: {
      id: "83fff378-9c63-477d-8014-00f1a84e48b4",
      name: "Industry Specific",
      description:
        "Topics related to specific industries such as technology, healthcare, and finance.",
      sectionId: "ca21da54-5794-48b9-b3b0-ca9fb6d8f0e2",
    },
  });
  await prisma.category.upsert({
    where: { id: "0eee1795-a1d2-4627-99db-313b99b9fd76" },
    update: {},
    create: {
      id: "0eee1795-a1d2-4627-99db-313b99b9fd76",
      name: "Education and Learning",
      description:
        "Help and discussions on educational topics like math, language learning, and coding",
      sectionId: "ca21da54-5794-48b9-b3b0-ca9fb6d8f0e2",
    },
  });
  await prisma.section.upsert({
    where: { id: "dededf7e-c126-4576-82b1-3a1c446c21c7" },
    update: {},
    create: {
      id: "dededf7e-c126-4576-82b1-3a1c446c21c7",
      name: "Support and Feedback",
    },
  });
  await prisma.category.upsert({
    where: { id: "e3177370-29d4-407d-bf91-6cfa3dfa8293" },
    update: {},
    create: {
      id: "e3177370-29d4-407d-bf91-6cfa3dfa8293",
      name: "Technical Support",
      description:
        "Help with technical issues related to the forum or related software",
      sectionId: "dededf7e-c126-4576-82b1-3a1c446c21c7",
    },
  });
  await prisma.category.upsert({
    where: { id: "6af29e80-4277-4784-a6ba-e619386878fb" },
    update: {},
    create: {
      id: "6af29e80-4277-4784-a6ba-e619386878fb",
      name: "Forum Feedback",
      description:
        "Suggestions and feedback about the forum from the community",
      sectionId: "dededf7e-c126-4576-82b1-3a1c446c21c7",
    },
  });
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

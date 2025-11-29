import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1️⃣ Create Users
  const users = await prisma.users.createMany({
    data: [
      {
        name: "Admin",
        email: "admin@example.com",
        password: "password123",
        role: "admin",
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "user",
      },
    ],
  });

  const userList = await prisma.users.findMany();

  const admin = userList[0];
  const user = userList[1];

  // 2️⃣ Create Categories
  await prisma.categories.createMany({
    data: [
      { name: "Electronics", description: "Electronic devices" },
      { name: "Clothing", description: "Fashion clothing" },
      { name: "Food & Drinks", description: "Consumable items" },
    ],
  });

  const categoryList = await prisma.categories.findMany();

  // 3️⃣ Create Products
  await prisma.products.createMany({
    data: [
      {
        id_category: categoryList[0].id_category,
        name: "Smartphone A1",
        price: 299.99,
        stock: 10,
      },
      {
        id_category: categoryList[0].id_category,
        name: "Laptop B2",
        price: 899.99,
        stock: 5,
      },
      {
        id_category: categoryList[2].id_category,
        name: "Apple Juice",
        price: 2.99,
        stock: 50,
      },
    ],
  });

  const productList = await prisma.products.findMany();

  // 4️⃣ Memberships
  await prisma.memberships.create({
    data: {
      id_user: user.id_user,
      name: "Basic Membership",
      expired_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  // 5️⃣ Absensi
  await prisma.absensi.create({
    data: {
      id_user: user.id_user,
      date: new Date(),
      status: "present",
    },
  });

  // 6️⃣ QR Sessions
  await prisma.qr_sessions.create({
    data: {
      id_user: user.id_user,
      token: "ABC123XYZ",
      expired_at: new Date(Date.now() + 5 * 60 * 1000),
    },
  });

  // 7️⃣ Likes
  await prisma.likes.create({
    data: {
      id_user: user.id_user,
      id_product: productList[0].id_product,
      status: true,
    },
  });

  // 8️⃣ Favourites
  await prisma.favourites.create({
    data: {
      id_user: user.id_user,
      id_product: productList[1].id_product,
      status: true,
    },
  });

  // 9️⃣ Comments
  await prisma.comments.create({
    data: {
      id_user: user.id_user,
      id_product: productList[0].id_product,
      comment_text: "Great product!",
    },
  });

  // 🔟 Notification Templates
  const template = await prisma.notification_templates.create({
    data: {
      message: "Welcome to the system!",
    },
  });

  // 1️⃣1️⃣ Notification Logs
  await prisma.notification_logs.create({
    data: {
      id_user: user.id_user,
      id_template: template.id_template,
    },
  });

  console.log("🎉 Seeder Success!");
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

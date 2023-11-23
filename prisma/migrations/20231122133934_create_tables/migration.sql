-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "register_date" TIMESTAMP(3) NOT NULL,
    "account_state" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adresses" (
    "id" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "adresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "category_url" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL,
    "highlighted" BOOLEAN NOT NULL,
    "image" TEXT,
    "product_url" TEXT,
    "register_date" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

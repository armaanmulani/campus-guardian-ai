generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Incident {
  id          String   @id @default(cuid())
  title       String
  description String   @db.Text
  category    String?  @default("General")
  severity    String   @default("medium")
  lat         Float    @default(23.0796)
  lng         Float    @default(76.8475)
  location    String
  timestamp   DateTime @default(now())
  status      String   @default("pending")
  reportedBy  String   @default("student_anon")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([status])
}
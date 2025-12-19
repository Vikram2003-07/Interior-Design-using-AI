import { pgTable, serial, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    email: varchar('email', { length: 256 }).notNull().unique(),
    imageUrl: varchar('imageUrl', { length: 256 }).notNull(),
    credits: integer('credits').default(3)
})

export const AiGeneratedImages = pgTable("AiGeneratedImages", {
    id: serial('id').primaryKey(),
    roomType: varchar('room_type', { length: 256 }).notNull(),
    designType: varchar('design_type', { length: 256 }).notNull(),
    originalImage: varchar('original_image', { length: 256 }).notNull(),
    aiImage: varchar('ai_image', { length: 256 }).notNull(),
    userEmail: varchar('user_email', { length: 256 })
})
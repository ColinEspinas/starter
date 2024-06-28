import { boolean, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  completed: boolean('completed').notNull(),
  user: text('user_id').notNull(),
})

export const selectTaskSchema = createSelectSchema(tasks)
export const insertTaskSchema = createInsertSchema(tasks, {
  title: z.string().max(256),
  completed: z.boolean(),
  user: z.string(),
})

export type Task = z.infer<typeof selectTaskSchema>
export type NewTask = z.infer<typeof insertTaskSchema>

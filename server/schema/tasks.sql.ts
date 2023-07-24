import { boolean, pgTable, serial, text } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  completed: boolean('completed').notNull(),
})

export const insertTaskSchema = createInsertSchema(tasks, {
  title: z.string(),
  completed: z.boolean(),
})

export const selectTaskSchema = createSelectSchema(tasks)

export type Task = z.infer<typeof selectTaskSchema>
export type NewTask = z.infer<typeof insertTaskSchema>

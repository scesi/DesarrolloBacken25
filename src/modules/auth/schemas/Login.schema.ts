import * as z from "zod"; 

export const LoginSchema = z.object({ 
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  password: z.string().min(4).max(150)
});

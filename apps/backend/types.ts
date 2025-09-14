import {email, z} from 'zod';


export const SignUpBody= z.object({
    email: z.email()
})
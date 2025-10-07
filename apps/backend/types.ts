import {email, z} from 'zod';


export const SignUpBody= z.object({
    email: z.email()
})


export const createContestBody= z.object({
    title:z.string(),
    startTime: z.iso.datetime(),
    duration: z.number()
})

export const editContestTitleBody= z.object({
    id:z.string(),
    title: z.string()
})

export const editContestStartTimeBody = z.object({
    id: z.string(),
    startTime:z.iso.datetime()
})

export const editContestDurationBody =z.object({
    id:z.string(),
    duration:z.number()
})

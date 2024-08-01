import zod from "zod"

const signUpBody = zod.object({
    username : zod.string({message : "Username is required"}).email({message : "Must be an valid email"}),
    password : zod.string({message : "Password is required"}).min(6, {
        message : 'Password must contain 6 characters'
    }),
    firstName : zod.string({message : "Firstname is required"}),
    lastName : zod.string({message : "Lastname is required"})
})

const signInBody = zod.object({
    username : zod.string({message : 'Must need to be an email'}).email({message : "Must be an valid email"}),
    password : zod.string({message : 'Password must contain 6 characters'}).min(6, {
        message : "Password must contain 6 characters"
    })
})

export function signUpBodyValidate (req: any, res:any, next:any) {
    console.log(req.body)
    const result = signUpBody.safeParse(req.body);
    if(!result.success) {
        const msg = result.error.issues.map(e => e.message).join(",");
        return res.status(400).json({
            message : msg
        })
    }
    next();
};

export function signInBodyValidate(req: any, res: any, next: any) {
    const result = signInBody.safeParse(req.body);
    if(!result.success) {
        const msg = result.error.issues.map(e => e.message).join(",");
        return res.status(400).json({
            message : msg
        })
    }
    next()
}

// KEEP DATA VALIDATION

const keepBody = zod.object({
    title : zod.string(),
    text : zod.string(),
})
.partial()
.refine(
    data => data.title || data.text,
    `Title or Text is required`
)


export function keepBodyValidate(req: any, res: any, next: any) {
    const result = keepBody.safeParse(req.body);
    if(!result.success) {
        const msg = result.error.issues.map(e => e.message).join(',');
        return res.status(400).json({
            message : msg
        })
    }
    next();
}
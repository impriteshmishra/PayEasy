import zod from "zod"

export const validator = zod.object({
    username: zod
        .string({ required_error: "username is required" })
        .trim()
        .min(5, { message: "username must have 5 character" }),



    email: zod
        .string({ required_error: "email required" })
        .trim()
        .email({ message: "invalid email" }),


    password: zod
        .string({ required_error: "password must required" })
        .trim()
        .min(5, { message: "password must have 5 character" }),


    firstName: zod
        .string({ required_error: "First name must required" })
        .trim(),


    lastName: zod
        .string({ required_error: "First name must required" })
        .trim(),


    dateOfBirth: zod
        .string({ required_error: "Date of birth is required" }) 
        .refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),


    gender: zod
        .enum(["Male", "Female", "Other"], { message: "gender is required." }),
}

);

// module.exports = validator;

// const loginSchema = zod.object(
//     // {
//     //     username: zod
//     //         .string({ required_error: "username is required" })
//     //         .trim()
//     //         .min(5, { message: "username must have 5 character" })
//     //         .max(10, { message: "username not exceed more that 10 characters" })
//     // },    // in future make username and email otional
//     {
//         email: zod
//             .string({ required_error: "email required" })
//             .trim()
//             .email({ message: "invalid email" })
//     },
//     {
//         password: zod
//             .string({ required_error: "password must required" })
//             .trim()
//             .min(8, { message: "password must have 5 character" })
//     },
// );

// module.exports = loginSchema;
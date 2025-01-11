
export const validate = (schema) => async (req, res, next) => {  //the schema is passing in the function is zod schema. must remeber this
    try {
        const parseBody = await schema.parseAsync(req.body); // req.body is from client side
        // after it check then we pass parseBody to req.body because parseBody is now validated
        req.body = parseBody;
        next(); 
    } catch (error) {
        res.status(400).json(error.message);
    }
}


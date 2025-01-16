import { Validator } from 'node-input-validator';

// Middleware function for validating request bodies based on provided field names
export function validationMiddleware(Validation: string[]) {
    return async function (req: any, res: any, next: any) {
        try {
            const validationObj: Record<string, string> = {};

            for (const key of Validation) {
                validationObj[key] = getValidation(key);
            }

            const v = new Validator(req.body, validationObj);
            const matched = await v.check();

            if (!matched) {
                return res.status(400).json({ message: "Validation error.", statusCode: 400, data: v.errors });
            }
            next();
        } catch (err) {
            console.log("-----Validations Middleware Error ----", err);
            return res.status(401).json({ data: [], message: 'Please check validation code', statusCode: 400 });
        }
    }
}

// Function to get validation rules for specific fields
function getValidation(fieldName: string): string {
    let validate;
    switch (fieldName) {
        case "email":
            validate = "required|email";
            break;
        case "mobile_number":
            validate = "required|integer|maxLength:10";
            break;
        case "zip_code":
            validate = "required";
            break;
        case "id":
            validate = "required|mongoId";
            break;
        default:
            validate = "required";
            break;
    }
    return validate;
}

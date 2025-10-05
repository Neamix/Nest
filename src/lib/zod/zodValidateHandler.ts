import { RegisterSchema } from "@/modules/Authentication/Schema/RegisterSchema";
import zodErrorHandler from "./zodErrorHandler";
import z from "zod";

export default function zodValidateHandler(formData: FormData,schema: z.ZodType): [Record<string, string>, boolean] {
    console.log(formData)
    const zodSchemaValidation = schema.safeParse(Object.fromEntries(formData));
    const isValid = zodSchemaValidation.success;
    let errorsReturn: Record<string, string> = {};

    if (!isValid) {
        const tree = z.treeifyError(zodSchemaValidation.error);
        errorsReturn = zodErrorHandler(tree);
    }

    return [errorsReturn,isValid];
}
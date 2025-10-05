
export interface ZodErrorProperty {
    properties?: Record<string, { errors: string[], properties?: Record<string, unknown> }>;  // ✅ CORRECT TYPE
    errors: string[];
}


export default function zodErrorHandler(tree: ZodErrorProperty): Record<string, string | string> {
    const errorsReturn: Record<string, string> = {};

    // If there are no properties, return an empty object
    if (!tree.properties) {
        return errorsReturn;
    }

    // Iterate over each property and extract the first error message
    Object.entries(tree.properties).forEach(([key, value]) => {
        errorsReturn[key] = value.errors?.[0] || "";
    });

    return errorsReturn;
}
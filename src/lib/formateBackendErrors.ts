export function formatBackendErrors(errors: unknown): Record<string, string> {
    const formattedErrors: Record<string, string> = {};

    if (typeof errors === "object" && errors !== null) {
        for (const [field, messages] of Object.entries(errors)) {
            formattedErrors[field] = Array.isArray(messages) ? messages?.[0] : messages;
        }
    }

    return formattedErrors;
}
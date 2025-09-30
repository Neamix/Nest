const formatErrorMessage = (error: string | string[] | undefined): string => {
    return Array.isArray(error) ? error.join(", ") : error || "";
};

export default formatErrorMessage;
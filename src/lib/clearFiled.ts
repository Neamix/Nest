interface ClearFieldError {
    fieldName: string;
    action: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}
    
export function clearFieldError({ fieldName, action }: ClearFieldError): void {
    console.log(fieldName)
    action((prev) => ({ ...prev, [fieldName]: "" }));
}
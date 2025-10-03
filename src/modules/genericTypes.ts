export interface ResponseType {
    message: string;
    date: Record<string, string>;
    status: boolean;
    errors: Record<string, string | string[]> | null;
}
// Function to check if weather datas exist
export function assertExists<T>(v: T | null | undefined, message: string): T {
    if (v === null || v === undefined) throw new Error(message);
    return v;
}
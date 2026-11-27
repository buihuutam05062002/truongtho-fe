export function logError(error,info){
    console.error("[App error]", error, info?.componentStack);
}
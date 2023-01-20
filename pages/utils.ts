export function delay<T>(milliseconds: number, value: T): Promise<T> {
    return new Promise(function(resolve) { 
        setTimeout(resolve.bind(null, value), milliseconds)
    });
}
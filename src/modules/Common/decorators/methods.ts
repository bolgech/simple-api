export function Get(url?: string, authMethod?:string) {
    return (target: Object|any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {
        const func = descriptor.value;
        target.addRoute(url,'get', func, authMethod)
    };
}
export function Post(url?: string, authMethod?:string) {
    return (target: Object|any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {
        const func = descriptor.value;
        target.addRoute(url,'post', func, authMethod)
    };
}
export function Put(url?: string, authMethod?:string) {
    return (target: Object|any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {
        const func = descriptor.value;
        target.addRoute(url,'put', func, authMethod)
    };
}
export function Delete(url?: string, authMethod?:string) {
    return (target: Object|any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {
        const func = descriptor.value;
        target.addRoute(url,'delete', func, authMethod)
    };
}
export function Patch(url?: string, authMethod?:string) {
    return (target: Object|any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {
        const func = descriptor.value;
        target.addRoute(url,'patch', func, authMethod)
    };
}
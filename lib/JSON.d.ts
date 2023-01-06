export type JSON = (JSON.Array | JSON.Object);
export declare namespace JSON {
    interface Array extends globalThis.Array<Type>, Record<number, Type> {
    }
    interface Object extends Record<string, Type> {
    }
    interface ParseCallback<T = JSON> {
        (this: T, key: string, value: T[keyof T]): (JSON.Type | undefined);
    }
    type Primitive = (boolean | null | number | string);
    interface StringifyCallback<T extends Record<string, any> = Record<string, any>> {
        (this: T, key: string, value: T[keyof T]): any;
    }
    type Type = (Array | Object | Primitive);
    function parse(text: string, reviver?: ParseCallback): JSON;
    function stringify(json: JSON, replacer: StringifyCallback, space?: string): string;
    function trace(json: JSON, path: string): (JSON.Type | undefined);
}
export default JSON;

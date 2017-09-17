function Pythonize(target: any): any {
    const getHandler = {
        get: (t, name) => {
            return t[name]
                ? t[name]
                : t.__getattr__ ? t.__getattr__(name) : undefined;

        }
    };

    const constructorHandler = {
        construct(t: any, args: any): any {
            const instance = new t(...args);
            const instanceProxy = new Proxy(instance, getHandler);
            instanceProxy.__init__ && instanceProxy.__init__();
            return instanceProxy;
        }
    };

    const targetProxy = new Proxy(target, constructorHandler);
    return targetProxy;
}

@Pythonize
class A {
    constructor() {
        console.log('Im born!');
    }

    __init__(): void {
        console.log('Init work!');
    }

    __getattr__(name: string): any {
        return `get ${name}`;
    }

    foo(): void {
        console.log('foo!');
    }
}

const a = new A();
a.foo();
console.log(a.bar);
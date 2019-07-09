// prettier-ignore
export function compose<Result>(fn: (a: any) => Result,...fns: Function[]): (a: any) => Result {
    return (...args) => fns.reduce((acc, fn) => fn(acc), fn(...args))
  }

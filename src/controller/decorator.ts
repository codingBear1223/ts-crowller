export function controller(target: any) {
  console.log("controller=>", target.prototype);
  for (let key in target.prototype) {
    console.log(Reflect.getMetadata("path", target.prototype, key));
  }
}
export function get(path: string) {
  return function (target: any, key: string) {
    console.log("get=>", target, key);
    Reflect.defineMetadata("path", path, target, key);
  };
}

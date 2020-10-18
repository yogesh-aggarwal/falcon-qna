export class ToolsService {
  static verfiyEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  static isObject(item: any) {
    return item && typeof item === "object" && !Array.isArray(item);
  }

  static deepMerge(target: any, ...sources: any): any {
    if (!sources.length) return target;
    const source = sources.shift();

    if (ToolsService.isObject(target) && ToolsService.isObject(source)) {
      for (const key in source) {
        if (ToolsService.isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          ToolsService.deepMerge(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return ToolsService.deepMerge(target, ...sources);
  }
}

export enum ContentType {
  FORM_URLENCODED,
  JSON,
  XML
}

export interface IParam {
  value: string | number;
  name: string;
}

export class Service {

  protected static ERROR_NO_URL_DEFINED = 'URL no definida';

  constructor() {
  }

  public static appendParams(service: string, params: Array<string>): string {
    let url: string = service;
    params.forEach((param) => {
      url = url + '/' + param;
    });
    return url;
  }

  public static getApiUrl(service: string, params?: Array<IParam>): string {
    if (params) {
      let url = service + '?';
      const rowLen = params.length;
      params.forEach((param, i) => {
        if (param.name) {
          if (rowLen !== i + 1) {
            url = url + param.name + '=' + param.value + '&';
          } else {
            url = url + param.name + '=' + param.value;
          }
        }
      });
      return url;
    } else {
      return service;
    }
  }

  public static prepareFilter(filter: any) {
    return {
      filter
    };
  }

  public static prepareEntity(entity: any) {
    return {
      entity
    };
  }
}

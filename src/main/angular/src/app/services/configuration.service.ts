import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IConfiguration } from '../interfaces/configuration';
import { IResponse } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private static CONFIGURATION = 'pos/configuration/';
  private static CONFIGURATION_SAVE = 'pos/configuration/save';

  constructor(private http: HttpClient) { }

  public get(): Observable<IConfiguration> {
    return this.http.get<IConfiguration>(ConfigurationService.CONFIGURATION);
  }

  public save(configuration: IConfiguration): Observable<IResponse> {
    return this.http.post<IResponse>(ConfigurationService.CONFIGURATION_SAVE, configuration);
  }
}

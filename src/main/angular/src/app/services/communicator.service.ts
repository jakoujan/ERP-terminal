import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ICommunicatorStatus } from '../interfaces/interfaces';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {

  private subject = new Subject<number>();
  private webSocket: WebSocket;

  constructor(private http: HttpClient) {
  }


  public status(): Observable<ICommunicatorStatus> {
    return this.http.get<ICommunicatorStatus>(`/pos/communicator`);
  }

  public disconnect() {
    if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.close();
    }
  }

  public onMessage(name?: string): Observable<number> {
    let endpoint = '/ws/indicator';
    if (name) {
      endpoint += `?name=${name}`;
    }
    if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.close();
    }
    this.webSocket = new WebSocket(endpoint);
    this.webSocket.onmessage = (message) => {
      this.subject.next(message.data);
    };
    return this.subject.asObservable();
  }
}

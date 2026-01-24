import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ICommunicatorStatus } from '../interfaces/interfaces';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService implements OnInit {

  private subject = new Subject<number>();
  private webSocket: WebSocket;

  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
  }

  public status(): Observable<ICommunicatorStatus> {
    return this.http.get<ICommunicatorStatus>(`/pos/communicator`);
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
      this.subject.next(JSON.parse(message.data));
    };
    return this.subject.asObservable();
  }
}

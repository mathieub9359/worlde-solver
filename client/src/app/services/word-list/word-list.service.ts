import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
  
@Injectable({
  providedIn: 'root'
})
export class WordListService {
  private _wordListFilePath = "word-list.txt"
  private _wordList: string[] = []

  constructor(private readonly http: HttpClient) {}

  get wordList(): string[] {
    return this._wordList;
  }

  async importWordListFromFile(): Promise<void> {
    // TODO : check if this is not necessary to keep in RAM, and just read the file at each word submission ? the tab takes 120 MB of memory, when wordle only takes 50 MB
    const fileContentObservable = this.http.get(this._wordListFilePath, {responseType: 'text'});
    this._wordList = (await firstValueFrom(fileContentObservable)).split('\n');
  }
}

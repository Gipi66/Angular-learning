import {Injectable} from '@angular/core';
import {Hero} from './Hero';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private heroesUrl = 'api/heroes';

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`fetched heroes: ${heroes}`)),
        catchError(this.handleError('get heroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  private log(message: String) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(opearation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${opearation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>(`updateHero`))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((h: Hero) => this.log(`added hero w/ id=${h.id}`)),
        catchError(this.handleError<Hero>(`addHero`))
      );
  }

  delete(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`delete hero id=${id}`)),
      catchError(this.handleError<Hero>(`deleteHero`))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    let result = of([]);
    if (term.trim()) {
      result = this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
        tap(_ => this.log(`found heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>(`serachHeroes`, []))
      );
    }

    return result;
  }
}

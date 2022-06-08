import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  
  genre:Observable<any[]> = of([{id:28,name:'Action'},{id:12,name:'Adventures'},{id:16,name:'Animation'},{id:35,name:'Comedy'},{id:80,name:'Crime'},{id:99,name:'Documentary'},{id:18,name:'Drama'},{id:10751,name:'Family'},{id:14,name:'Fantacy'},{id:36,name:'History'},{id:27,name:'Horror'},{id:10402,name:'Music'},{id:9648,name:'Mystery'},{id:10749,name:'Romance'},{id:878,name:'Science Fiction'},{id:10770,name:'Tv'},{id:53,name:'Thriller'},{id:10752,name:'War'},{id:37,name:'Western'},]);
  
  //Movies List
  private movieSource = new Subject();
  moviesData = this.movieSource.asObservable();
  
  //Particular Movie details
  private moviedetailSource=new Subject();
  moviedetailsData=this.moviedetailSource.asObservable();

  //movie review
  private moviereviewSource=new Subject();
  moviereviewData=this.moviereviewSource.asObservable();

  constructor(private http:HttpClient) {}
  
  getGenreList():Observable<any[]>{
    return this.genre;
  }

  getallMovies(url:any){
    let movies:any;
    this.http.get(url).subscribe((res)=>{
      movies=res;
      this.movieSource.next(movies)
    })
  }

  getMovieDetails(url:any){
    let moviedetails:any;
    this.http.get(url).subscribe((res)=>{
      moviedetails=res;
      this.moviedetailSource.next(moviedetails);
    })
  }

  getMovieReviews(url:any){
    let moviereview:any;
    this.http.get(url).subscribe((res)=>{
      moviereview=res;
      this.moviereviewSource.next(moviereview);
    })
  }
}

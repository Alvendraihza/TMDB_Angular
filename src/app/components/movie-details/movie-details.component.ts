import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails } from 'src/app/common/movie-details';
import myAppConfig from 'src/app/config/my-app-config';
import { MoviesService } from 'src/app/services/movies.service';

var movie_id=0;
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  imgUrl:string=myAppConfig.tmdb.imgUrl;
  movieDetails:MovieDetails={} as MovieDetails;
  reviewList:any;
  noreview:boolean=false;

  constructor(private route:ActivatedRoute,private router:Router,private movieservice:MoviesService) { 
    let id=this.route.snapshot?.params['id'];
    movie_id=id;
  }
  ngOnInit(): void {
    this.router?.navigateByUrl('/moviedetails/'+movie_id);

    this.getMovieDetails(movie_id);

  }

  getMovieDetails(id:number) {

    // To get the movie details
    let api_url=myAppConfig.tmdb.movieBaseUrl+'/movie/'+id+'?'+myAppConfig.tmdb.apikey;
    this.getMovieDetailsData(api_url);

    //To get the reviews
    let reviews_url=myAppConfig.tmdb.movieBaseUrl+'/movie/'+id+'/reviews?'+myAppConfig.tmdb.apikey;
    this.getReviews(reviews_url);
  }
  
  getReviews(reviews_url: string) {
    this.movieservice.getMovieReviews(reviews_url);
    
    let tempreviewData:any;
    this.movieservice.moviereviewData.subscribe((data)=>{
      tempreviewData=data;

      if(tempreviewData.total_results==0){
        this.noreview=true;
      }else{
        this.noreview=false;
        this.reviewList=tempreviewData.results;
      }
    })
  }

  getMovieDetailsData(url: string) {
    this.movieservice.getMovieDetails(url);

    let tempMovieDetails:any;
    this.movieservice.moviedetailsData.subscribe((data)=>{
    
      tempMovieDetails=data;

      //Default Movie Details 
      this.movieDetails.backdrop_path=tempMovieDetails.backdrop_path;
      this.movieDetails.backdrop_path=tempMovieDetails.backdrop_path;
      this.movieDetails.budget=tempMovieDetails.budget;
      this.movieDetails.homepage=tempMovieDetails.homepage;
      this.movieDetails.id=tempMovieDetails.id;
      this.movieDetails.imdb_id=tempMovieDetails.imdb_id;
      this.movieDetails.original_lan=tempMovieDetails.original_language;
      this.movieDetails.original_title=tempMovieDetails.original_title;
      this.movieDetails.overview=tempMovieDetails.overview;
      this.movieDetails.popularity=tempMovieDetails.popularity;
      this.movieDetails.poster_path=tempMovieDetails.poster_path;
      this.movieDetails.production_companies=tempMovieDetails.production_companies;
      this.movieDetails.production_countries=tempMovieDetails.production_countries;
      this.movieDetails.runtime=tempMovieDetails.runtime;
      this.movieDetails.genre=tempMovieDetails.genres;
      this.movieDetails.release_date=tempMovieDetails.release_date;
      this.movieDetails.revenue=tempMovieDetails.revenue;
      this.movieDetails.status=tempMovieDetails.status;
      this.movieDetails.vote_average=tempMovieDetails.vote_average;
    
    })
  }

  float2int (value:any) {
    return value | 0;
  }

}


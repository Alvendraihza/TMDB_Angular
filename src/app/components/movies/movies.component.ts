import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import myAppConfig from 'src/app/config/my-app-config';
import { FormControl, FormGroup } from '@angular/forms';

var sort_by_desc="popularity.desc",
Search_value="",
genre_id="";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  imgUrl:string=myAppConfig.tmdb.imgUrl;
  movieList:any;
  genreList:any;

  genre_value:string="";

  searchForm!:FormGroup;
  ishidedrop:boolean=false;
  constructor(private movieservice:MoviesService) { 
    this.searchForm=new FormGroup({
      'movieName':new FormControl("")
    })
    if(Search_value==""){
      this.ishidedrop=false;
      
    }else{
      this.ishidedrop=true;
    }
  }

  ngOnInit(): void {
    this.getGenre()
    this.getMovies()
  }

    getMoviesData(url:any) { 
    this.movieservice.getallMovies(url);

    let tempMoviesList:any;
    this.movieservice.moviesData.subscribe((data)=>{
       tempMoviesList=data;
       this.movieList=tempMoviesList.results;
     });  
  }

  getGenre() {
    this.movieservice.getGenreList().subscribe((data)=>{
      this.genreList=data;
      // console.log(data);
    })
  }

  getMovies() {
      this.genre_value="";
      genre_id="";
      if(Search_value==" "|| Search_value==""){
        let apiurl=myAppConfig.tmdb.movieBaseUrl+'/discover/movie?sort_by='+sort_by_desc+'&'+myAppConfig.tmdb.apikey;
        this.getMoviesData(apiurl);
      } else {
        this.getMoviesData(myAppConfig.tmdb.movieBaseUrl+'/search/movie?'+myAppConfig.tmdb.apikey+'&query='+Search_value);
      }
  }
  
  getSearchContent() {
    this.genre_value="";
    Search_value=this.searchForm.value.movieName;
      if(Search_value){
        let SEARCH_URL=myAppConfig.tmdb.movieBaseUrl+"/search/movie?"+myAppConfig.tmdb.apikey+'&query='+Search_value;
        this.getMoviesData(SEARCH_URL)
        this.ishidedrop=true;
      }
      else{
        this.ishidedrop=false;
        sort_by_desc="popularity.desc";
        let  api_url=myAppConfig.tmdb.movieBaseUrl+'/discover/movie?sort_by='+sort_by_desc+'&'+myAppConfig.tmdb.apikey;
        this.getMoviesData(api_url)  
      }
  }

  getGenreContent(id:any,name:string){
    genre_id=id;
    this.genre_value=name+' Movies';
    if(Search_value==""){
      this.ishidedrop=false;
        let genre_api_url=myAppConfig.tmdb.movieBaseUrl+'/discover/movie?'+myAppConfig.tmdb.apikey+'&with_genres='+genre_id+'&sort_by='+sort_by_desc;
        this.getMoviesData(genre_api_url);
    }else{
      this.ishidedrop=true;
      this.genre_value="";
      let genre_api_url=myAppConfig.tmdb.movieBaseUrl+'/search/movie?'+myAppConfig.tmdb.apikey+'&query='+Search_value;
      this.getMoviesData(genre_api_url)
    }
  }

  float2int (value:any) {
    return value | 0;
  }
}

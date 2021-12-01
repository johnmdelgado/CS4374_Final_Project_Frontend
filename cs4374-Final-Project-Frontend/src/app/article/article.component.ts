import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddPostService } from '../add-post.service';
import { PostPayload } from '../add-post/post-payload';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: PostPayload;
  permaLink: Number;
  constructor(private router: ActivatedRoute, private postService: AddPostService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.permaLink = params['id'];
    });

    this.postService.getPost(this.permaLink).subscribe((data:PostPayload) => {
      this.article = data;
    },(err: any) => {
      console.log('Failure Response');
    })
  }

}

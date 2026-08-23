import {Component, inject} from '@angular/core';
import {AuthApiService} from '../../../core/services/auth-api-service';
import {Router} from '@angular/router';
import {UserPanel} from '../user-panel/user-panel';
import {SearchBar} from '../search-bar/search-bar';

@Component({
  selector: 'app-header',
  imports: [UserPanel, SearchBar],
  templateUrl: './header.html',
})
export class Header {
  authService = inject(AuthApiService);
  router = inject(Router);
}

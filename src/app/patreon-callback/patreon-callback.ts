import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patreon-callback',
  imports: [CommonModule],
  template: `
    <div class="callback-container">
      <div class="callback-content">
        <h2>{{ status }}</h2>
        <p>{{ message }}</p>
        <div *ngIf="loading" class="spinner"></div>
      </div>
    </div>
  `,
  styles: [`
    .callback-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }
    
    .callback-content {
      text-align: center;
      max-width: 400px;
    }
    
    .spinner {
      border: 3px solid #f3f3f3;
      border-top: 3px solid #FF424D;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 20px auto;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    h2 {
      margin-bottom: 10px;
    }
    
    p {
      color: #666;
    }
  `]
})
export class PatreonCallbackComponent implements OnInit {
  loading = true;
  status = 'Connecting to Patreon...';
  message = 'Please wait while we complete your sign in.';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    // Get the authorization code from URL parameters
    this.route.queryParams.subscribe(async params => {
      const code = params['code'];
      const error = params['error'];

      if (error) {
        this.handleError('Authentication cancelled or failed');
        return;
      }

      if (!code) {
        this.handleError('No authorization code received');
        return;
      }

      try {
        // Exchange code for token via our backend API
        const response = await fetch('/api/patreon/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
            redirect_uri: 'https://gomodoro.drewgo.com/patreon/callback',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to exchange token');
        }

        const data = await response.json();

        // Store user data and tokens
        // TODO: In production, store tokens more securely (e.g., httpOnly cookies)
        localStorage.setItem('patreon_user', JSON.stringify(data.user));
        localStorage.setItem('patreon_access_token', data.access_token);
        
        // Optionally store refresh token if you need it
        // localStorage.setItem('patreon_refresh_token', data.refresh_token);

        this.status = 'Success!';
        this.message = `Welcome, ${data.user.attributes.full_name || 'Patron'}!`;
        this.loading = false;

        // Close popup if opened in popup, otherwise redirect
        if (window.opener) {
          // Notify parent window of successful login
          window.opener.postMessage({ type: 'patreon_login_success', user: data.user }, '*');
          window.close();
        } else {
          // Redirect to home after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        }

      } catch (error) {
        console.error('Error during Patreon callback:', error);
        this.handleError('Failed to complete sign in. Please try again.');
      }
    });
  }

  private handleError(message: string) {
    this.loading = false;
    this.status = 'Error';
    this.message = message;

    // Close popup or redirect after delay
    setTimeout(() => {
      if (window.opener) {
        window.opener.postMessage({ type: 'patreon_login_error', message }, '*');
        window.close();
      } else {
        this.router.navigate(['/']);
      }
    }, 3000);
  }
}

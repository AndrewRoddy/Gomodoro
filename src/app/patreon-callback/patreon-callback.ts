import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patreon-callback',
  imports: [CommonModule],
  template: `
    <div class="callback-container">
      <div class="callback-content">
        <h2>{{ status }}</h2>
        <p>{{ message }}</p>
      </div>
    </div>
  `,
  styles: [`
    .callback-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .callback-content {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      margin: 0 0 1rem 0;
      color: #333;
    }
    
    p {
      margin: 0;
      color: #666;
    }
  `]
})
export class PatreonCallbackComponent implements OnInit {
  status = 'Processing...';
  message = 'Please wait while we complete your sign in.';

  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  ngOnInit() {
    // Only process in browser environment
    if (!this.isBrowser) {
      return;
    }

    // Get the authorization code from URL
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      const error = params['error'];

      if (error) {
        this.handleError(error, params['error_description']);
        return;
      }

      if (code) {
        this.exchangeCodeForToken(code);
      } else {
        this.handleError('missing_code', 'No authorization code received');
      }
    });
  }

  private async exchangeCodeForToken(code: string) {
    try {
      // Determine the correct redirect URI based on current location
      const redirectUri = `${window.location.origin}/patreon/callback`;

      // Call your backend API to exchange the code for tokens
      const response = await fetch('/api/patreon/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, redirect_uri: redirectUri }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to authenticate');
      }

      const data = await response.json();

      // Send the authentication data back to the parent window
      if (window.opener) {
        window.opener.postMessage(
          {
            type: 'PATREON_AUTH_SUCCESS',
            data: {
              access_token: data.access_token,
              user: data.user,
              expires_in: data.expires_in,
            },
          },
          window.location.origin
        );
      }

      this.status = 'Success!';
      this.message = 'You have been signed in. This window will close shortly.';

      // Close the popup after a short delay
      setTimeout(() => {
        window.close();
      }, 1500);
    } catch (error) {
      console.error('Token exchange error:', error);
      this.handleError('token_exchange_failed', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private handleError(error: string, description?: string) {
    this.status = 'Authentication Failed';
    this.message = description || error;

    // Send error back to parent window
    if (window.opener) {
      window.opener.postMessage(
        {
          type: 'PATREON_AUTH_ERROR',
          error: error,
          description: description,
        },
        window.location.origin
      );
    }

    // Close the popup after showing the error
    setTimeout(() => {
      window.close();
    }, 3000);
  }
}

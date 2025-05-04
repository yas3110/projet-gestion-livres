import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // ✅ Fournit HttpClient
import { AppComponent } from './app/app.component'; // Ton composant racine

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient() // ✅ Nécessaire pour HttpClient dans les services
  ]
}).catch(err => console.error(err));

import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';

import { Router, NavigationEnd, NavigationStart, NavigationError } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

// conditional imports
import { remote } from 'electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loader = this.loadingBar.useRef();

  window: Boolean = false;
  remote: typeof remote;
  currentWindow = remote.getCurrentWindow();

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,

    private router: Router,
    private loadingBar: LoadingBarService
  ) {
    this.translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      this.window = true;
      this.remote = this.electronService.remote;

      console.log(process.env);
      
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);


    } else {
      this.window = false;

      console.log('Run in browser');
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loader.start();
      }
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.loader.complete();
        }, 2000);
      }
      if (event instanceof NavigationError) {
        setTimeout(() => {
          this.loader.stop();
        }, 2000);
      }
    });
  }

  minimize(): void {
    remote.getCurrentWindow().minimize();
  }

  maximize(): void {
    if (this.currentWindow.isMaximized()) {
      this.currentWindow.restore();
      //$(".maximize").html('<svg viewBox="0 0 10 10"><path d="M0,0v10h10V0H0z M9,9H1V1h8V9z" /></svg>')
    } else {
      this.currentWindow.maximize();
      //$(".maximize").html('<svg viewBox="0 0 10.2 10.1"><path d="M2.1,0v2H0v8.1h8.2v-2h2V0H2.1z M7.2,9.2H1.1V3h6.1V9.2z M9.2,7.1h-1V2H3.1V1h6.1V7.1z" /></svg>')
    }
  }

  exit(): void {
    remote.app.quit();
  }

}

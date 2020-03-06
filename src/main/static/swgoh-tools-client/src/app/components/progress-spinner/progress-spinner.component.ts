import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DataStoreService } from './../../services/data-store.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit, OnDestroy {

  public lockInput: boolean = false;

  protected unsubscribe$ = new Subject<void>();

  constructor(private dataStoreService: DataStoreService) { }

  ngOnInit() {
    this.dataStoreService.lockInput$.pipe(takeUntil(this.unsubscribe$)).subscribe(lockInput => {
      this.lockInput = lockInput;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

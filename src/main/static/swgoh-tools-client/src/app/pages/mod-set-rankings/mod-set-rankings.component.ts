import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DataStoreService } from './../../services/data-store.service';
import { Subject, Observable, forkJoin } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';
import { SwgohGgCalc, ModUnitCalcResults, ModCalculatedData, SetTotalCounts, PrimaryCounts } from './../../calcs/swgoh-gg-calc';
import { PlayerFilterComponent } from './../../components/player-filter/player-filter.component';
import { RootObject, Player } from './../../model/swgohgg/guild-data';
import { Mods } from './../../model/swgohgg/mods-data';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ColumnSelectorComponent, ColumnDto } from './../../components/column-selector/column-selector.component';



@Component({
  selector: 'app-mod-set-rankings',
  templateUrl: './mod-set-rankings.component.html',
  styleUrls: ['./mod-set-rankings.component.scss']
})
export class ModSetRankingsComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<ModUnitCalcResults>;

  @ViewChild(MatSort) sort: MatSort;

  protected unsubscribe$ = new Subject<void>();

  calculatedGuildData: ModCalculatedData = null; // selected guild characters mod calcs
  targetMods: Mods[] = null;
  selectedCharacters: string[] = []; // characters filtered to show

  allColumns: ColumnDto[] = [
    { label: 'Name', name: 'name', statColumn: false },
    { label: 'Set', name: 'set', statColumn: false },
    { label: 'Speed Rank', name: 'secondaryTotals.speedRank', statColumn: true },
    { label: 'Speed', name: 'secondaryTotals.speed', statColumn: true },
    { label: 'Offense Rank', name: 'secondaryTotals.offenseRank', statColumn: true },
    { label: 'Offense', name: 'secondaryTotals.offense', statColumn: true },
    { label: 'Offense %', name: 'secondaryTotals.offensePercent', statColumn: true },
    { label: 'Offense *', name: 'secondaryTotals.offenseRolls', statColumn: true },
    { label: 'Crit Chance Rank', name: 'secondaryTotals.critChanceRank', statColumn: true },
    { label: 'Crit Chance', name: 'secondaryTotals.critChance', statColumn: true },
    { label: 'Potency Rank', name: 'secondaryTotals.potencyRank', statColumn: true },
    { label: 'Potency', name: 'secondaryTotals.potency', statColumn: true },
    { label: 'Health Rank', name: 'secondaryTotals.healthRank', statColumn: true },
    { label: 'Health', name: 'secondaryTotals.health', statColumn: true },
    { label: 'Health %', name: 'secondaryTotals.healthPercent', statColumn: true },
    { label: 'Health *', name: 'secondaryTotals.healthRolls', statColumn: true },
    { label: 'Protection Rank', name: 'secondaryTotals.protectionRank', statColumn: true },
    { label: 'Protection', name: 'secondaryTotals.protection', statColumn: true },
    { label: 'Protection %', name: 'secondaryTotals.protectionPercent', statColumn: true },
    { label: 'Protection *', name: 'secondaryTotals.protectionRolls', statColumn: true },
    { label: 'Defense Rank', name: 'secondaryTotals.defenseRank', statColumn: true },
    { label: 'Defense', name: 'secondaryTotals.defense', statColumn: true },
    { label: 'Defense %', name: 'secondaryTotals.defensePercent', statColumn: true },
    { label: 'Defense *', name: 'secondaryTotals.defenseRolls', statColumn: true },
    { label: 'Tenacity Rank', name: 'secondaryTotals.tenacityRank', statColumn: true },
    { label: 'Tenacity', name: 'secondaryTotals.tenacity', statColumn: true }
  ];

  statColumns: ColumnDto[];

  visibleColumns: string[] = ['name', 'set', 'secondaryTotals.speedRank', 'secondaryTotals.offenseRank', 'secondaryTotals.critChanceRank', 'secondaryTotals.potencyRank',
    'secondaryTotals.healthRank', 'secondaryTotals.protectionRank', 'secondaryTotals.defenseRank', 'secondaryTotals.tenacityRank'];

  constructor(private dataStoreService: DataStoreService, private cdr: ChangeDetectorRef, public dialog: MatDialog) { }

  ngOnInit() {
    this.statColumns = this.allColumns.filter(column => {
      return column.statColumn == true;
    })
    this.setDataSource([]);
  }

  setDataSource(results: ModUnitCalcResults[]) {

    this.dataSource = new MatTableDataSource(results);
    this.dataSource.sortingDataAccessor = (obj, property) => {
      let value = this.getProperty(obj, property);
      return value;
    };
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate =
      (data: ModUnitCalcResults, filter: string) => this.selectedCharacters.indexOf(data.name) != -1;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getProperty = (obj, path) => (
    path.split('.').reduce((o, p) => o && o[p], obj)
  )

  reCalculate() {
    this.calculatedGuildData = SwgohGgCalc.calculateMods(this.targetMods);
    this.setDataSource(this.calculatedGuildData.modCalcResults.units);
  }

  selectPlayers(players: number[]) {

    (async () => {
      await delay(1);
      this.dataStoreService.setLockInput(true);
      this.dataStoreService.getPlayerListModData(players)
        .subscribe(response => {

          //handle success response
          console.log("get players success");
          if (response != null) {
            this.targetMods = response;
            this.reCalculate();
            this.cdr.detectChanges();
          }
        }, (error) => {
          // error handling
          console.log("get players error: " + error);
        }, () => {
          this.dataStoreService.setLockInput(false);
          // when observable is completed
          console.log("get players complete");
        });
    })();
  }

  selectCharacters(characters) {
    this.selectedCharacters = characters;
    if (this.dataSource)
      this.dataSource.filter = characters;
  }

  configureColumns() {
    const dialogRef = this.dialog.open(ColumnSelectorComponent, {
      width: '600px',
      data: {
        displayedColumns: this.visibleColumns,
        fullList: this.allColumns
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.visibleColumns = result;
      }
    });
  }

  selectedUnits(): ModUnitCalcResults[] {
    return this.calculatedGuildData.modCalcResults.units.filter(mucr => this.selectedCharacters.indexOf(mucr.name) != -1);
  }

}

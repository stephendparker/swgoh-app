import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DataStoreService } from './../../services/data-store.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil, startWith, map } from 'rxjs/operators';
import { Gear } from './../../model/swgohgg/gear-data';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

class PackItemDto {
  item: Item;
  count: number;
}

class GearCrystalCost {
  name: string;
  count: number;
  crystals: number;
  roughGuess?: number = null;
}

class GearValue {
  name: string;
  count: number;
  value: number;
  crystalCost: GearCrystalCost;
  gear: Gear;
}

class Item {
  name: string;
  cost: number;
}

@Component({
  selector: 'app-pack-value',
  templateUrl: './pack-value.component.html',
  styleUrls: ['./pack-value.component.scss']
})
export class PackValueComponent implements OnInit, OnDestroy {

  protected unsubscribe$ = new Subject<void>();

  gearData: Gear[] = null;
  gearNameList: string[] = [];

  addItemControl = new FormControl();

  itemList: Item[];
  packCost: number = 0;
  packName: '';

  gearCrystalCosts: GearCrystalCost[] = [
    { name: 'Mk 3 Carbanti Sensor Array Salvage', count: 50, crystals: 1400 },
    { name: 'Mk 3 Carbanti Sensor Array', count: 1, crystals: 1400 },
    { name: 'Mk 3 Czerka Stun Cuffs', count: 1, crystals: 1400 },
    { name: 'Mk 3 Czerka Stun Cuffs Salvage', count: 50, crystals: 1400 },
    { name: 'Mk 3 Chedak Comlink', count: 1, crystals: 545 },
    { name: 'Mk 3 Sienar Holo Projector', count: 1, crystals: 300 },

    { name: 'Mk 4 Arakyd Droid Caller', count: 2, crystals: 600 },
    { name: 'Mk 4 Chedak Comlink', count: 1, crystals: 2541 },
    { name: 'Mk 4 Zaltin Bacta Gel Salvage', count: 10, crystals: 280 },
    { name: 'Mk 4 SoroSuub Keypad', count: 2, crystals: 600 },
    { name: 'Mk 4 Sienar Holo Projector', count: 1, crystals: 2800 },
    { name: 'Mk 4 Sienar Holo Projector Salvage', count: 20, crystals: 560 },
    { name: 'Mk 4 Zaltin Bacta Gel Salvage', count: 10, crystals: 280 },

    { name: 'Mk 5 A/KT Stun Gun', count: 1, crystals: 2541 },
    { name: 'Mk 5 A/KT Stun Gun Prototype Salvage', count: 50, crystals: 1300 },
    { name: 'Mk 5 A/KT Stun Gun Prototype', count: 1, crystals: 1274 },
    { name: 'Mk 5 CEC Fusion Furnace', count: 1, crystals: 1400 },
    { name: 'Mk 5 Arakyd Droid Caller', count: 1, crystals: 1400 },
    { name: 'Mk 5 Arakyd Droid Caller Salvage', count: 50, crystals: 1400 },
    { name: 'Mk 5 Athakam Medpac', count: 1, crystals: 2250 },
    { name: 'Mk 5 Athakam Medpac Component', count: 10, crystals: 150 },
    { name: 'Mk 5 CEC Fusion Furnace', count: 1, crystals: 1400 },
    { name: 'Mk 5 CEC Fusion Furnace Salvage', count: 20, crystals: 560 },
    { name: 'Mk 5 Merr-Sonn Thermal Detonator', count: 25, crystals: 2541 },
    { name: 'Mk 5 Merr-Sonn Thermal Detonator Prototype', count: 1, crystals: 1274 },
    { name: 'Mk 5 Merr-Sonn Thermal Detonator Prototype Salvage', count: 25, crystals: 375 },

    { name: 'Mk 6 CEC Fusion Furnace', count: 1, crystals: 3500 },
    { name: 'Mk 6 Athakam Medpac Salvage', count: 20, crystals: 600 },
    { name: 'Mk 6 Arakyd Droid Caller Salvage', count: 10, crystals: 280 },
    { name: 'Mk 6 Carbanti Sensor Array Salvage', count: 5, crystals: 150 },
    { name: 'Mk 6 Arakyd Droid Caller Salvage', count: 25, crystals: 700 },
    { name: 'Mk 6 Chiewab Hypo Syringe', count: 1, crystals: 1400 },
    { name: 'Mk 6 Chiewab Hypo Syringe Salvage', count: 20, crystals: 560 },
    { name: 'Mk 6 BioTech Implant Prototype', count: 1, crystals: 273 },
    { name: 'Mk 6 Merr-Sonn Thermal Detonator', count: 1, crystals: 1400 },
    { name: 'Mk 6 Merr-Sonn Thermal Detonator Salvage', count: 10, crystals: 280 },
    { name: 'Mk 6 Nubian Design Tech', count: 1, crystals: 1400 },
    { name: 'Mk 6 Nubian Design Tech Salvage', count: 10, crystals: 280 },

    { name: 'Mk 7 Chiewab Hypo Syringe Salvage', count: 15, crystals: 450 },
    { name: 'Mk 7 Kyrotech Shock Prod Prototype Salvage', count: 50, crystals: 1400 },
    { name: 'Mk 7 Nubian Security Scanner', count: 1, crystals: 1400 },
    { name: 'Mk 7 Nubian Security Scanner Salvage', count: 20, crystals: 560 },
    { name: 'Mk 7 Merr-Sonn Shield Generator', count: 1, crystals: 2800 },
    { name: 'Mk 7 Merr-Sonn Shield Generator Salvage', count: 20, crystals: 500 },
    { name: 'Mk 7 Merr-Sonn Thermal Detonator Salvage', count: 15, crystals: 450 },

    { name: 'Mk 8 BioTech Implant', count: 1, crystals: 2000 },
    { name: 'Mk 8 BioTech Implant Component', count: 50, crystals: 750 },
    { name: 'Mk 8 BioTech Implant Salvage', count: 50, crystals: 1250 },
    { name: 'Mk 8 Nubian Design Tech Salvage', count: 20, crystals: 600 },
    { name: 'Mk 8 Nubian Security Scanner Salvage', count: 1075, crystals: 32250 },  // not verified in game
    { name: 'Mk 8 BlasTech Weapon Mod Prototype', count: 1, crystals: 273 },

    { name: 'Mk 9 Kyrotech Battle Computer Prototype Salvage', count: 25, crystals: 700 },
    { name: 'Mk 9 BioTech Implant Salvage', count: 50, crystals: 1400 },
    { name: 'Mk 9 Neuro-Saav Electrobinoculars', count: 1, crystals: 1250 },
    { name: 'Mk 9 BioTech Implant Salvage', count: 10, crystals: 280 },
    { name: 'Mk 9 Fabritech Data Pad', count: 1, crystals: 2250 },
    { name: 'Mk 9 Fabritech Data Pad Component', count: 10, crystals: 150 },

    { name: 'Mk 10 TaggeCo Holo Lens', count: 1, crystals: 1250 },
    { name: 'Mk 10 TaggeCo Holo Lens Salvage', count: 20, crystals: 500 },
    { name: 'Mk 10 Neuro-Saav Electrobinoculars', count: 1, crystals: 1250 },

    { name: 'Mk 11 BlasTech Weapon Mod', count: 1, crystals: 1400 },

    { name: 'Mk 12 ArmaTek Armor Plating', count: 1, crystals: 2100 },
    { name: 'Mk 12 ArmaTek Armor Plating Prototype Salvage', count: 300, crystals: 900 },
    { name: 'Mk 12 ArmaTek Bayonet', count: 1, crystals: 2100 },
    { name: 'Mk 12 ArmaTek Bayonet Prototype Salvage', count: 30, crystals: 900 },
    { name: 'Mk 12 ArmaTek Cybernetics Prototype Salvage', count: 15, crystals: 450 },
    { name: 'Mk 12 ArmaTek Data Pad', count: 1, crystals: 5600 },
    { name: 'Mk 12 ArmaTek Data Pad Prototype Salvage', count: 25, crystals: 875 },
    { name: 'Mk 12 ArmaTek Fusion Furnace', count: 1, crystals: 5750 },
    { name: 'Mk 12 ArmaTek Fusion Furnace Prototype Salvage', count: 10, crystals: 350 },
    { name: 'Mk 12 ArmaTek Holo Lens', count: 1, crystals: 5600 },
    { name: 'Mk 12 ArmaTek Holo Lens Prototype Salvage', count: 25, crystals: 875 },
    { name: 'Mk 12 ArmaTek Key Pad', count: 1, crystals: 5600 },
    { name: 'Mk 12 ArmaTek Key Pad Prototype Salvage', count: 25, crystals: 875 },
    { name: 'Mk 12 ArmaTek Medpac', count: 1, crystals: 2100 },
    { name: 'Mk 12 ArmaTek Medpac Prototype Salvage', count: 15, crystals: 450 },
    { name: 'Mk 12 ArmaTek Multi-tool', count: 1, crystals: 2100 },
    { name: 'Mk 12 ArmaTek Stun Gun', count: 1, crystals: 5750 },
    { name: 'Mk 12 ArmaTek Stun Gun Prototype Salvage', count: 10, crystals: 350 },
    { name: 'Mk 12 ArmaTek Thermal Detonator', count: 1, crystals: 5750 },
    { name: 'Mk 12 ArmaTek Thermal Detonator Prototype Salvage', count: 25, crystals: 875 },
    { name: 'Mk 12 Czerka Hypo Syringe Prototype Salvage', count: 250, crystals: 750 },
    { name: 'Mk 12 Czerka Implant Prototype Salvage', count: 10, crystals: 300 },
    { name: 'Mk 12 Czerka Security Scanner Prototype Salvage', count: 50, crystals: 1500 },
    { name: 'Mk 12 Czerka Sensor Array Prototype Salvage', count: 25, crystals: 750 },
    { name: 'Mk 12 Czerka Shield Generator Prototype Salvage', count: 25, crystals: 750 },
    { name: 'Mk 12 Czerka Stun Cuffs Prototype Salvage', count: 25, crystals: 750 },

    { name: 'Injector Cell Salvage', count: 50, crystals: 1750 },
    { name: 'Injector Handle Salvage', count: 50, crystals: 1750 },
    { name: 'Injector Head Salvage', count: 50, crystals: 1750 },

    { name: 'Fragmented Signal Data', count: 100, crystals: 1500 },
    { name: 'Incomplete Signal Data', count: 50, crystals: 1000 },
    { name: 'Flawed Signal Data', count: 50, crystals: 1500 },

    { name: 'Carbonite Circuit Board', count: 100, crystals: 500 },
    { name: 'Bronzium Wiring', count: 50, crystals: 1000 },
    { name: 'Chromium Transistor', count: 25, crystals: 1000 },
    { name: 'Aurodium Heatsink', count: 10, crystals: 1000 },
    { name: 'Electrium Conductor', count: 15, crystals: 1725 },
    { name: 'Zinbiddle Card', count: 15, crystals: null, roughGuess: 2500 },

    { name: 'Boba Fett', count: 15, crystals: 750 },
    { name: 'Cad Bane', count: 15, crystals: 750 },
    { name: 'Bossk', count: 15, crystals: 1200 },
    { name: 'First Order Executioner', count: 16, crystals: 1280 },
    { name: 'Veteran Smuggler Han Solo', count: 4, crystals: 320 },
    { name: 'Resistance Hero Finn', count: 8, crystals: 640 },
    { name: 'Kylo Ren (Unmasked)', count: 15, crystals: 1200 },
    { name: 'Kylo Ren', count: 15, crystals: 750 },
    { name: 'First Order TIE Pilot', count: 15, crystals: 750 },
    { name: 'General Hux', count: 16, crystals: 1280 },

    { name: 'TIE Silencer', count: 15, crystals: 1500 },
    { name: 'First Order TIE Fighter', count: 15, crystals: 975 },
    { name: 'Slave 1', count: 15, crystals: 975 },
    { name: 'Kylo Ren Command Shuttle', count: 15, crystals: 1500 },
    { name: "Hound's Tooth", count: 15, crystals: 1500 },
    { name: "TIE Advanced x1", count: 15, crystals: 1500 },
    { name: "Xanadu Blood", count: 15, crystals: 1500 },

    { name: 'Crystals', count: 1, crystals: 1 },
    { name: 'Credits', count: 2000000, crystals: null, roughGuess: 1120 },
    { name: 'Omega', count: 1, crystals: null, roughGuess: 200 },
    { name: 'Ability Material Zeta', count: 1, crystals: null, roughGuess: 300 },
  ];

  // medGalLegendsGearBundle: PackItemDto[] = [
  //   { item: 'Mk 12 ArmaTek Thermal Detonator Prototype', count: 1 },
  //   { item: 'Mk 12 ArmaTek Key Pad Prototype', count: 1 },
  //   { item: 'Mk 12 ArmaTek Data Pad Prototype', count: 1 },
  //   { item: 'Mk 12 ArmaTek Holo Lens Prototype', count: 1 },
  //   { item: 'Mk 12 ArmaTek Thermal Detonator Component', count: 1 },
  //   { item: 'Mk 12 ArmaTek Key Pad Component', count: 1 },
  //   { item: 'Mk 12 ArmaTek Data Pad Component', count: 1 },
  //   { item: 'Mk 12 ArmaTek Holo Lens Component', count: 1 },
  //   { item: 'Mk 5 A/KT Stun Gun Prototype Salvage', count: 40 },
  //   { item: 'Mk 5 Arakyd Droid Caller Salvage', count: 40 },
  //   { item: 'Mk 3 Czerka Stun Cuffs Salvage', count: 40 },
  //   { item: 'Mk 8 BioTech Implant Component', count: 40 },
  // ];


  round(value: number): number {
    return Math.round(value);
  }

  pack: PackItemDto[] = [];

  dataSource: MatTableDataSource<PackItemDto>;

  crystalCount: number = 15710;
  crystalCost: number = 99.99;

  displayedColumns = ['name', 'count', 'cost'];

  filteredGearNameList: Observable<Item[]>;

  constructor(private dataStoreService: DataStoreService, protected decimalPipe: DecimalPipe,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {

    this.dataStoreService.getGearData().pipe(takeUntil(this.unsubscribe$)).subscribe(gearData => {
      if (gearData != null) {
        this.gearData = gearData;
        this.gearNameList = this.gearData.map(gear => gear.name);

        this.itemList = [];
        this.gearCrystalCosts.forEach(gearCrystalCosts => {
          this.itemList.push({
            name: gearCrystalCosts.name,
            cost: gearCrystalCosts.crystals * (this.crystalCost / this.crystalCount) / gearCrystalCosts.count
          });
        })

        this.gearData.forEach(gearData => {
          if (this.itemList.find(item => item.name == gearData.name) == null) {
            this.itemList.push({
              name: gearData.name,
              cost: this.getPackItemValue(gearData.name, [gearData.name])
            });
          }
        });
      }
    });

    this.filteredGearNameList = this.addItemControl.valueChanges
      .pipe(
      startWith(''),
      map(value => this._filter(value))
      );
  }

  addPackItem(name: string) {
    let item = this.itemList.find(itemIndex => itemIndex.name == name);
    if (item != null) {
      this.pack.push({
        item: item,
        count: 1
      });
      this.dataSource = new MatTableDataSource(this.pack);
      this.cdr.detectChanges();
    }
    this.addItemControl.setValue('');
  }

  copyTable() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.packName + '(' + this.decimalPipe.transform(this.packCost, '.2-2') + ')\n';
    this.pack.forEach(packItem => {
      selBox.value = selBox.value + '(' + packItem.count + ')\t' + packItem.item.name + "\t$" + this.decimalPipe.transform(packItem.item.cost * packItem.count, '.2-2') + '\n';

      let gcc: GearCrystalCost = this.gearCrystalCosts.find(gIndex => gIndex.name == packItem.item.name);
      if (gcc != null && gcc.roughGuess !== null) {
        selBox.value = selBox.value + '--> Using estimate of ' + gcc.count + ' ' + gcc.name + ' valued at ' + gcc.crystals + ' crystals\n';
      }

    });
    selBox.value = selBox.value + 'Total Value: ' + this.decimalPipe.transform(this.getTotalCost(this.pack), '.2-2') + '\n';
    selBox.value = selBox.value + 'Extra Value: ' + this.round((this.getTotalCost(this.pack) / this.packCost - 1) * 100) + '%';

    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  private _filter(value: string): Item[] {
    const filterValue = value.toLowerCase();

    if (this.itemList != null) {
      return this.itemList.filter(option => option.name.toLowerCase().includes(filterValue));
    } else {
      return [];
    }
  }

  getPackItemValue(name: string, stack: string[]) {

    let gearCrystalCost = this.gearCrystalCosts.find(gcc => name == gcc.name);
    if (gearCrystalCost != null) {
      let crystals = gearCrystalCost.crystals;
      if (crystals === null) {
        gearCrystalCost.roughGuess;
      }
      let costPerItem = (crystals * (this.crystalCost / this.crystalCount)) / gearCrystalCost.count;
      return costPerItem * 1;
    } else {
      if (this.gearData == null) {
        return null;
      }
      console.log('unable to find: ' + name + ' trying to construct');
      let retVal = 0;
      let foundAllIngredients: boolean = true;
      let gearItem: Gear = this.gearData.find(gearDataItem => name == gearDataItem.name);
      if (gearItem != null) {
        gearItem.ingredients.forEach(ingredient => {

          let ingredientGearItem = this.gearData.find(gearDataItem => ingredient.gear == gearDataItem.base_id);
          if (ingredientGearItem != null && stack.indexOf(ingredientGearItem.name) == -1) {
            stack.push(ingredientGearItem.name);
            let ingredientCost = this.getPackItemValue(ingredientGearItem.name, stack);
            if (ingredientCost != null) {
              console.log('adding ingredient cost: ' + ingredientGearItem.name + ' total cost: ' + ingredientCost);
              if (ingredient.amount !== null) {
                retVal = retVal + (ingredientCost * ingredient.amount);
              }
            } else {
              return null;
            }
          } else {
            return null;
          }
        });
        return retVal;
      }
      return null;
    }
  }

  getTotalCost(packItems: PackItemDto[]): number {
    let retVal: number = 0;
    packItems.forEach(item => {
      retVal = retVal + item.item.cost * item.count;
    });
    return retVal;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

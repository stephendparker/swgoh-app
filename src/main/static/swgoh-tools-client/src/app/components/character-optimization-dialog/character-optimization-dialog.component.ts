import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectionList } from '@angular/material';
import { ModCalculatorCharacterResultsDto } from './../../model/optimization/mod-optimization';
import { SwgohGgCalc } from './../../calcs/swgoh-gg-calc';
import { SwgohGgConstants } from './../../calcs/swgoh-gg-constants';

class SlotPrimaryDto {
  id: number;
  commonLabel: string;
}

class SlotPrimaryFactorDto {
  label: string;
  factor: number;
}

class PrimaryFactorDto {
  id: number;
  primaries: SlotPrimaryFactorDto[] = [];
}

class SetDto {
  id: number;
  label: string;
  factor: number;
  fourSet: boolean = false;
}

class SecondaryDto {
  label: string;
  factor: number;
}

@Component({
  selector: 'app-character-optimization-dialog',
  templateUrl: './character-optimization-dialog.component.html',
  styleUrls: ['./character-optimization-dialog.component.scss']
})
export class CharacterOptimizationDialogComponent implements OnInit {

  SwgohGgCalc: typeof SwgohGgCalc = SwgohGgCalc;

  optimization: ModCalculatorCharacterResultsDto = null;

  slotPrimaries: SlotPrimaryDto[] = [];
  fourSets: SetDto[] = [];
  twoSets: SetDto[] = [];
  secondaries: SecondaryDto[] = [];
  slotPrimaryFactors: PrimaryFactorDto[] = [];

  fourSetsMultiplier: number;

  constructor(public dialogRef: MatDialogRef<CharacterOptimizationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != null) {
      this.optimization = data.optimization;
      this.fourSets = [];
      this.twoSets = [];
      this.secondaries = [];
      this.slotPrimaryFactors = [];

      this.fourSetsMultiplier = Math.round(this.optimization.fourSetsMultiplier * 100);

      this.secondaries = SwgohGgConstants.ALL_SECONDARIES.map(secondaryName => {
        return {
          label: secondaryName,
          factor: Math.round(this.optimization.secondaryTypeMultipliers[secondaryName] * 100)
        };
      })

      SwgohGgConstants.FOUR_SETS.forEach(setId => {
        if (this.optimization.fourSetMultipliers[setId] != null) {
          this.fourSets.push({
            id: setId,
            label: SwgohGgConstants.SET_LABEL_MAP[setId],
            factor: Math.round(this.optimization.fourSetMultipliers[setId] * 100),
            fourSet: true
          });
        }
      });

      SwgohGgConstants.TWO_SETS.forEach(setId => {
        if (this.optimization.fourSetMultipliers[setId] != null) {
          this.twoSets.push({
            id: setId,
            label: SwgohGgConstants.SET_LABEL_MAP[setId],
            factor: Math.round(this.optimization.fourSetMultipliers[setId] * 100),
            fourSet: false
          });
        }
      });
      this.secondaries.sort((a, b) => b.factor - a.factor);
      this.fourSets.sort((a, b) => b.factor - a.factor);
      this.twoSets.sort((a, b) => b.factor - a.factor);

      this.slotPrimaries = [];
      SwgohGgCalc.SLOTS_PRIMARY_CONFIGURABLE.forEach(slot => {

        let topPrimaryMultiplierId: number = null;
        let topPrimaryMultiplierNumber: number = null;

        let slotPrimaryFactor: PrimaryFactorDto = {
          id: slot.id,
          primaries: []

        };
        this.slotPrimaryFactors.push(slotPrimaryFactor);

        SwgohGgConstants.ALL_PRIMARIES.forEach(primaryId => {
          if (this.optimization.primaryMultipliers[slot.id] != null && this.optimization.primaryMultipliers[slot.id][primaryId] != undefined &&
            (topPrimaryMultiplierId == null || topPrimaryMultiplierNumber < this.optimization.primaryMultipliers[slot.id][primaryId])) {


            slotPrimaryFactor.primaries.push({
              label: SwgohGgConstants.PRIMARY_LABEL_MAP[primaryId],
              factor: Math.round(this.optimization.primaryMultipliers[slot.id][primaryId] * 100)
            });

            topPrimaryMultiplierId = primaryId;
            topPrimaryMultiplierNumber = this.optimization.primaryMultipliers[slot.id][primaryId];
          }
        });

        slotPrimaryFactor.primaries.sort((a, b) => b.factor - a.factor);

        this.slotPrimaries.push({
          id: slot.id,
          commonLabel: SwgohGgConstants.PRIMARY_LABEL_MAP[topPrimaryMultiplierId]
        });

      });
    }
  }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close(null);
  }

}

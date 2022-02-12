import { Injectable } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { SOLUTION_STATE_KEY } from '../solution';

@Injectable({
  providedIn: 'root',
})
export class ClientSolutionService {
  constructor(private _transferState: TransferState) {}

  public getSolution(): string {
    const solution = this._transferState.get(SOLUTION_STATE_KEY, null);
    if (solution === null) {
      throw new Error();
    }
    return solution;
  }
}

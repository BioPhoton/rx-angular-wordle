import { Injectable } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { SOLUTIONS, SolutionService, SOLUTION_STATE_KEY } from './solution';

@Injectable({
  providedIn: 'root',
})
export class ServerSolutionService implements SolutionService {
  constructor(private _transferState: TransferState) {}

  public getSolution(): string {
    // Taken from https://www.nytimes.com/games/wordle JS bundle:
    const start = new Date(2021, 5, 19, 0, 0, 0, 0);
    const today = new Date();
    const diff = today.setHours(0) - start.setHours(0);
    const n = Math.round(diff / 864e5);
    console.log(start, today, diff, n);
    const solution = SOLUTIONS[n % SOLUTIONS.length];
    this._transferState.set(SOLUTION_STATE_KEY, solution);
    return solution;
  }
}

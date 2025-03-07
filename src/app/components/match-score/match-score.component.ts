
import { Component, Input } from "@angular/core"

@Component({
  selector: "app-match-score",
  template: `
    <div class="flex items-center">
      <div class="w-16 h-16 rounded-full flex items-center justify-center"
           [ngClass]="{
             'bg-green-100 text-green-800': score >= 80,
             'bg-yellow-100 text-yellow-800': score >= 60 && score < 80,
             'bg-red-100 text-red-800': score < 60
           }">
        <span class="text-sm font-medium">{{ score }}%</span>
      </div>
      <span class="ml-2 text-sm font-medium text-gray-600">Match</span>
    </div>
  `,
})
export class MatchScoreComponent {
  @Input() score = 0
}


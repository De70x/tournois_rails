export interface PlayerPF {
  id: number;
  name: string;
  seedPoints?: number; // Points from pool phase for seeding
}

export interface MatchPF {
  id: number;
  phase: number; // Stage in the tournament tree
  index: number; // Index within the stage
  player1?: PlayerPF;
  player2?: PlayerPF;
  score1?: number;
  score2?: number;
  nextMatchId?: number;
}

export interface Bracket {
  id: number;
  name: string;
  matches: MatchPF[];
}
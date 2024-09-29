import type {Bracket, MatchPF, PlayerPF} from "~/types/PhasesFinales";

export const generateBracket = (players: PlayerPF[]): Bracket => {
  const totalPlayers = nextPowerOfTwo(players.length);
  const rounds = Math.log2(totalPlayers);
  const matches: MatchPF[] = [];

  // Seed players
  const seededPlayers = seedPlayers(players);

  // Generate initial round
  for (let i = 0; i < totalPlayers / 2; i++) {
    matches.push({
      id: i,
      phase: 0,
      index: i,
      player1: seededPlayers[i * 2] || { id: -1, name: 'BYE' },
      player2: seededPlayers[i * 2 + 1] || { id: -1, name: 'BYE' },
      nextMatchId: Math.floor(i / 2) + totalPlayers / 2 - 1
    });
  }

  // Generate subsequent rounds
  for (let round = 1; round < rounds; round++) {
    const matchesInRound = totalPlayers / Math.pow(2, round + 1);
    for (let i = 0; i < matchesInRound; i++) {
      matches.push({
        id: matches.length,
        phase: round,
        index: i,
        nextMatchId: round < rounds - 1 ? matches.length + Math.floor(i / 2) : undefined
      });
    }
  }

  return { id: Date.now(), name: 'New Bracket', matches };
};

const seedPlayers = (players: PlayerPF[]): PlayerPF[] => {
  return players
    .sort((a, b) => (b.seedPoints || 0) - (a.seedPoints || 0))
    .concat(Array(nextPowerOfTwo(players.length) - players.length).fill({ id: -1, name: 'BYE' }));
};

const nextPowerOfTwo = (n: number): number => Math.pow(2, Math.ceil(Math.log2(n)));
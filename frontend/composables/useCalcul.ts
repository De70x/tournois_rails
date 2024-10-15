import type {Joueur} from "~/types/Joueur";

export const useCalcul = () => {
    const getPuissanceDeDeux = (n:number) => {
        const reste = Math.log(n) / Math.log(2);
        if (reste % 1 === 0) {
            return reste;
        } else {
            const puissanceSuperieure = 1 << (32 - Math.clz32(n));
            return Math.log(puissanceSuperieure) / Math.log(2);
        }
    };

    const triParPoints = (j1: Joueur, j2: Joueur) => {
        return j2.points - j1.points;
    };

    return {
        getPuissanceDeDeux,
        triParPoints
    }
}
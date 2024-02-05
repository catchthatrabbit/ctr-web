export class UNITS {

    static ONE_K = 1_000 as const
    static ORE = 1 as const
    static WAV = UNITS.ONE_K * UNITS.ORE
    static GRAV = UNITS.ONE_K * UNITS.WAV
    static NUCLE = UNITS.ONE_K * UNITS.GRAV
    static ATOM = UNITS.ONE_K * UNITS.NUCLE
    static MOLI = UNITS.ONE_K * UNITS.ATOM
    static CORE = UNITS.ONE_K * UNITS.MOLI
}

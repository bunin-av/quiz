export const randomize = (arr: string[]) => {
    const makeRandom = (a: string, b: string) => Math.random() - 0.5
    return arr.sort(makeRandom)
}

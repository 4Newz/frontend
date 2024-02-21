export function idGenerator(idSize: number): string | string[] {
    return Math.floor(Math.random() * Math.pow(10, idSize)).toString();
}

export function idArrayGenerator(idSize: number, count: number) {
    return Array(count)
        .fill(null)
        .map(() => idGenerator(idSize).toString());
}

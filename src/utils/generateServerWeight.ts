
export function generateServerWeight(algorithm: string, serverPowerVariance: number) {
    if (algorithm === "Weighted Round Robin") {
        return 1 + Math.floor(Math.random() * serverPowerVariance)
    } else {
        return 1;
    }
}
async function fullTimestamp() {
    // example: 20261002164623705
    return new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 17)
}
async function timestamp() {
    // example: 164623705
    return new Date().toISOString().replace(/[^0-9]/g, "").slice(8, 17)
}

export { fullTimestamp, timestamp}

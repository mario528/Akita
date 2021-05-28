export const generateID = (rrecision = 6) => {
    return Math.floor(Math.pow(10, rrecision) * Math.random())
}
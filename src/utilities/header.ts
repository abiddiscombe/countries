// src/utilities/header.ts

export function newHeader (routeTitle: string) {
    return {
        ts: Math.floor(Date.now() / 1000),
        name: routeTitle
    }
}
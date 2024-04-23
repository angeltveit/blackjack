import { cardValues } from './values.js'

export async function load({ params }) {
    return { cards: Object.keys(cardValues) };
}
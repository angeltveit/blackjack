<script>
	import { onMount } from 'svelte';
  import { cardValues } from './values.js'

  export let data;
  let deck
  let cards = []
  let hand = []
  let dealer = []
  let canPlay = false
  let points = 0
  let result = ''

  console.log(data.cards)
  function shuffleDeck(original) {
    const deck = [ ...original ]
    const shuffledDeck = [];
    while (deck.length > 0) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      shuffledDeck.push(deck[randomIndex]);
      deck.splice(randomIndex, 1);
    }
    return shuffledDeck;
  }

  function reset() {
    canPlay = true
    dealer = []
    cards = shuffleDeck(deck)
    hand = []
    result = ''

    hitDealer()
    hitMe()
    hitMe()
  }

  function hitMe() {
    if(!canPlay) return
    if(hand.length === 5) return playDealer()
    hand = [...hand, cards.shift()]
    if(calculateHand(hand) > 21) {
      canPlay = false
      return announce()
    }
    if(calculateHand(hand) === 21) playDealer()
    console.log(hand)
  }

  function calculateHand(hand, isDealer = false) {
    let aceCount = 0
    let total = hand.reduce((total, card) => {
      if(card.includes('ace')) {
        aceCount++
        if(isDealer && (aceCount > 1 || (aceCount === 1 && total+11 > 21))) {
          total += 1
          return total
        }
      }

      total += cardValues[card]
      return total
    }, 0)

    if(!isDealer && (total > 21 && aceCount > 0)) {
      total -= 10 * aceCount
    }

    return total
  }

  function announce() {
    const dealerPoints = calculateHand(dealer, true)
    const playerPoints = calculateHand(hand)

    if(playerPoints > 21 && dealerPoints > 21) return result = 'draw'
    if(playerPoints > 21) return result = 'lost'
    if(dealerPoints > 21) return result = 'won'
    if(dealerPoints > playerPoints) return result = 'lost'
    if(dealerPoints === playerPoints) return result = 'draw'
    result = 'won'
  }

  function playDealer() {
    canPlay = false
    setTimeout(function run() {
      if(canPlay) return
      if(calculateHand(dealer, true) >= 17) return announce()
      if(calculateHand(dealer, true) === 21) return announce()

      hitDealer()

      if(dealer.length < 5) {
        setTimeout(run, 1000)
      } else {
        announce()
      }
    }, 1000)
  }

  function hitDealer() {
    if(canPlay && hand.length) return
    console.log('hit dealer')
    if(dealer.length === 5) return
    dealer = [...dealer, cards.shift()]
    console.log(dealer)
  }

  function stay() {
    canPlay = false
    playDealer()
  }

  onMount(() => {
    deck = data.cards
    reset()
  })
  
</script>

<style>
  @font-face {
    font-family: 'Slot';
    src: url('/slot.ttf') format('truetype');
  }
  .card {
    background-size: cover;
    height: 110px;
    width: 75px;
    z-index: 1;
  }
  .cards {
    min-height: 110px;
    width: 100%;
    max-width: 500px;
    padding: 1em;
    position: relative;
    background-image: url(/images/felt.png);
  
  }
  .cards.done {
    opacity: .1;
    transition-property: opacity;
    transition-duration: 250ms;
  }
  .player-name {
    text-align: center;
    margin-bottom: .5em;
    color: rgba(0,0,0,0.7);
    font-family: 'Slot';
    font-size: 1.5em;
  }
  .board {
    height: 100%;
    width: 100%;
    grid-row: 1 / span 2;
  }
  .frame {
    border: 2px dashed #86efac;
    flex: 1;
    min-height: 130px;
    display: flex;
    align-items: center;
    padding: 0 1em;
    position: relative;
  }
  .points {
    font-weight: bold;
    font-size: .7em;
    color: rgba(0,0,0,0.8);
  }
  .result {
    font-family: 'Slot';
    font-size: 0;
    background: linear-gradient(137deg, rgba(249,204,0,1) 25%, rgba(211,255,0,1) 73%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: fixed;
    top: 0%; 
    left: 0%;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    animation-name: anim;
    animation-duration: 1500ms;
    animation-fill-mode: forwards;
    pointer-events: none;
    z-index: 10;
  }

  button {
    color: #000;
  }

  .watermark {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .watermark img {
    height: 100px;
    opacity: .2;
    z-index: -1;
  }

  .result.lost {
    background: linear-gradient(137deg, rgba(212,0,249,1) 25%, rgba(255,0,0,1) 73%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .result.draw {
    background: linear-gradient(137deg, rgba(0,235,249,1) 3%, rgba(0,130,255,1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  @keyframes anim {
    from {
      font-size: 10vw;
    }
    to {
      font-size: 25vw;
    }
  }
</style>

{#if result === 'won'}
  <div class="result won">You won!</div>
{:else if result === 'lost'}
  <div class="result lost">You lost</div>
{:else if result === 'draw'}
  <div class="result draw">Draw</div>
{/if}

<div class="board flex flex-col mt-20 items-center p-5 gap-5">

  
  

  <div class="cards flex flex-col rounded bg-green-400 {result ? 'done' : ''}">
    <div class="player-data flex justify-between items-baseline">
      <div class="player-name">Dealer</div>
      <div class="points">
        POINTS:
        {#if calculateHand(dealer, true) === 21}
          BLACK JACK
        {:else if calculateHand(dealer, true) > 21}
          BUST
        {:else}
          {calculateHand(dealer, true)}
        {/if}
      </div>
    </div>
    <div class="frame rounded flex flex-wrap gap-2">
      <div class="watermark"><img src="/images/blackjack-logo.png" /></div>

      {#each dealer as card}
        <div class="card" style="background-image:url(/images/cards/{card})"></div>
      {/each}
      {#if dealer.length === 1}
        <div class="card" style="background-image:url(/images/card-back.png)"></div>
      {/if}
    </div>
  </div>
  <div class="cards rounded flex flex-col rounded bg-green-400 {result ? 'done' : ''}">

    <div class="player-data flex justify-between items-baseline">
      <div class="player-name">You</div>
      <div class="points">
        POINTS:
        {#if calculateHand(hand) === 21}
          BLACK JACK
        {:else if calculateHand(hand) > 21}
          BUST
        {:else}
          {calculateHand(hand)}
        {/if}
      </div>
    </div>
    
    
    <div class="frame rounded flex flex-wrap gap-2">
      <div class="watermark"><img src="/images/blackjack-logo.png" /></div>

      {#each hand as card}
        <div class="card" style="background-image:url(/images/cards/{card})"></div>
      {/each}
    </div>
  </div>
  <div class="flex gap-2">
    {#if canPlay}
      <button on:click={() => hitMe()} class="pl-2 pr-2 pt-1 pb-1 rounded bg-sky-500">Hit me!</button>
      <button on:click={() => stay()} class="pl-2 pr-2 pt-1 pb-1 rounded bg-purple-400">Stay</button>
    {:else}
      <button on:click={() => reset()} class="pl-2 pr-2 pt-1 pb-1 rounded bg-amber-400">Reset</button>
    {/if}
  </div>
</div>

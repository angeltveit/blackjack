<style>
    @font-face {
    font-family: 'play';
    src: url('/play.otf') format('opentype');
  }
  h1 {
    font-family: 'play';
    font-size: 4em;
    background: linear-gradient( 111.4deg,  rgba(238,113,113,1) 1%, rgba(246,215,148,1) 58% );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    width: fit-content;
    margin: 0 auto;
    border: 4px solid rgba(238,113,113,1);
    height: fit-content;
    padding-right: 1em;
    padding-left: 1em;
    border-radius: .5em;
    animation-name: pulse;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;

  }
  @keyframes pulse {
    from {
      transform: scale(1);
    }
    50% {
      transform: scale(0.9);
    }
    
  }
</style>
<h1 class=""><a href="/play">Play now</a></h1>

<script>
  import "../app.css";
  import { page } from '$app/stores';  
  console.log($page.url.pathname)
</script>
<style>
  @font-face {
    font-family: 'Casino';
    src: url('/Casino.ttf') format('truetype');
  }

  .view-port {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  .casino {
    font-family: Casino;
    font-size: 6em;
    text-align: center;
    background: linear-gradient( 65.9deg,  rgba(85,228,224,1) 5.5%, rgba(75,68,224,0.74) 54.2%, rgba(64,198,238,1) 55.2%, rgba(177,36,224,1) 98.4% );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition-property: font-size;
    transition-duration: 250ms;
  }
  .casino.small {
    font-size: 3em;
  }
</style>

<div class="view-port">
  <div class="top">
    <h1 class="casino" class:small={$page.url.pathname==='/play'}>Black Jack</h1>
  </div>
  <slot />
</div>

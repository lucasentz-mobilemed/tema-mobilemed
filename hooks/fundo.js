// Fundo animado da Mobilemed, desenhado atrás da conversa.
// Escuro: preto com dois brilhos no mesmo ciano da marca (alto à direita e embaixo
// à esquerda), uma trama de pontos e anéis finos no canto, com uma varredura girando
// devagar, e o logo branco no meio como marca d'água bem apagada.
// Claro: a mesma cena sobre o azul-gelo #eaf4f8, com o logo escurecido e apagado.
// Quem pede menos movimento no sistema recebe a cena parada.
import { LOGO_ALTURA, LOGO_CAMINHO, LOGO_LARGURA } from './logo.js'

// Marca d'água: 560 de largura no centro da cena (800, 500).
const MARCA_LARGURA = 560
const MARCA_ESCALA = MARCA_LARGURA / LOGO_LARGURA
const MARCA_X = 800 - MARCA_LARGURA / 2
const MARCA_Y = 500 - (LOGO_ALTURA * MARCA_ESCALA) / 2

export const FUNDO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
<defs>
  <radialGradient id="brilhoCiano">
    <stop offset="0" stop-color="#00bbfe" stop-opacity=".55"/>
    <stop offset=".45" stop-color="#00a6f4" stop-opacity=".18"/>
    <stop offset="1" stop-color="#0077e7" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="linhaMarca" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#00bbfe"/>
    <stop offset="1" stop-color="#0077e7"/>
  </linearGradient>
  <pattern id="pontos" width="28" height="28" patternUnits="userSpaceOnUse">
    <circle class="ponto" cx="2" cy="2" r="1.3"/>
  </pattern>
  <radialGradient id="somePontos" cx="1450" cy="130" r="560" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#fff"/>
    <stop offset="1" stop-color="#fff" stop-opacity="0"/>
  </radialGradient>
  <mask id="mascaraPontos">
    <rect x="-200" y="-200" width="2000" height="1400" fill="url(#somePontos)"/>
  </mask>
</defs>
<style>
  .base { fill: #000000; }
  .brilhos { animation: respira 11s ease-in-out infinite alternate; }
  .ciano { animation: flutuaCiano 34s ease-in-out infinite alternate; }
  .azul { animation: flutuaAzul 42s ease-in-out infinite alternate; }
  .ponto { fill: #00bbfe; opacity: .22; }
  .aneis { fill: none; stroke: url(#linhaMarca); opacity: .5; }
  .marca { opacity: .2; fill: #ffffff; }
  .gira, .marca { transform-box: fill-box; transform-origin: center; }
  .lento { animation: gira 160s linear infinite reverse; }
  .varredura { animation: gira 26s linear infinite; }
  @keyframes respira { from { opacity: .82; } to { opacity: 1; } }
  @keyframes flutuaCiano { from { transform: translate(0, 0); } to { transform: translate(-90px, 60px); } }
  @keyframes flutuaAzul { from { transform: translate(0, 0); } to { transform: translate(110px, -50px); } }
  @keyframes gira { to { transform: rotate(360deg); } }
  @media (prefers-color-scheme: light) {
    .base { fill: #eaf4f8; }
    .brilhos { animation-name: respiraClaro; }
    .ponto { fill: #0077e7; opacity: .16; }
    .aneis { opacity: .4; }
    .marca { opacity: .1; fill: #0b1a20; }
    @keyframes respiraClaro { from { opacity: .4; } to { opacity: .55; } }
  }
  @media (max-aspect-ratio: 4/5) {
    .canto { transform: translate(-480px, 0); }
    .posCiano { transform: translate(-420px, 0); }
    .posAzul { transform: translate(380px, 0); }
    .marca { transform: scale(.6); }
  }
  @media (prefers-reduced-motion: reduce) {
    .brilhos, .ciano, .azul, .lento, .varredura { animation: none; }
  }
</style>
<rect class="base" x="-200" y="-200" width="2000" height="1400"/>
<g class="brilhos">
  <g class="posCiano"><ellipse class="ciano" cx="1380" cy="140" rx="760" ry="620" fill="url(#brilhoCiano)"/></g>
  <g class="posAzul"><ellipse class="azul" cx="300" cy="1000" rx="820" ry="640" fill="url(#brilhoCiano)"/></g>
</g>
<g class="marca"><path fill-rule="evenodd" transform="translate(${MARCA_X} ${MARCA_Y.toFixed(2)}) scale(${MARCA_ESCALA.toFixed(5)})" d="${LOGO_CAMINHO}"/></g>
<g class="canto">
  <rect x="-200" y="-200" width="2000" height="1400" fill="url(#pontos)" mask="url(#mascaraPontos)"/>
  <g class="aneis">
    <circle cx="1450" cy="130" r="260" stroke-width="1"/>
    <circle class="gira lento" cx="1450" cy="130" r="380" stroke-width="1" stroke-dasharray="2 10"/>
    <circle cx="1450" cy="130" r="500" stroke-width="1" opacity=".45"/>
    <circle class="gira varredura" cx="1450" cy="130" r="380" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="300 2088"/>
  </g>
</g>
</svg>`

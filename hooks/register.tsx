import type { Register, ThemeSetArgs } from 'claude-code'

import { FUNDO_SVG } from './fundo.js'
import { makeColors } from './make-colors.js'

// Tema Mobilemed.
// Escuro (padrão da marca): página preta, cards #0a242e, painéis e menus no cinza
// #232529 do guia, links no ciano #00bfff. O app não aceita painéis mais escuros que
// os cards, por isso o #0d0d0d do guia não entra.
// Claro: o app exige que a página seja a superfície mais escura e os cards mais
// claros que ela, então a página usa o azul-gelo #eaf4f8 e os cards ficam quase
// brancos (no guia da marca é o contrário: página branca e cards #eaf4f8).
//
// O botão principal (enviar, aprovar) usa #006fd6, e #0077e7 no hover: é o fim do
// degradê da marca, um pouco mais fundo para o texto branco ter contraste.
// O degradê de verdade fica no fundo animado (fundo.js).
// Fonte não entra: o tema do app só aceita cores e fundo.
const BOTAO = { 400: '#0077e7', 450: '#006fd6' }
// Balão da mensagem do usuário no estilo do botão "Saiba mais" do site: borda ciano
// sólida e fundo de ciano escurecido (#00bbfe a 18%: no escuro vira perto de #00222e,
// no claro um ciano bem claro, e o texto fica legível nos dois).
const BALAO_BORDA = '#00bbfe'
const BALAO_FUNDO = '#00bbfe2e'
// O nome da cena leva uma impressão digital do desenho: cada versão nova do fundo
// ganha outro nome, e o app redesenha em vez de reaproveitar a versão antiga.
function impressao(texto: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0).toString(36)
}
const CENA = `mobilemed-${impressao(FUNDO_SVG)}`

const { theme, problems } = makeColors({
  label: 'Mobilemed',
  id: 'mobilemed',
  roles: {
    // 300 é o tom dos links no modo escuro.
    accent: { seed: '#00bbfe', stops: { ...BOTAO, 300: '#00bfff' }, fillShade: 450 },
    danger: '#f26161',
    success: '#3ecf8e',
    warning: '#f5a524',
    pro: '#2b95ff',
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#000000', // fundo da página
        'surface-1': '#0a242e', // cards
        'surface-2': '#232529', // painéis
        'surface-3': '#232529', // menus e campos
        'text-primary': '#ffffff',
        'text-secondary': '#bcbcbc',
        'text-muted': '#9d9d9d',
      },
    },
  },
  light: {
    roles: {
      // 600 é o tom dos links no modo claro.
      accent: { seed: '#0077e7', stops: { ...BOTAO, 600: '#0068c9' }, fillShade: 450 },
      danger: '#c8281e',
      warning: '#a15c00',
      pro: '#1a62c0',
    },
    gray: {
      anchors: {
        'surface-0': '#eaf4f8', // fundo da página
        'surface-1': '#f5fafc', // cards
        'surface-2': '#ffffff', // painéis e menus
        'text-primary': '#0b1a20',
        'text-secondary': '#34434a',
        'text-muted': '#4f5d64',
      },
    },
  },
})

// O app põe um vidro fosco atrás da coluna da conversa; com o desfoque padrão o logo
// do meio vira borrão. blur 0 deixa o fundo nítido ali; cor e transparência do vidro
// continuam as do app.
const TEMA: ThemeSetArgs = { colors: theme, backdrop: { scene: CENA, glass: { blur: 0 } } }

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    // Se o app recusar pintar a paleta, avisa em vez de falhar calado.
    const recusa = problems.find(line => line.startsWith("Desktop won't paint"))

    if (recusa !== undefined) {
      $.ui.toast(`Tema Mobilemed: ${recusa}`)
    }
    const set = await $.theme.set(TEMA)

    if (!set.isDrawn) {
      $.ui.status(`Tema Mobilemed: ${set.reason}`)
    }

    return next(e)
  })

  // Desenha o fundo animado no app de desktop e no celular.
  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.props.plugin !== 'tema-mobilemed' || e.props.scene !== CENA) {
      return next(e)
    }
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }

    const { Svg } = $.ui.resolve(e)

    return (
      <Svg
        source={FUNDO_SVG}
        alt="Fundo preto com brilhos no azul da Mobilemed e anéis finos girando devagar no canto"
        isInteractive
      />
    )
  })

  // Balão das mensagens que você escreve, no estilo do botão do site: borda ciano e
  // fundo escuro. O app não tem cor própria para o balão no tema, então o balão é
  // desenhado aqui, só com o texto. Mensagem que o tema viu sair com imagem fica com o
  // balão original do app, para a imagem não sumir.
  // No app de desktop as mensagens chegam como 'sdk', não 'composer', e as enviadas
  // no meio de um turno ("Enviar agora") podem chegar sem classificação. Mensagens de
  // outras sessões também vêm sem classificação, mas trazem remetente (`from`).
  const SUAS = new Set(['composer', 'sdk', 'bridge', 'unclassified'])
  const comAnexo = new Set<string>()
  const chave = (texto: string) => texto.trim()

  on('prompt.submit', ($, e, next) => {
    if ((e.attachments?.length ?? 0) > 0) {
      comAnexo.add(chave(e.text))
    }

    return next(e)
  })

  on('ui.render', { component: 'UserMessage' }, ($, e, next) => {
    const { origin, task, from, text } = e.props
    const k = chave(text)

    if (e.surface !== 'desktop' || !SUAS.has(origin.kind) || task || from || k === '' || comAnexo.has(k)) {
      return next(e)
    }

    const { Box, Markdown } = $.ui.resolve(e)

    return (
      <Box flexDirection="row" justifyContent="flex-end">
        <Box
          borderStyle="round"
          borderColor={BALAO_BORDA}
          backgroundColor={BALAO_FUNDO}
          paddingX="lg"
          paddingY="md"
        >
          <Markdown text={text} />
        </Box>
      </Box>
    )
  })
}

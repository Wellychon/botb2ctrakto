import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, MessageCircle, X } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SYSTEM_INSTRUCTIONS = `Você é um Atendente Virtual oficial da Trakto para suporte B2C.
Seu foco é resolver demandas rapidamente, com explicações simples, e sempre incentivar o autoatendimento através do YouTube oficial da Trakto e links diretos da plataforma.

IMPORTANTE: Sempre formate suas respostas usando Markdown para melhor legibilidade. Use:
- **negrito** para destacar informações importantes
- Links formatados como [texto](url)
- Listas numeradas ou com bullets quando apropriado
- Quebras de linha para organizar o conteúdo

Você atende apenas suporte, não faz vendas, não promete coisas que não existem, não coleta dados sensíveis.

FLUXO PADRÃO:
1. Identifique a intenção do usuário entre: Cancelamento de assinatura, Criar um eBook, Prefere suporte por e-mail
2. Responda de forma objetiva usando Markdown
3. Sempre finalize perguntando: "Posso te ajudar com mais alguma coisa?"

INTENÇÃO 1 — Cancelamento de Assinatura
Para cancelar sua assinatura:
- O acesso permanece ativo até o fim do período já pago
- Se não conseguir pelo sistema, você pode falar com o suporte por e-mail: **contato@trakto.io**

INTENÇÃO 2 — Como Criar um eBook
Para criar seu eBook na Trakto:
1. Faça login
2. Clique em Criar design
3. Escolha um formato de eBook
4. Selecione um template
5. Edite textos e imagens
6. Baixe em PDF

**Modelos prontos:**
- [Ebook A4 vertical](https://dashboard.trakto.io/app/format/undefined/q3oBBFJrQ0hAncA9xXR1)
- [Ebook horizontal](https://dashboard.trakto.io/app/format/undefined/ycvLv3VvfMp2R1WGpxuB)

**Tutorial oficial no YouTube:**
📺 [Como criar eBooks na Trakto](https://youtu.be/axeDkt4Ijlg)

Link de Cadastro:
https://dashboard.trakto.io/

INTENÇÃO 3 — Prefiro atendimento por E-MAIL
Sem problemas.

Envie sua solicitação para: **contato@trakto.io**

Inclua:
- E-mail da conta
- Descrição do problema
- Prints ou vídeos

Prazo médio de resposta: **até 24h úteis**

FALLBACK — CLIENTE CONFUSO
"Você pode me dizer melhor o que você precisa? Posso ajudar com: **Cancelamento de assinatura**, **Criação de eBook**, **Atendimento por e-mail**"

REGRAS ABSOLUTAS:
✅ Sempre usar Markdown para formatar respostas
✅ Linguagem simples
✅ Respostas curtas e diretas
✅ Sempre indicar YouTube quando existir tutorial
✅ Sempre enviar links diretos quando possível
✅ Nunca pedir dados pessoais ou de pagamento
✅ Nunca tentar vender planos
✅ Nunca florear respostas

TOM: Seguro, profissional e objetivo.
Exemplos: "É bem simples, faço o passo a passo pra você.", "Se preferir, tem o tutorial em vídeo.", "Esse link já te leva direto pro modelo pronto."`

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '👋 Olá! Sou o assistente virtual da Trakto. Como posso te ajudar hoje?' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const API_KEY = import.meta.env.VITE_API_KEY
  const MODEL = import.meta.env.VITE_MODEL
  const API_URL = import.meta.env.VITE_API_URL

  const handleSend = async () => {
    if (!input.trim() || isTyping) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Bot Trakto'
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: SYSTEM_INSTRUCTIONS },
            ...messages,
            userMessage
          ]
        })
      })

      const data = await response.json()
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content
      }
      
      setTimeout(() => {
        setMessages(prev => [...prev, assistantMessage])
        setIsTyping(false)
      }, 800)
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.'
        }])
        setIsTyping(false)
      }, 800)
    }
  }

  return (
    <div>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-black text-white rounded-full shadow-2xl hover:bg-gray-800 transition-colors z-50 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Fechar chat' : 'Abrir chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-[380px] h-[520px] rounded-2xl overflow-hidden p-[2px] z-40"
          >
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-black/20"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative flex flex-col w-full h-full rounded-xl border border-black/10 overflow-hidden bg-white backdrop-blur-xl shadow-2xl">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50"
                animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              />

              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-black/5"
                  animate={{
                    y: ["0%", "-120%"],
                    x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                  style={{ left: `${Math.random() * 100}%`, bottom: "-10%" }}
                />
              ))}

              <div className="px-4 py-3 border-b border-black/10 relative z-10 bg-white/80 backdrop-blur-sm">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-black">Trakto Bot</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-black/60 hover:text-black transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 text-sm flex flex-col relative z-10">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={cn(
                      "flex",
                      msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "px-3 py-2 rounded-xl max-w-[85%] shadow-sm",
                        msg.role === "user"
                          ? "bg-black text-white"
                          : "bg-white/80 backdrop-blur-sm text-black border border-black/10"
                      )}
                    >
                      {msg.role === 'assistant' ? (
                        <ReactMarkdown
                          components={{
                            p: ({children}) => <p className="mb-1 last:mb-0 text-sm leading-relaxed">{children}</p>,
                            a: ({children, href}) => <a href={href} target="_blank" rel="noopener noreferrer" className="underline font-semibold">{children}</a>,
                            ul: ({children}) => <ul className="list-disc list-inside mb-1 text-sm space-y-0.5">{children}</ul>,
                            ol: ({children}) => <ol className="list-decimal list-inside mb-1 text-sm space-y-0.5">{children}</ol>,
                            strong: ({children}) => <strong className="font-bold">{children}</strong>,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      ) : (
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl max-w-[30%] bg-white/80 backdrop-blur-sm border border-black/10 self-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span
                      className="w-2 h-2 rounded-full bg-black"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
                    />
                    <motion.span
                      className="w-2 h-2 rounded-full bg-black"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                    />
                    <motion.span
                      className="w-2 h-2 rounded-full bg-black"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
                    />
                  </motion.div>
                )}
              </div>

              <div className="flex items-center gap-2 p-3 border-t border-black/10 relative z-10 bg-white/80 backdrop-blur-sm">
                <input
                  className="flex-1 px-3 py-2 text-sm bg-white rounded-lg border border-black/20 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black/30"
                  placeholder="Digite sua mensagem..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  disabled={isTyping}
                />
                <motion.button
                  onClick={handleSend}
                  disabled={isTyping || !input.trim()}
                  className="p-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App

import { useEffect, useRef, useState } from "react"

// Collection of Japanese characters
const japaneseChars = [
  "ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ",
  "サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト",
  "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ",
  "マ", "ミ", "ム", "メ", "モ", "ヤ", "ユ", "ヨ", "ラ", "リ",
  "ル", "レ", "ロ", "ワ", "ヲ", "ン", "あ", "い", "う", "え",
  "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ",
  "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね",
  "の", "は", "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め",
  "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ",
  "を", "ん", "日", "月", "火", "水", "木", "金", "土", "山",
  "川", "海", "空", "雨", "雪", "風", "雲", "星", "光", "影"
]

interface Drop {
  x: number
  y: number
  speed: number
  characters: string[]
  currentCharIndex: number
  updateFrequency: number
  lastUpdate: number
}

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const dropsRef = useRef<Drop[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const width = window.innerWidth
        const height = window.innerHeight

        canvas.width = width
        canvas.height = height
        setDimensions({ width, height })

        initializeDrops(width, height)
      }
    }

    const initializeDrops = (width: number, height: number) => {
      const drops: Drop[] = []
      const dropCount = Math.floor(width / 25)

      for (let i = 0; i < dropCount; i++) {
        drops.push(createDrop(width, height))
      }

      dropsRef.current = drops
    }

    const createDrop = (width: number, height: number): Drop => {
      const charCount = Math.floor(Math.random() * 15) + 5
      const characters: string[] = []

      for (let i = 0; i < charCount; i++) {
        const randomIndex = Math.floor(Math.random() * japaneseChars.length)
        characters.push(japaneseChars[randomIndex])
      }

      return {
        x: Math.random() * width,
        y: Math.random() * -height,
        speed: Math.random() * 0.8 + 0.3,
        characters,
        currentCharIndex: 0,
        updateFrequency: Math.floor(Math.random() * 10) + 5,
        lastUpdate: 0,
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)

      dropsRef.current.forEach((drop, index) => {
        const dx = mousePos.x - drop.x
        const dy = mousePos.y - drop.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const influenceRadius = 180

        drop.characters.forEach((char, charIndex) => {
          const y = drop.y - charIndex * 24

          if (y < dimensions.height && y > 0) {
            if (distance < influenceRadius) {
              const intensity = 1 - distance / influenceRadius
              const r = Math.floor(120 * intensity)
              const g = Math.floor(220 * intensity)
              const b = Math.floor(255 * intensity)
              ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
            } else {
              const opacity = charIndex === 0 ? 1 : 1 - charIndex / drop.characters.length
              ctx.fillStyle = `rgba(180, 180, 180, ${opacity})`
            }

            ctx.font = '18px "Hiragino Sans", "MS Gothic", monospace'
            ctx.fillText(char, drop.x, y)
          }
        })

        drop.y += drop.speed
        drop.lastUpdate++

        if (drop.lastUpdate > drop.updateFrequency) {
          drop.lastUpdate = 0
          const randomIndex = Math.floor(Math.random() * japaneseChars.length)
          drop.characters[0] = japaneseChars[randomIndex]
        }

        if (drop.y - drop.characters.length * 24 > dimensions.height) {
          dropsRef.current[index] = createDrop(dimensions.width, dimensions.height)
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    const createDrop = (width: number, height: number): Drop => {
      const charCount = Math.floor(Math.random() * 15) + 5
      const characters: string[] = []

      for (let i = 0; i < charCount; i++) {
        const randomIndex = Math.floor(Math.random() * japaneseChars.length)
        characters.push(japaneseChars[randomIndex])
      }

      return {
        x: Math.random() * width,
        y: -100,
        speed: Math.random() * 0.8 + 0.3,
        characters,
        currentCharIndex: 0,
        updateFrequency: Math.floor(Math.random() * 10) + 5,
        lastUpdate: 0,
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [dimensions, mousePos])

  return <canvas ref={canvasRef} className="w-full h-full block" aria-label="Japanese character rain animation" />
}

export default function Home() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 z-0">
        <MatrixRain />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <div className="max-w-4xl px-8 text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            7on AI
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            The personal AI agent
          </p>
          
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
              Start Call
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-green-500 hover:bg-green-500/10 text-green-500 font-semibold rounded-full transition-all duration-300">
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

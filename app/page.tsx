import { useEffect, useRef } from "react"

// Japanese characters collection
const japaneseChars = [
  "ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ",
  "サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト",
  "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ",
  "マ", "ミ", "ム", "メ", "モ", "ヤ", "ユ", "ヨ", "ラ", "リ",
  "ル", "レ", "ロ", "ワ", "ヲ", "ン", "0", "1", "2", "3", "4", 
  "5", "6", "7", "8", "9"
]

interface Drop {
  x: number
  y: number
  speed: number
  chars: string[]
  opacity: number[]
}

function MatrixRainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dropsRef = useRef<Drop[]>([])
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initDrops()
    }

    const initDrops = () => {
      const drops: Drop[] = []
      const columns = Math.floor(canvas.width / 20)
      
      for (let i = 0; i < columns; i++) {
        const charCount = Math.floor(Math.random() * 20) + 10
        const chars: string[] = []
        const opacity: number[] = []
        
        for (let j = 0; j < charCount; j++) {
          chars.push(japaneseChars[Math.floor(Math.random() * japaneseChars.length)])
          opacity.push(1 - (j / charCount))
        }
        
        drops.push({
          x: i * 20,
          y: Math.random() * -canvas.height,
          speed: Math.random() * 2 + 1,
          chars,
          opacity
        })
      }
      
      dropsRef.current = drops
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      dropsRef.current.forEach((drop, i) => {
        const { x, y, chars, opacity } = drop
        
        // Draw each character in the drop
        chars.forEach((char, j) => {
          const charY = y - j * 20
          
          if (charY > 0 && charY < canvas.height) {
            // Calculate distance from mouse
            const dx = mouseRef.current.x - x
            const dy = mouseRef.current.y - charY
            const distance = Math.sqrt(dx * dx + dy * dy)
            const maxDistance = 150
            
            // Set color based on mouse proximity
            if (distance < maxDistance) {
              const intensity = 1 - (distance / maxDistance)
              ctx.fillStyle = `rgba(0, 255, 150, ${opacity[j] * intensity})`
            } else {
              ctx.fillStyle = `rgba(0, 255, 70, ${opacity[j]})`
            }
            
            ctx.font = j === 0 ? "bold 16px monospace" : "16px monospace"
            ctx.fillText(char, x, charY)
          }
        })
        
        // Update position
        drop.y += drop.speed
        
        // Reset if off screen
        if (drop.y - chars.length * 20 > canvas.height) {
          drop.y = Math.random() * -200
          drop.speed = Math.random() * 2 + 1
        }
        
        // Randomly change characters
        if (Math.random() > 0.98) {
          drop.chars[0] = japaneseChars[Math.floor(Math.random() * japaneseChars.length)]
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)
    resize()
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
      style={{ display: 'block' }}
    />
  )
}

// Demo component to show the full page
export default function MatrixRainDemo() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRainCanvas />
      
      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full pointer-events-none">
        <div className="text-center px-8 max-w-4xl pointer-events-auto">
          <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
            7on AI
          </h1>
          <p className="text-xl text-green-400/90 mb-8 font-light">
            The personal AI agent
          </p>
          <div className="flex gap-4 justify-center items-center">
            <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/50">
              Start Call
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-green-500 hover:bg-green-500/10 text-green-400 font-semibold rounded-full transition-all duration-300">
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

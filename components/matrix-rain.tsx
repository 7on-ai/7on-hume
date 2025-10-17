"use client";

import { useEffect, useRef } from "react"

const japaneseChars = [
  "ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ",
  "サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト",
  "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
]

interface Drop {
  x: number
  y: number
  speed: number
  chars: string[]
  opacity: number[]
}

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dropsRef = useRef<Drop[]>([])
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

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
          x: i * 20 + 10,
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

      dropsRef.current.forEach((drop) => {
        const { x, y, chars, opacity } = drop
        
        chars.forEach((char, j) => {
          const charY = y - j * 20
          
          if (charY > 0 && charY < canvas.height + 20) {
            const dx = mouseRef.current.x - x
            const dy = mouseRef.current.y - charY
            const distance = Math.sqrt(dx * dx + dy * dy)
            const maxDistance = 150
            
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
        
        drop.y += drop.speed
        
        if (drop.y - chars.length * 20 > canvas.height) {
          drop.y = Math.random() * -200
          drop.speed = Math.random() * 2 + 1
        }
        
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
      className="block w-full h-full"
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: 0
      }}
    />
  )
}

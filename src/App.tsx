import { useState, useRef, useEffect } from "react"
import "./App.css"
import bk1 from "./assets/bk1.png"
import bk2 from "./assets/bk2.png"
import bk3 from "./assets/bk3.png"
import bk4 from "./assets/bk4.png"
import bk5 from "./assets/bk5.png"



export default function App() {
  const [bgIndex, setBgIndex] = useState(0)
  const [bgImage, setBgImage] = useState(bk1) // imagen inicial
  
  const noBtnRef = useRef(null)
  const movableAreaRef = useRef(null)
  const [showNo, setShowNo] = useState(true)

  const bgCycle = [bk2, bk3,bk4] // tus 3 imágenes
  const bgYes = bk5 // imagen cuando el mouse está en "Sí"

  // Detectar movimiento del mouse
const handleMouseMove = (e) => {
  const btn = noBtnRef.current
  if (!btn) return

  const rect = btn.getBoundingClientRect()
  const mouseX = e.clientX
  const mouseY = e.clientY

  const btnX = rect.left + rect.width / 2
  const btnY = rect.top + rect.height / 2

  const distance = Math.hypot(mouseX - btnX, mouseY - btnY)

  if (distance < 40) {

    // 👉 Cambiar a absolute SOLO cuando empiece a huir
    if (btn.style.position !== "absolute") {
      btn.style.position = "absolute"
    }

    // 👉 Calcular límites del viewport
    const maxX = window.innerWidth - rect.width
    const maxY = window.innerHeight - rect.height

    let newX = Math.random() * maxX
    let newY = Math.random() * maxY

    newX = Math.max(0, Math.min(newX, maxX))
    newY = Math.max(0, Math.min(newY, maxY))

    btn.style.left = `${newX}px`
    btn.style.top = `${newY}px`

    // 👉 Cambiar background en ciclo
    setBgIndex((prev) => {
      const next = (prev + 1) % bgCycle.length
      setBgImage(bgCycle[next])
      return next
    })
  }
}



  const handleYesHover = () => {
    setBgImage(bgYes)
  }

  const handleYesLeave = () => {
    setBgImage(bgCycle[bgIndex])
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

return (
  <div className="hero" style={{ backgroundImage: `url(${bgImage})` }}>
    <div className="buttons">
      <button
        className="yes"
        onMouseEnter={handleYesHover}
        onMouseLeave={handleYesLeave}
        onClick={() => setShowNo(false)}
      >
        Sí
      </button>

      {showNo && (
        <button className="no" ref={noBtnRef}>No</button>
      )}
    </div>

    <div className="movable-area" ref={movableAreaRef}></div>
  </div>
)


}

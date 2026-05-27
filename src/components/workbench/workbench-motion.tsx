"use client"

import { useRef, type ReactNode } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function WorkbenchMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduceMotion) return

      const sections = gsap.utils.toArray<HTMLElement>("[data-workbench-reveal]")
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 18, scale: 0.985 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.72,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              once: true,
            },
          },
        )
      })

      const words = gsap.utils.toArray<HTMLElement>("[data-workbench-word]")
      if (words.length) {
        gsap.fromTo(
          words,
          { opacity: 0.28 },
          {
            opacity: 1,
            stagger: 0.035,
            ease: "none",
            scrollTrigger: {
              trigger: words[0]?.parentElement,
              start: "top 80%",
              end: "bottom 42%",
              scrub: true,
            },
          },
        )
      }
    },
    { scope },
  )

  return <div ref={scope}>{children}</div>
}

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function setupGlobe(canvas: HTMLCanvasElement, opts: { cx?: number; cy?: number; scale?: number; offices?: boolean } = {}) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => undefined

  const reduceMotion = prefersReducedMotion()
  let w = 0
  let h = 0
  let dpr = 1
  let t = 0
  let raf = 0
  const cities = (opts.offices ? [[30.0619, -1.9441], [3.3792, 6.5244], [55.2708, 25.2048]] : [
    [-0.12, 51.5], [31.24, 30.0], [55.27, 25.2], [77.2, 28.6], [103.8, 1.35],
    [116.4, 39.9], [139.7, 35.7], [-74.0, 40.7], [-122.4, 37.8], [-46.6, -23.5],
    [18.4, -33.9], [151.2, -33.9], [28.0, -26.2],
  ]).map(([lon, lat]) => ({ lon: lon * Math.PI / 180, lat: lat * Math.PI / 180 }))

  const resize = () => {
    const r = canvas.getBoundingClientRect()
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    w = r.width
    h = r.height
    canvas.width = Math.max(1, Math.round(w * dpr))
    canvas.height = Math.max(1, Math.round(h * dpr))
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  const project = (lon: number, lat: number, rot: number, cx: number, cy: number, R: number) => {
    const L = lon + rot
    const cosLat = Math.cos(lat)
    const x = cosLat * Math.sin(L)
    const y = Math.sin(lat)
    const z = cosLat * Math.cos(L)
    return { x: cx + x * R, y: cy - y * R, z }
  }

  const lineSphere = (rot: number, cx: number, cy: number, R: number) => {
    ctx.lineWidth = 0.75
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath()
      let started = false
      for (let lon = -180; lon <= 180; lon += 4) {
        const p = project(lon * Math.PI / 180, lat * Math.PI / 180, rot, cx, cy, R)
        if (p.z > -0.1) {
          if (!started) {
            ctx.moveTo(p.x, p.y)
            started = true
          } else ctx.lineTo(p.x, p.y)
        }
      }
      ctx.strokeStyle = 'rgba(154,207,242,.15)'
      ctx.stroke()
    }
    for (let lon = -150; lon <= 180; lon += 30) {
      ctx.beginPath()
      let started = false
      for (let lat = -90; lat <= 90; lat += 3) {
        const p = project(lon * Math.PI / 180, lat * Math.PI / 180, rot, cx, cy, R)
        if (p.z > -0.1) {
          if (!started) {
            ctx.moveTo(p.x, p.y)
            started = true
          } else ctx.lineTo(p.x, p.y)
        }
      }
      ctx.strokeStyle = 'rgba(154,207,242,.13)'
      ctx.stroke()
    }
  }

  const draw = () => {
    t += reduceMotion ? 0 : 0.0022
    ctx.clearRect(0, 0, w, h)
    const cx = w * (opts.cx ?? 0.58)
    const cy = h * (opts.cy ?? 0.46)
    const R = Math.min(w, h) * (opts.scale ?? 0.36)
    const glow = ctx.createRadialGradient(cx, cy, R * 0.15, cx, cy, R * 1.18)
    glow.addColorStop(0, 'rgba(35,135,204,.2)')
    glow.addColorStop(0.7, 'rgba(22,102,163,.08)')
    glow.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, w, h)
    ctx.beginPath()
    ctx.arc(cx, cy, R, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(174,220,250,.28)'
    ctx.lineWidth = 1.1
    ctx.stroke()
    lineSphere(t, cx, cy, R)
    const pts = cities.map((c) => project(c.lon, c.lat, t, cx, cy, R))
    const edges: Array<[number, number]> = opts.offices ? [[0, 1], [0, 2], [1, 2]] : [
      [0, 2], [0, 7], [2, 3], [3, 4], [4, 5], [4, 12], [5, 6], [7, 8], [7, 9], [2, 10], [4, 11], [10, 12], [9, 10],
    ]
    edges.forEach(([a, b], idx) => {
      const p1 = pts[a]
      const p2 = pts[b]
      if (p1.z < -0.05 || p2.z < -0.05) return
      const mx = (p1.x + p2.x) / 2
      const my = (p1.y + p2.y) / 2 - Math.hypot(p2.x - p1.x, p2.y - p1.y) * 0.16
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.quadraticCurveTo(mx, my, p2.x, p2.y)
      ctx.strokeStyle = `rgba(103,198,255,${0.15 + (idx % 3) * 0.06})`
      ctx.lineWidth = 0.8
      ctx.stroke()
    })
    pts.forEach((p, i) => {
      if (p.z < -0.08) return
      const a = 0.35 + 0.65 * ((p.z + 1) / 2)
      ctx.beginPath()
      ctx.arc(p.x, p.y, i % 4 === 0 ? 3.2 : 2.1, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(126,212,255,${a})`
      ctx.fill()
      ctx.beginPath()
      ctx.arc(p.x, p.y, 8, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(126,212,255,${a * 0.16})`
      ctx.stroke()
    })
    if (!reduceMotion) raf = requestAnimationFrame(draw)
  }

  resize()
  draw()
  window.addEventListener('resize', resize, { passive: true })
  const ro = 'ResizeObserver' in window ? new ResizeObserver(() => resize()) : null
  ro?.observe(canvas)
  if (canvas.parentElement) ro?.observe(canvas.parentElement)

  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
    ro?.disconnect()
  }
}

function setupMap(canvas: HTMLCanvasElement, seed = 1) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => undefined

  const reduceMotion = prefersReducedMotion()
  let w = 0
  let h = 0
  let dpr = 1
  let t = 0
  let raf = 0
  let nodes: Array<{ x: number; y: number; r: number }> = []
  const rand = (i: number) => (Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453) % 1

  const rebuild = () => {
    const r = canvas.getBoundingClientRect()
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    w = r.width
    h = r.height
    canvas.width = Math.max(1, Math.round(w * dpr))
    canvas.height = Math.max(1, Math.round(h * dpr))
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    nodes = Array.from({ length: 26 }, (_, i) => ({
      x: (0.08 + Math.abs(rand(i)) * 0.84) * w,
      y: (0.08 + Math.abs(rand(i + 40)) * 0.84) * h,
      r: i % 6 === 0 ? 3.6 : 2,
    }))
  }

  const draw = () => {
    t += reduceMotion ? 0 : 0.008
    ctx.clearRect(0, 0, w, h)
    ctx.strokeStyle = 'rgba(128,200,245,.08)'
    ctx.lineWidth = 1
    for (let x = 0; x < w; x += 44) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, h)
      ctx.stroke()
    }
    for (let y = 0; y < h; y += 44) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }
    nodes.forEach((n, i) => {
      for (let j = i + 1; j < nodes.length; j++) {
        const m = nodes[j]
        const d = Math.hypot(n.x - m.x, n.y - m.y)
        if (d < 145) {
          ctx.beginPath()
          ctx.moveTo(n.x, n.y)
          ctx.lineTo(m.x, m.y)
          ctx.strokeStyle = `rgba(99,190,243,${Math.max(0, 0.18 - d / 900)})`
          ctx.stroke()
        }
      }
    })
    nodes.forEach((n, i) => {
      const pulse = 1 + Math.sin(t * 2 + i) * 0.2
      ctx.beginPath()
      ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2)
      ctx.fillStyle = i % 5 === 0 ? 'rgba(116,225,177,.95)' : 'rgba(122,207,255,.88)'
      ctx.fill()
      if (i % 5 === 0) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, 9 + Math.sin(t + i) * 2, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(116,225,177,.22)'
        ctx.stroke()
      }
    })
    if (!reduceMotion) raf = requestAnimationFrame(draw)
  }

  rebuild()
  draw()
  window.addEventListener('resize', rebuild, { passive: true })
  const ro = 'ResizeObserver' in window ? new ResizeObserver(() => rebuild()) : null
  ro?.observe(canvas)
  if (canvas.parentElement) ro?.observe(canvas.parentElement)

  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', rebuild)
    ro?.disconnect()
  }
}

export function usePlgEffects() {
  const { pathname } = useLocation()

  useEffect(() => {
    const cleanups: Array<() => void> = []

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))
    cleanups.push(() => revealObserver.disconnect())

    document.querySelectorAll<HTMLCanvasElement>('[data-service-globe]').forEach((canvas) => {
      cleanups.push(setupGlobe(canvas, { cx: 0.5, cy: 0.5, scale: 0.44 }))
    })
    document.querySelectorAll<HTMLCanvasElement>('[data-about-globe]').forEach((canvas) => {
      cleanups.push(setupGlobe(canvas, { cx: 0.5, cy: 0.5, scale: 0.44, offices: true }))
    })
    document.querySelectorAll<HTMLCanvasElement>('[data-network-map]').forEach((canvas, i) => {
      cleanups.push(setupMap(canvas, i + 1))
    })

    const stacks = Array.from(document.querySelectorAll<HTMLElement>('[data-wwd-stack]'))
    if (stacks.length) {
      let raf = 0
      const stickyTop = (stack: HTMLElement) => {
        const raw = getComputedStyle(stack).getPropertyValue('--wwd-sticky-top')
        const parsed = parseFloat(raw)
        if (Number.isFinite(parsed)) return parsed
        const header = document.querySelector('.site-header')
        return (header ? header.getBoundingClientRect().height : 84) + 18
      }
      const update = () => {
        raf = 0
        stacks.forEach((stack) => {
          const panels = Array.from(stack.querySelectorAll<HTMLElement>(':scope > [data-wwd-panel]'))
          if (!panels.length) return
          const top = stickyTop(stack) + 2
          let activeIndex = 0
          panels.forEach((panel, index) => {
            if (panel.getBoundingClientRect().top <= top) activeIndex = index
          })
          panels.forEach((panel, index) => {
            const active = index === activeIndex
            panel.classList.toggle('is-active', active)
            panel.setAttribute('aria-hidden', active ? 'false' : 'true')
          })
        })
      }
      const requestUpdate = () => {
        if (raf) return
        raf = requestAnimationFrame(update)
      }
      update()
      addEventListener('scroll', requestUpdate, { passive: true })
      addEventListener('resize', requestUpdate, { passive: true })
      window.visualViewport?.addEventListener('resize', requestUpdate, { passive: true })
      cleanups.push(() => {
        cancelAnimationFrame(raf)
        removeEventListener('scroll', requestUpdate)
        removeEventListener('resize', requestUpdate)
        window.visualViewport?.removeEventListener('resize', requestUpdate)
      })
    }

    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>('[data-bg-video]'))
    if (videos.length) {
      const reduced = prefersReducedMotion()
      if (reduced) {
        videos.forEach((video) => {
          video.pause()
          video.removeAttribute('autoplay')
        })
      } else {
        const videoObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const video = entry.target as HTMLVideoElement
            if (entry.isIntersecting) {
              const play = video.play()
              if (play && typeof play.catch === 'function') play.catch(() => undefined)
            } else {
              video.pause()
            }
          })
        }, { rootMargin: '180px 0px', threshold: 0.08 })
        videos.forEach((video) => videoObserver.observe(video))
        const onVisibility = () => {
          if (document.hidden) videos.forEach((v) => v.pause())
        }
        document.addEventListener('visibilitychange', onVisibility)
        cleanups.push(() => {
          videoObserver.disconnect()
          document.removeEventListener('visibilitychange', onVisibility)
        })
      }
    }

    const counters = [...document.querySelectorAll<HTMLElement>('[data-count]')]
    if (counters.length) {
      const reduceMotion = prefersReducedMotion()
      const animate = (el: HTMLElement) => {
        const target = Number(el.dataset.count || el.textContent || 0)
        if (reduceMotion || !Number.isFinite(target)) {
          el.textContent = String(target)
          return
        }
        const duration = 950
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - progress, 3)
          el.textContent = String(Math.round(target * eased))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            animate(entry.target as HTMLElement)
            obs.unobserve(entry.target)
          })
        }, { threshold: 0.45 })
        counters.forEach((el) => {
          el.textContent = '0'
          observer.observe(el)
        })
        cleanups.push(() => observer.disconnect())
      } else {
        counters.forEach(animate)
      }
    }

    const media = Array.from(document.querySelectorAll<HTMLVideoElement>(
      '.hero-bg-video,.cap-hero-video,.connected-bg-video,.visual-video-system video',
    ))
    const mediaTimers: number[] = []
    media.forEach((video) => {
      let ready = video.readyState >= 2
      const markReady = () => {
        ready = true
        video.classList.remove('media-failed')
      }
      const markFailed = () => {
        if (!ready) video.classList.add('media-failed')
      }
      video.addEventListener('loadeddata', markReady, { once: true })
      video.addEventListener('canplay', markReady, { once: true })
      video.addEventListener('error', markFailed)
      mediaTimers.push(window.setTimeout(() => {
        if (video.readyState < 2) markFailed()
      }, 6500))
      cleanups.push(() => video.removeEventListener('error', markFailed))
    })
    cleanups.push(() => mediaTimers.forEach((id) => clearTimeout(id)))

    const nudgeCanvases = () => window.dispatchEvent(new Event('resize'))
    const loadTimerA = window.setTimeout(nudgeCanvases, 180)
    const loadTimerB = window.setTimeout(nudgeCanvases, 900)
    nudgeCanvases()
    document.fonts?.ready.then(nudgeCanvases).catch(() => undefined)
    cleanups.push(() => {
      clearTimeout(loadTimerA)
      clearTimeout(loadTimerB)
    })

    return () => cleanups.forEach((fn) => fn())
  }, [pathname])
}

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)
  }, [title, description])
}

export function useScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      const timer = window.setTimeout(scroll, 80)
      return () => clearTimeout(timer)
    }
    window.scrollTo(0, 0)
    return undefined
  }, [pathname, hash])
}

"use client";

import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../lib/ThemeContext';

export function ElectricConstellationBg() {
    const canvasRef = useRef(null);
    const pointerRef = useRef({ x: -1000, y: -1000, active: false });
    const clickBurstsRef = useRef([]);
    const shootingStarsRef = useRef([]);
    const { isDark } = useTheme();
    const animFrameRef = useRef(null);
    const particlesRef = useRef([]);
    const timeRef = useRef(0);

    const createParticle = useCallback((w, h, layer = 0) => {
        const layerScale = layer === 0 ? 1 : layer === 1 ? 0.6 : 0.3;
        return {
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.25 * layerScale,
            vy: (Math.random() - 0.5) * 0.25 * layerScale,
            r: (Math.random() * 1.8 + 0.3) * layerScale,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.008 + Math.random() * 0.02,
            brightness: 0.3 + Math.random() * 0.7,
            layer,
            ox: 0, oy: 0, // parallax offset
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w, h;

        const isMobileDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const PARTICLE_COUNTS = [
            isMobileDevice ? 30 : 60,  // Layer 0 — foreground
            isMobileDevice ? 18 : 35,  // Layer 1 — mid
            isMobileDevice ? 10 : 20,  // Layer 2 — deep background
        ];
        const CONNECTION_DIST = isMobileDevice ? 100 : 140;
        const POINTER_RADIUS = isMobileDevice ? 150 : 200;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            if (particlesRef.current.length === 0) {
                const all = [];
                PARTICLE_COUNTS.forEach((count, layer) => {
                    for (let i = 0; i < count; i++) all.push(createParticle(w, h, layer));
                });
                particlesRef.current = all;
            }
        };

        resize();
        window.addEventListener('resize', resize);

        // Pointer events — unified mouse + touch
        const updatePointer = (x, y) => {
            pointerRef.current = { x, y: y + window.scrollY, active: true };
        };

        const handleMouseMove = (e) => updatePointer(e.clientX, e.clientY);
        const handleMouseLeave = () => { pointerRef.current.active = false; };
        const handleTouchMove = (e) => {
            const t = e.touches[0];
            if (t) updatePointer(t.clientX, t.clientY);
        };
        const handleTouchStart = (e) => {
            const t = e.touches[0];
            if (t) updatePointer(t.clientX, t.clientY);
        };
        const handleTouchEnd = () => { pointerRef.current.active = false; };

        const handleClick = (e) => {
            const cx = e.clientX || (e.changedTouches && e.changedTouches[0]?.clientX) || 0;
            const cy = (e.clientY || (e.changedTouches && e.changedTouches[0]?.clientY) || 0) + window.scrollY;

            // Electric burst — more particles, multiple rings
            clickBurstsRef.current.push({
                x: cx, y: cy, time: 0,
                sparks: Array.from({ length: 14 }, () => ({
                    angle: Math.random() * Math.PI * 2,
                    speed: 2 + Math.random() * 5,
                    life: 1.0,
                    r: 0.8 + Math.random() * 2.5,
                    wobble: (Math.random() - 0.5) * 0.3,
                })),
                ring: { r: 0, opacity: 0.6 },
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('click', handleClick);
        window.addEventListener('touchend', handleClick);

        // Spawn shooting stars periodically
        const spawnShootingStar = () => {
            if (shootingStarsRef.current.length > 2) return;
            shootingStarsRef.current.push({
                x: Math.random() * w * 0.6,
                y: Math.random() * h * 0.4,
                angle: Math.PI * 0.15 + (Math.random() - 0.5) * 0.3,
                speed: 4 + Math.random() * 6,
                life: 1.0,
                len: 40 + Math.random() * 80,
                width: 0.5 + Math.random() * 1.5,
            });
        };

        const shootingStarInterval = setInterval(spawnShootingStar, 3000 + Math.random() * 4000);

        const draw = () => {
            timeRef.current += 0.016;
            const t = timeRef.current;
            const scrollY = window.scrollY;
            ctx.clearRect(0, 0, w, h);

            const particles = particlesRef.current;
            const px = pointerRef.current.x;
            const py = pointerRef.current.y - scrollY;
            const pointerActive = pointerRef.current.active;

            // Electric blue palette
            const BR = 0, BG = 102, BB = 255;
            // Cyan accent for depth
            const CR = 80, CG = 200, CB = 255;

            // ─── Ambient nebula glow — subtle background atmosphere ───
            const nebula1x = w * 0.7 + Math.sin(t * 0.1) * 60;
            const nebula1y = h * 0.3 + Math.cos(t * 0.08) * 40;
            const ng1 = ctx.createRadialGradient(nebula1x, nebula1y, 0, nebula1x, nebula1y, 350);
            ng1.addColorStop(0, `rgba(${BR},${BG},${BB},${isDark ? 0.025 : 0.012})`);
            ng1.addColorStop(1, 'transparent');
            ctx.fillStyle = ng1;
            ctx.fillRect(0, 0, w, h);

            const nebula2x = w * 0.2 + Math.cos(t * 0.12) * 50;
            const nebula2y = h * 0.7 + Math.sin(t * 0.1) * 50;
            const ng2 = ctx.createRadialGradient(nebula2x, nebula2y, 0, nebula2x, nebula2y, 280);
            ng2.addColorStop(0, `rgba(${CR},${CG},${CB},${isDark ? 0.018 : 0.008})`);
            ng2.addColorStop(1, 'transparent');
            ctx.fillStyle = ng2;
            ctx.fillRect(0, 0, w, h);

            // ─── Update & draw particles by layer (back to front) ───
            for (let layer = 2; layer >= 0; layer--) {
                const layerParticles = particles.filter(p => p.layer === layer);
                const layerOpacity = layer === 0 ? 1 : layer === 1 ? 0.5 : 0.25;
                const parallaxFactor = layer === 0 ? 1 : layer === 1 ? 0.5 : 0.2;

                for (const p of layerParticles) {
                    p.pulse += p.pulseSpeed;
                    const glow = 0.5 + Math.sin(p.pulse) * 0.35;

                    // Parallax from pointer
                    if (pointerActive && layer > 0) {
                        const targetOx = (px - w / 2) * 0.01 * parallaxFactor;
                        const targetOy = (py - h / 2) * 0.01 * parallaxFactor;
                        p.ox += (targetOx - p.ox) * 0.03;
                        p.oy += (targetOy - p.oy) * 0.03;
                    }

                    // Mouse/touch interaction — foreground only
                    if (layer === 0 && pointerActive) {
                        const dmx = px - p.x;
                        const dmy = py - p.y;
                        const distPtr = Math.sqrt(dmx * dmx + dmy * dmy);
                        if (distPtr < POINTER_RADIUS && distPtr > 0) {
                            const force = (1 - distPtr / POINTER_RADIUS);
                            if (distPtr < 50) {
                                p.vx -= (dmx / distPtr) * force * 0.6;
                                p.vy -= (dmy / distPtr) * force * 0.6;
                            } else {
                                p.vx += (dmx / distPtr) * force * 0.12;
                                p.vy += (dmy / distPtr) * force * 0.12;
                            }
                        }
                    }

                    p.vx *= 0.985;
                    p.vy *= 0.985;
                    p.x += p.vx;
                    p.y += p.vy;

                    if (p.x < -20) p.x = w + 20;
                    if (p.x > w + 20) p.x = -20;
                    if (p.y < -20) p.y = h + 20;
                    if (p.y > h + 20) p.y = -20;

                    const drawX = p.x + p.ox;
                    const drawY = p.y + p.oy;

                    const alpha = glow * p.brightness * layerOpacity * (isDark ? 0.75 : 0.35);

                    // Twinkling star core
                    ctx.beginPath();
                    ctx.arc(drawX, drawY, p.r, 0, Math.PI * 2);
                    const isDeep = layer === 2;
                    const r = isDeep ? CR : BR;
                    const g = isDeep ? CG : BG;
                    const b = isDeep ? CB : BB;
                    ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
                    ctx.fill();

                    // Glow halo
                    if (p.r > 0.8) {
                        ctx.beginPath();
                        ctx.arc(drawX, drawY, p.r * 4, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.08})`;
                        ctx.fill();
                    }
                }

                // Constellation lines (foreground layer only for performance)
                if (layer === 0) {
                    for (let i = 0; i < layerParticles.length; i++) {
                        for (let j = i + 1; j < layerParticles.length; j++) {
                            const a = layerParticles[i], b = layerParticles[j];
                            const dx = a.x - b.x, dy = a.y - b.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);

                            if (dist < CONNECTION_DIST) {
                                let opacity = (1 - dist / CONNECTION_DIST) * (isDark ? 0.14 : 0.06);

                                // Brighten near pointer
                                if (pointerActive) {
                                    const midX = (a.x + b.x) / 2, midY = (a.y + b.y) / 2;
                                    const dMid = Math.sqrt((px - midX) ** 2 + (py - midY) ** 2);
                                    if (dMid < POINTER_RADIUS) {
                                        opacity *= 1 + (1 - dMid / POINTER_RADIUS) * 4;
                                    }
                                }

                                ctx.beginPath();
                                ctx.moveTo(a.x, a.y);
                                ctx.lineTo(b.x, b.y);
                                ctx.strokeStyle = `rgba(${BR},${BG},${BB},${opacity})`;
                                ctx.lineWidth = 0.5;
                                ctx.stroke();
                            }
                        }
                    }
                }
            }

            // ─── Pointer glow aura ───
            if (pointerActive && px > 0 && py > 0 && px < w && py < h) {
                const grad = ctx.createRadialGradient(px, py, 0, px, py, 140);
                grad.addColorStop(0, `rgba(${BR},${BG},${BB},${isDark ? 0.07 : 0.035})`);
                grad.addColorStop(0.5, `rgba(${CR},${CG},${CB},${isDark ? 0.02 : 0.01})`);
                grad.addColorStop(1, 'transparent');
                ctx.beginPath();
                ctx.arc(px, py, 140, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
            }

            // ─── Shooting stars ───
            const stars = shootingStarsRef.current;
            for (let s = stars.length - 1; s >= 0; s--) {
                const st = stars[s];
                st.life -= 0.012;
                if (st.life <= 0) { stars.splice(s, 1); continue; }

                const progress = 1 - st.life;
                const cx = st.x + Math.cos(st.angle) * progress * st.len * 8;
                const cy = st.y + Math.sin(st.angle) * progress * st.len * 8;
                const tailX = cx - Math.cos(st.angle) * st.len * st.life;
                const tailY = cy - Math.sin(st.angle) * st.len * st.life;

                const grad = ctx.createLinearGradient(tailX, tailY, cx, cy);
                grad.addColorStop(0, 'transparent');
                grad.addColorStop(0.7, `rgba(${CR},${CG},${CB},${st.life * 0.3})`);
                grad.addColorStop(1, `rgba(255,255,255,${st.life * 0.7})`);

                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(cx, cy);
                ctx.strokeStyle = grad;
                ctx.lineWidth = st.width * st.life;
                ctx.lineCap = 'round';
                ctx.stroke();

                // Head glow
                ctx.beginPath();
                ctx.arc(cx, cy, st.width * 2 * st.life, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${st.life * 0.5})`;
                ctx.fill();
            }

            // ─── Click bursts — electric shockwave ───
            const bursts = clickBurstsRef.current;
            for (let b = bursts.length - 1; b >= 0; b--) {
                const burst = bursts[b];
                const byScreen = burst.y - scrollY;
                burst.time += 0.016;
                let alive = false;

                // Expanding ring
                burst.ring.r += 4;
                burst.ring.opacity *= 0.94;
                if (burst.ring.opacity > 0.01) {
                    ctx.beginPath();
                    ctx.arc(burst.x, byScreen, burst.ring.r, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(${CR},${CG},${CB},${burst.ring.opacity})`;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                }

                // Sparks
                for (const sp of burst.sparks) {
                    if (sp.life <= 0) continue;
                    alive = true;
                    sp.life -= 0.02;

                    const dist = (1 - sp.life) * sp.speed * 35;
                    const wobbleOffset = Math.sin(dist * 0.3) * sp.wobble * 20;
                    const sx = burst.x + Math.cos(sp.angle) * dist + Math.cos(sp.angle + Math.PI / 2) * wobbleOffset;
                    const sy = byScreen + Math.sin(sp.angle) * dist + Math.sin(sp.angle + Math.PI / 2) * wobbleOffset;

                    // Electric spark — jagged segments
                    ctx.beginPath();
                    ctx.arc(sx, sy, sp.r * sp.life, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${BR},${BG},${BB},${sp.life * 0.9})`;
                    ctx.fill();

                    // Hot white core
                    ctx.beginPath();
                    ctx.arc(sx, sy, sp.r * sp.life * 0.4, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255,255,255,${sp.life * 0.6})`;
                    ctx.fill();

                    // Trail glow
                    ctx.beginPath();
                    ctx.arc(sx, sy, sp.r * sp.life * 5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${CR},${CG},${CB},${sp.life * 0.08})`;
                    ctx.fill();
                }

                if (!alive && burst.ring.opacity < 0.01) bursts.splice(b, 1);
            }

            animFrameRef.current = requestAnimationFrame(draw);
        };

        animFrameRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            clearInterval(shootingStarInterval);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('touchend', handleClick);
        };
    }, [isDark, createParticle]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0, left: 0,
                width: '100%', height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
}

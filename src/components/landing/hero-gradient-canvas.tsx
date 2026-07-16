"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ── PayOrbit 1 gradient background shader ─────────────────────────────────────
const bgVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const bgFragment = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec3 purple  = vec3(0.333, 0.004, 1.000); // #5501ff
    vec3 magenta = vec3(1.000, 0.000, 0.651); // #ff00a6

    // Diagonal gradient with slow breathing animation
    float wave = sin(uTime * 0.12) * 0.06;
    float blend = clamp(vUv.x * 0.6 + (1.0 - vUv.y) * 0.4 + wave, 0.0, 1.0);
    vec3 color = mix(purple, magenta, blend);

    // Left edge fades to transparent (blends with white hero bg)
    float alpha = smoothstep(0.0, 0.32, vUv.x);

    gl_FragColor = vec4(color, alpha);
  }
`;

export default function HeroGradientCanvas() {
	const mountRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const mount = mountRef.current;
		if (!mount) return;

		const W = mount.clientWidth;
		const H = mount.clientHeight;

		// ── Renderer ──────────────────────────────────────────────────────────
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(W, H);
		renderer.setClearColor(0x000000, 0);
		renderer.autoClear = false;
		mount.appendChild(renderer.domElement);

		// ── Scene 1: gradient background (orthographic) ───────────────────────
		const bgScene  = new THREE.Scene();
		const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
		const bgUniforms = { uTime: { value: 0 } };
		const bgMesh = new THREE.Mesh(
			new THREE.PlaneGeometry(2, 2),
			new THREE.ShaderMaterial({
				vertexShader: bgVertex,
				fragmentShader: bgFragment,
				uniforms: bgUniforms,
				transparent: true,
				depthWrite: false,
			}),
		);
		bgScene.add(bgMesh);

		// ── Scene 2: iridescent orbital (perspective) ─────────────────────────
		const orbScene  = new THREE.Scene();
		const orbCamera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
		orbCamera.position.set(0, 0, 6);

		// Lights for iridescent chrome effect
		orbScene.add(new THREE.AmbientLight(0xffffff, 0.5));

		const pLight = new THREE.PointLight(0x5501ff, 50, 14);
		pLight.position.set(2.5, 2, 3);
		orbScene.add(pLight);

		const mLight = new THREE.PointLight(0xff00a6, 40, 14);
		mLight.position.set(-2, -1.5, 2.5);
		orbScene.add(mLight);

		const cLight = new THREE.PointLight(0x00ffbb, 28, 12);
		cLight.position.set(0, 2.5, -1);
		orbScene.add(cLight);

		const wLight = new THREE.DirectionalLight(0xfff0f8, 1.0);
		wLight.position.set(3, 5, 4);
		orbScene.add(wLight);

		// Chrome material — reflections of colored lights = iridescent look
		const chromeMat = new THREE.MeshStandardMaterial({
			color: 0xf0e8ff,
			metalness: 1.0,
			roughness: 0.02,
			envMapIntensity: 1.2,
		});

		// Orbital group: 3 intersecting torus rings + central sphere
		const group = new THREE.Group();
		orbScene.add(group);

		const torusGeo = new THREE.TorusGeometry(1.45, 0.055, 28, 140);

		const ring1 = new THREE.Mesh(torusGeo, chromeMat);
		group.add(ring1);

		const ring2 = new THREE.Mesh(torusGeo, chromeMat);
		ring2.rotation.x = Math.PI / 2.4;
		ring2.rotation.y = Math.PI / 5;
		group.add(ring2);

		const ring3 = new THREE.Mesh(torusGeo, chromeMat);
		ring3.rotation.x = -Math.PI / 2.4;
		ring3.rotation.z = Math.PI / 3.5;
		group.add(ring3);

		const sphere = new THREE.Mesh(
			new THREE.SphereGeometry(0.25, 64, 64),
			new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1.0, roughness: 0.0 }),
		);
		group.add(sphere);

		// Particle field (network nodes)
		const pCount = 200;
		const pPositions = new Float32Array(pCount * 3);
		for (let i = 0; i < pCount; i++) {
			const phi   = Math.acos(2 * Math.random() - 1);
			const theta = Math.random() * Math.PI * 2;
			const r     = 1.9 + Math.random() * 2.0;
			pPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
			pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
			pPositions[i * 3 + 2] = r * Math.cos(phi);
		}
		const pGeo = new THREE.BufferGeometry();
		pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
		const particles = new THREE.Points(
			pGeo,
			new THREE.PointsMaterial({ color: 0xcc99ff, size: 0.022, transparent: true, opacity: 0.55 }),
		);
		group.add(particles);

		// ── Mouse parallax ────────────────────────────────────────────────────
		const target = new THREE.Vector2(0, 0);
		const current = new THREE.Vector2(0, 0);
		const onMouse = (e: MouseEvent) => {
			const rect = mount.getBoundingClientRect();
			target.x =  ((e.clientX - rect.left) / rect.width  - 0.5) * 0.7;
			target.y = -((e.clientY - rect.top)  / rect.height - 0.5) * 0.7;
		};
		window.addEventListener("mousemove", onMouse);

		// ── Resize ────────────────────────────────────────────────────────────
		const onResize = () => {
			if (!mount) return;
			const w = mount.clientWidth;
			const h = mount.clientHeight;
			renderer.setSize(w, h);
			orbCamera.aspect = w / h;
			orbCamera.updateProjectionMatrix();
		};
		window.addEventListener("resize", onResize);

		// ── Animate ───────────────────────────────────────────────────────────
		const clock = new THREE.Clock();
		let rafId: number;

		const animate = () => {
			rafId = requestAnimationFrame(animate);
			const t = clock.getElapsedTime();

			bgUniforms.uTime.value = t;

			// Smooth mouse parallax
			current.lerp(target, 0.04);
			group.rotation.y = t * 0.007 * 60 * 0.005 + current.x; // slow + mouse
			group.rotation.y = t * 0.3 + current.x;
			group.rotation.x = current.y * 0.5;

			// Orbit the colored lights for dynamic reflections
			pLight.position.x = Math.sin(t * 0.6) * 3.5;
			pLight.position.z = Math.cos(t * 0.6) * 3.5;
			mLight.position.x = Math.sin(t * 0.45 + 2.1) * -3;
			mLight.position.z = Math.cos(t * 0.45 + 2.1) * 2.5;
			cLight.position.x = Math.cos(t * 0.35 + 1.0) * 2;
			cLight.position.y = Math.sin(t * 0.35 + 1.0) * 3;

			particles.rotation.y = -t * 0.08;

			// Render bg first, then orbital on top
			renderer.clear();
			renderer.render(bgScene, bgCamera);
			renderer.clearDepth();
			renderer.render(orbScene, orbCamera);
		};
		animate();

		return () => {
			cancelAnimationFrame(rafId);
			window.removeEventListener("mousemove", onMouse);
			window.removeEventListener("resize", onResize);
			renderer.dispose();
			if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
		};
	}, []);

	return <div ref={mountRef} className="h-full w-full" />;
}

"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroOrbitCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		// ── Renderer ──────────────────────────────────────────────────────────
		const renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
			alpha: true,
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(canvas.clientWidth, canvas.clientHeight);
		renderer.setClearColor(0x000000, 0);
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.2;

		// ── Scene & Camera ────────────────────────────────────────────────────
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			45,
			canvas.clientWidth / canvas.clientHeight,
			0.1,
			100,
		);
		camera.position.set(0, 0, 6);

		// ── Lights ────────────────────────────────────────────────────────────
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
		scene.add(ambientLight);

		const purpleLight = new THREE.PointLight(0x5501ff, 40, 12);
		purpleLight.position.set(2, 2, 3);
		scene.add(purpleLight);

		const cyanLight = new THREE.PointLight(0x00ffbb, 25, 12);
		cyanLight.position.set(-2.5, -1, 2);
		scene.add(cyanLight);

		const magentaLight = new THREE.PointLight(0xff00a6, 20, 10);
		magentaLight.position.set(0.5, -2.5, -1);
		scene.add(magentaLight);

		const whiteLight = new THREE.DirectionalLight(0xffffff, 0.8);
		whiteLight.position.set(5, 5, 5);
		scene.add(whiteLight);

		// ── Materials ─────────────────────────────────────────────────────────
		const ringMat = new THREE.MeshStandardMaterial({
			color: 0xddccff,
			metalness: 0.95,
			roughness: 0.05,
			envMapIntensity: 1,
		});

		const sphereMat = new THREE.MeshStandardMaterial({
			color: 0xffffff,
			metalness: 1,
			roughness: 0,
		});

		// ── Orbital group ─────────────────────────────────────────────────────
		const group = new THREE.Group();
		scene.add(group);

		// Central sphere
		const sphere = new THREE.Mesh(
			new THREE.SphereGeometry(0.22, 64, 64),
			sphereMat,
		);
		group.add(sphere);

		// 3 intersecting rings
		const torusGeo = new THREE.TorusGeometry(1.4, 0.045, 24, 120);

		const ring1 = new THREE.Mesh(torusGeo, ringMat);
		group.add(ring1);

		const ring2 = new THREE.Mesh(torusGeo, ringMat);
		ring2.rotation.x = Math.PI / 2.5;
		ring2.rotation.y = Math.PI / 6;
		group.add(ring2);

		const ring3 = new THREE.Mesh(torusGeo, ringMat);
		ring3.rotation.x = -Math.PI / 2.5;
		ring3.rotation.z = Math.PI / 4;
		group.add(ring3);

		// ── Particle field ────────────────────────────────────────────────────
		const particleCount = 180;
		const positions = new Float32Array(particleCount * 3);
		for (let i = 0; i < particleCount; i++) {
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			const r = 1.8 + Math.random() * 2.2;
			positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
			positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
			positions[i * 3 + 2] = r * Math.cos(phi);
		}
		const particleGeo = new THREE.BufferGeometry();
		particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
		const particleMat = new THREE.PointsMaterial({
			color: 0x9966ff,
			size: 0.025,
			transparent: true,
			opacity: 0.6,
		});
		const particles = new THREE.Points(particleGeo, particleMat);
		group.add(particles);

		// ── Mouse parallax ────────────────────────────────────────────────────
		let targetX = 0;
		let targetY = 0;
		let currentX = 0;
		let currentY = 0;

		const onMouseMove = (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6;
			targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 0.6;
		};
		canvas.closest("section")?.addEventListener("mousemove", onMouseMove);

		// ── Resize ────────────────────────────────────────────────────────────
		const onResize = () => {
			if (!canvas) return;
			const w = canvas.clientWidth;
			const h = canvas.clientHeight;
			renderer.setSize(w, h);
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
		};
		window.addEventListener("resize", onResize);

		// ── Animation loop ────────────────────────────────────────────────────
		let frame = 0;
		let rafId: number;

		const animate = () => {
			rafId = requestAnimationFrame(animate);
			frame += 0.005;

			// Smooth mouse parallax
			currentX += (targetX - currentX) * 0.04;
			currentY += (targetY - currentY) * 0.04;

			group.rotation.y = frame + currentX;
			group.rotation.x = currentY * 0.5;

			// Subtle light orbit
			purpleLight.position.x = Math.sin(frame * 0.7) * 3;
			purpleLight.position.z = Math.cos(frame * 0.7) * 3;
			cyanLight.position.x = Math.sin(frame * 0.5 + 2) * -3;
			cyanLight.position.z = Math.cos(frame * 0.5 + 2) * 2;

			// Particles counter-rotate slowly
			particles.rotation.y = -frame * 0.3;

			renderer.render(scene, camera);
		};
		animate();

		return () => {
			cancelAnimationFrame(rafId);
			window.removeEventListener("resize", onResize);
			canvas.closest("section")?.removeEventListener("mousemove", onMouseMove);
			renderer.dispose();
			ringMat.dispose();
			sphereMat.dispose();
			particleMat.dispose();
			torusGeo.dispose();
			particleGeo.dispose();
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="h-full w-full"
			style={{ display: "block" }}
		/>
	);
}

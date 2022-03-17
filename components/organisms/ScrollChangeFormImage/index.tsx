import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import style from "./style.module.scss";
import { VERTEX_SHADER_SCRIPT } from "./shaderScripts/vertexShader";
import { FRAGMENT_SHADER_SCRIPT } from "./shaderScripts/fragmentShader";

type Props = {
  className?: string;
};

interface canvasSize {
  width: number;
  height: number;
}

const ScrollChangeFormImage: FunctionComponent<Props> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasSize: canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  let main = () => {};

  useEffect(() => {
    if (canvasRef.current) {
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(canvasSize.width, canvasSize.height);

      // ウィンドウとwebGLの座標を一致させるため、描画がウィンドウぴったりになるようカメラを調整
      const fov = 60; // 視野角
      const fovRadian = (fov / 2) * (Math.PI / 180);
      const distance = canvasSize.height / 2 / Math.tan(fovRadian);
      const camera = new THREE.PerspectiveCamera(
        fov,
        canvasSize.width / canvasSize.height,
        0.1,
        1000
      );
      camera.position.z = distance;

      const scene = new THREE.Scene();

      const loader = new THREE.TextureLoader();
      const texture = loader.load("https://source.unsplash.com/whOkVvf0_hU/");

      const uniforms = {
        uniformTexture: { value: texture },
        uniformImageAspect: { value: 1920 / 1280 }, // 画像のアスペクト
        uniformPlaneAspect: { value: 800 / 500 }, // プレーンのアスペクト
      };
      const geo = new THREE.PlaneBufferGeometry(800, 500, 100, 100);
      const mat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: VERTEX_SHADER_SCRIPT,
        fragmentShader: FRAGMENT_SHADER_SCRIPT,
      });

      const mesh = new THREE.Mesh(geo, mat);

      scene.add(mesh);

      const loop = () => {
        renderer.render(scene, camera);

        requestAnimationFrame(loop);
        console.log("あ");
      };

      main = () => {
        window.addEventListener("load", () => {
          loop();
        });
        console.log("い");
      };
    }

    main();
  }, []);

  // useEffect(() => {
  //   if (isRendered) {
  //     main();
  //   }
  // }, [isRendered]);

  return (
    <div className={style.webglCanvas}>
      <canvas
        ref={canvasRef}
        id="webgl-canvas"
        className={style.webglCanvas__body}
      ></canvas>
    </div>
  );
};

export default ScrollChangeFormImage;

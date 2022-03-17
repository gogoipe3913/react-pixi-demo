import React, { FunctionComponent, useEffect, useRef } from "react";
// import { Binder } from "../../helpers/Binder";
// import styles from "./style.module.scss";
import character from "../../../static/images/image_1.jpg";
import * as PIXI from "pixi.js";
import { NoiseFilter } from "@pixi/filter-noise";
import gsap from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

// register the plugin
gsap.registerPlugin(PixiPlugin);

// give the plugin a reference to the PIXI object
PixiPlugin.registerPIXI(PIXI);

const ttrGirl2 = PIXI.Texture.from(
  "/static/images/displacement_background.jpeg"
);
const sprGirl2 = new PIXI.Sprite(ttrGirl2);

const displaceMentFilter = new PIXI.filters.DisplacementFilter(sprGirl2);
displaceMentFilter.scale.x = 20;
displaceMentFilter.scale.y = 20;

export interface DistortionImagesInterface {
  images: DistortionImageInterface[];
}

interface DistortionImageInterface {
  url: string;
  alt: string;
}

type ownProps = {
  className?: string;
};

type Props = DistortionImagesInterface & ownProps;

const DistortionImages: FunctionComponent<Props> = ({
  images,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);

  /**
   * unmount時に呼び出すメソッド
   * ステージに登録された子要素とステージそのものを削除する
   */
  const unmount = () => {
    if (!ref.current) return;
    while (ref.current.firstChild) {
      ref.current.removeChild(ref.current.firstChild);
    }
  };

  /**
   * 画像を読み込み、Spriteオブジェクトとして返す
   * @param {*} app
   */
  const generateGirl = (
    app: any,
    noiseFilter: NoiseFilter,
    displacementFilter: any
  ) => {
    // 画像を読み込み
    // テクスチャからスプライトを生成する
    const ttrGirl = PIXI.Texture.from("/static/images/image_2.jpg");
    const sprGirl = new PIXI.Sprite(ttrGirl);

    // move the sprite to the center of the screen
    // スプライトの基準座標を画像の中心に設定する
    sprGirl.anchor.set(0.5);

    // スプライトのステージ上での位置を指定。今回は中央を指定する
    sprGirl.x = app.screen.width / 2;
    sprGirl.y = app.screen.height / 2;

    sprGirl.filters = [displacementFilter];
    return sprGirl;
  };

  // PIXIのステージを作成しDOMに登録する
  // ついでに画像を読み込んでステージに登録している
  const pixiAnimation = () => {
    if (!ref.current) return null;

    /**
     * STEP.2 描画するためのレンダラーを用意。引数は描画領域の幅、高さ、オプション
     */
    const app = new PIXI.Application({
      width: 900,
      height: 600,
      antialias: true, // アンチエイリアスをONに
      backgroundColor: 0x00ffd4, // 背景色
      //  transparent:      true,     // 背景を透過にしたい場合はこちらを指定
    });

    // DOMに作成したPIXI.Applicationを登録
    ref.current.appendChild(app.view);

    const noiseFilter = new PIXI.filters.NoiseFilter(); //ノイズフィルター
    noiseFilter.noise = 0.1; //ノイズの大きさ
    noiseFilter.seed = 0.1; //ノイズのランダム度合い

    // 画像を生成
    const sprGirl = generateGirl(app, noiseFilter, displaceMentFilter);

    // 画像をステージに登録
    app.stage.addChild(sprGirl);
    app.ticker.add(animate);

    function animate() {
      noiseFilter.seed += 0.002;
    }

    return app.view;
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  // mount時に実行される関数
  useEffect(() => {
    if (!ref.current) return;
    pixiAnimation();

    return unmount;
  }, []);

  const onMouseOver = () => {
    gsap.to(displaceMentFilter.scale, 1.5, {
      x: 100,
      y: 100,
      ease: "power4.inOut",
    });
    gsap.to(ref.current, 1.5, {
      transform: "scale(1, 1.5)",
      ease: "power4.inOut",
    });
  };

  const onMouseOut = () => {
    gsap.to(displaceMentFilter.scale, 1.5, {
      x: 0,
      y: 0,
      ease: "power4.inOut",
    });
    gsap.to(ref.current, 1.5, {
      transform: "scale(1, 1)",
      ease: "power4.inOut",
    });
  };

  return (
    <div>
      <div
        ref={ref}
        onMouseOver={() => {
          onMouseOver();
        }}
        onMouseOut={() => {
          onMouseOut();
        }}
        className="stage"
      ></div>
    </div>
  );
};

// const DistortionImages: FunctionComponent<Props> = ({
//   images,
//   className = "",
// }) => {
//   return (
//     <Binder classNames={[styles.DistortionImages, className]}>
//       <ul>
//         {images.map((image, index) => (
//           <li className={styles.DistortionImages__image} key={index}>
//             <img
//               className={styles.DistortionImages__imageBody}
//               src={image.url}
//               alt={image.alt}
//               width={600}
//             />
//           </li>
//         ))}
//         {images.map((image, index) => (
//           <li className={styles.DistortionImages__image} key={index}>
//             <img
//               className={styles.DistortionImages__imageBody}
//               src={image.url}
//               alt={image.alt}
//               width={600}
//             />
//           </li>
//         ))}
//       </ul>
//     </Binder>
//   );
// };

export default DistortionImages;

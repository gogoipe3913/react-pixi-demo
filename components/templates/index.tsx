import dynamic from "next/dynamic";
import Head from "next/head";
import React, { FunctionComponent } from "react";
// import data from "../organisms/DistortionImages/data";

// const DistortionImagesNoSSR = dynamic(
//   () => import("../organisms/DistortionImages"),
//   {
//     ssr: false,
//   }
// );

const ScrollChangeFormImageNoSSR = dynamic(
  () => import("../organisms/ScrollChangeFormImage"),
  {
    ssr: false,
  }
);

const PixiTemplate: FunctionComponent = props => (
  <>
    <Head>
      <meta title="react-pixi-demo" />
    </Head>
    {/* <DistortionImagesNoSSR {...data} /> */}
    <ScrollChangeFormImageNoSSR />
  </>
);

export default PixiTemplate;

import Head from "next/head";
import React, { FunctionComponent } from "react";
import DistortionImages from "../organisms/DistortionImages";
import data from "../organisms/DistortionImages/data";

const PixiTemplate: FunctionComponent = props => (
  <>
    <Head>
      <meta title="react-pixi-demo" />
    </Head>
    <DistortionImages {...data} />
  </>
);

export default PixiTemplate;

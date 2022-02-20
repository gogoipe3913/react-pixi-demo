import React, { FunctionComponent } from "react";
import { Binder } from "../../helpers/Binder";
import styles from "./style.module.scss";

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
  return (
    <Binder classNames={[styles.DistortionImages, className]}>
      <ul>
        {images.map((image, index) => (
          <li className={styles.DistortionImages__image} key={index}>
            <img
              className={styles.DistortionImages__imageBody}
              src={image.url}
              alt={image.alt}
              width={600}
            />
          </li>
        ))}
        {images.map((image, index) => (
          <li className={styles.DistortionImages__image} key={index}>
            <img
              className={styles.DistortionImages__imageBody}
              src={image.url}
              alt={image.alt}
              width={600}
            />
          </li>
        ))}
      </ul>
    </Binder>
  );
};

export default DistortionImages;

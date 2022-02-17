import react, { Component } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import PixiTemplate from "../components/templates";

class Home extends Component {
  public render(): JSX.Element {
    return <PixiTemplate />;
  }
}

export default Home;

import styled from "@emotion/styled";
import { css } from "@emotion/react";
import React from "react";
import LoadingOverlay from "react-loading-overlay";
import "./Loading.css";
import { useSelector } from "react-redux";
import { isLoading } from "../redux/reducerData";

const Loading = () => {
  const loading = useSelector(isLoading);

  const DarkBackground = styled.div`
    display: none;
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);

    ${(props) =>
      props.disappear &&
      css`
        display: block;
      `}
  `;
  return (
    <DarkBackground disappear={!loading}>
      <LoadingOverlay
        active={true}
        spinner={true}
        text="Yükleniyor..."
      ></LoadingOverlay>
    </DarkBackground>
  );
};

export default Loading;

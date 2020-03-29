import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";

const readmePath = require("./README.md");

interface HomeProps {
  info: string,
  dispatch: Function
}

function Home({info, dispatch}: HomeProps) {
  const initFetch = useCallback(() => {
    fetch(readmePath).then(
      content => content.text()).then(
      content => {
        dispatch({
        app: "INFO",
        type: "READ",
        data: content
      })}, null
    );
  }, [dispatch]);

  useEffect(()=>{
    initFetch()
  }, [initFetch]);

  return (
    <>
      <ReactMarkdown source={info}/>
    </>
  )
}

function mapStateToProps(state: any) {
  return {
    info: state.info as string,
    dispatch: state.dispatch as Function
  }
}

export default connect(mapStateToProps)(Home);

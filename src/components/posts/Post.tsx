import React, { FormEvent } from "react";
import { connect } from "react-redux";

interface Props {
  text: string,
  content: Array<any>,
  isLoading: boolean,
  error: Error,
  dispatch: Function
}

interface PropsBody {
  content: Array<any>
}

function Body({content}:PropsBody) {
  return(
    <ul className="posts">
      {content.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

function Post({text, content, isLoading, error, dispatch}: Props) {
  React.useLayoutEffect(()=>{
    document.title = 'Post';
  },[])
  const result = isLoading? <h2>"Loading.."</h2>: (<Body content={content}/>);
  return (
    <>
      <h1>JSON Place Holder fetcher</h1>
      <form onSubmit={(event)=>getContent(event, dispatch, text)}>
        <label htmlFor="fname">Area</label>
        <input type="text" id="fname" name="fname" placeholder="posts" value={text} onChange={(event:React.ChangeEvent<HTMLInputElement>) => textChange(event, dispatch)}/>
        <input type="submit" value="Get title data"/>
      </form>
      {error == null ? result: "Error:" + error}
    </>
  )
}

function textChange(event:React.ChangeEvent<HTMLInputElement>, dispatch:Function) {
  dispatch({
    app: "POSTS",
    type: "TEXT",
    text: event.target.value
  })
}

function getContent(event:FormEvent, dispatch:Function, text:string) {
  event.preventDefault();
  dispatch({
    app: "POSTS",
    type: "GET_POSTS_BEGIN",
  })
  fetch(`https://jsonplaceholder.typicode.com/${text}`)
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    throw new Error('Request failed');
  })
  .then(json => {
      dispatch({
        app: "POSTS",
        type: "GET_POSTS_SUCCESS",
        content: json
      })
  })
  .catch(error => {
    dispatch({
      app: "POSTS",
      type: "GET_POSTS_ERROR",
      error: error
    })
  })
}

function mapStateToProps(state: any) {
  return {
    text: state.posts.text as string,
    content: state.posts.content as Array<any>,
    isLoading: state.posts.isLoading as boolean,
    error: state.posts.error as Error,
    dispatch: state.dispatch as Function
  }
}

export default connect(mapStateToProps)(Post);

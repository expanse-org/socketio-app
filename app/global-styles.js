import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    {/*font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;*/}
	font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    {/*font-family: Georgia, Times, 'Times New Roman', serif;*/}
	font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    line-height: 1.5em;
  }
  
  .fancy_title
  {
	font-size: 24px;
	text-align: center;
	margin-bottom:19px;
	color:#138496;
  }
`;

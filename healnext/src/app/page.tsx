import Link from 'next/link';
import '../app/styles.css'
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
export default function Home() {
  return (
    <>
    <head>
    <meta
      name="viewport"
      content="device-width,
    initial-scale=1.0"
    />
    <link rel="shortcut icon" href="mainlogo.png" type="image/x-icon" />
    <title>Healbook: Your Health Data Vault</title>
  </head>

  <body>
    <div id="header">
      <Link href="/">
        <img src="logomain.png" id="logo" alt="logo.png" />
      </Link>
      <LoginLink>
        <button id="login">Log In</button>
      </LoginLink>
    </div>
    <div id="page">
      <div id="box1">
        <h1 id="box1text">
          The best place for all your Healthcare data.<br />
          &nbsp;It is not only convenient but also secure!
        </h1>
        <RegisterLink>
          <button id="signup">Sign up</button>
        </RegisterLink>
      </div>
      <img id="doc" src="Doc.jpg" />
      <div id="box2">
        <img src="medicinescough.webp" id='meds'/>
        <h1 id="box2text">
          Securely store medical records-<br />
          Set personalized medication reminders-<br />
          Connect with healthcare providers-<br />
          Access health data anytime, anywhere-<br />
          Improve medication adherence-<br />
          Enhance personal health outcomes-
        </h1>
      </div>
    </div>
    <div id="footer">
      <a href='https://github.com/Prabhmeetchef/Healbook' target='_blank'><img id='github' src='github.png'/></a>
      <a href='mailto:prabhmeetsinghns1000@gmail.com' target='_blank'><img id='mail' src='mail.jpg'/></a>
      <a href="https://www.linkedin.com/in/harshavardhan-p-787a11202/" target='_blank'><h2 id="ab2">Harshavardhan Srinivas</h2></a>
      <a href="https://www.linkedin.com/in/prabhmeet-singh-11446699w/" target='_blank'><h2 id="ab">Prabhmeet Singh</h2></a>
    </div>
    <div id='healchat'>
      <h1 id='knowbetter'>Want to know us better?</h1>
      <button id='healchatvisit'>Visit our chatbot: <a href='http://167.179.72.153/' target='_blank'><b>Healchat</b></a></button>
    </div>
  </body>
  </>
  );
}

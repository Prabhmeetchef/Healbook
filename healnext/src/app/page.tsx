import '../app/styles.css'
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
      <a href="homepage">
        <img src="logomain.png" id="logo" alt="logo.png" />
      </a>
      <a href="login.html">
        <button id="login">Log In</button>
      </a>
    </div>
    <div id="page">
      <div id="box1">
        <h1 id="box1text">
          The best place for all your Healthcare data.<br />
          &nbsp;It is not only convenient but also secure!
        </h1>
        <a href="signup">
          <button id="signup">Sign up</button>
        </a>
      </div>
      <img id="doc" src="Doc.jpg" />
      <div id="box2">
        <img src="medicinescough.webp" />
        <h1 id="box2text">
          Securely store medical records-<br />
          Set personalized medication reminders-<br />
          Connect with healthcare providers-<br />
          Access health data anytime, anywhere-<br />
          Improve medication adherence-<br />
          Enhance health outcomes-
        </h1>
      </div>
    </div>
    <div id="footer">
      <a href="instagram"><img src="instagram.png" id="gram" /></a>
      <a href="twitter" id="twitter"><img src="twirra.png" id="twitter" /></a>
      <a href="aboutus"><h2 id="ab">About us</h2></a>
      <a href="contactus"><h2 id="contact">Contact us</h2></a>
    </div>
  </body>
  </>
  );
}

import '../login/login.css'
import Image from 'next/image'; // Use Next.js Image for better performance

export default function login(){
  return (
    <div>
      <head>
        <meta
          name="viewport"
          content="device-width,
        initial-scale=1.0"
        />
        <title>login</title>
        <link rel="stylesheet" href="login.css" />
    </head>
      





      <div>
        <Image src="/mainlogowhite.png" id="logo" alt='logo' width={150} height={50} />
        <h1 id="welcome">
            Welcome!
        </h1>
        <Image src="/Doc2.jpg" id="doc2" alt='doctor-img' width={300} height={200}/>
        <div id="box">
            <form id="suform">
        <input type="email" id="email" name="email" required placeholder="Enter email" />
        <br />
        <input type="password" id="password" name="password" required placeholder="Enter password" />
        <br />
        <input type="submit" value="login" />
            </form>
        </div>
        <a><button id="forgotpassword">Forgot Password?</button></a>
      </div>
    </div>
  )
}
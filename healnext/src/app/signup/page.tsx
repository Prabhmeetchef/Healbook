import '../signup/stylesheet2signup.css'
import Head from 'next/head'; // Import Head from Next.js
import Image from 'next/image'; // Use Next.js Image for better performance

export default function Signup() {
  return (
    <div>
      <Head>
        <meta name="viewport" content="device-width, initial-scale=1.0" />
        <title>Sign up for your personal Healbook</title>
        <link rel="stylesheet" href="/stylesheet2signup.css" />
      </Head>

      <div id="container"> {/* Add a container for styling */}
        <Image src="/mainlogowhite.png" id="logo" alt="Main Logo" width={150} height={50} />
        
        <h1 id="hello">Hello,</h1>
        <h1 id="welcome">Welcome!</h1>
        
        <Image src="/Doc2.jpg" id="doc2" alt="Document Illustration" width={300} height={200} />
        
        <div id="box">
          <h1 id="signup">Sign up</h1>
          <form id="suform">
            <input type="text" id="name" name="name" required placeholder="Name" />
            <br />
            <input type="email" id="email" name="email" required placeholder="Enter email" />
            <br />
            <input type="text" id="country" name="country" required placeholder="Country" />
            <br />
            <input type="text" id="city" name="city" required placeholder="City" />
            <br />
            <input type="password" id="password" name="password" required placeholder="Enter password" />
            <br />
            <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Re-enter password" />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

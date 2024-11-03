import '../dashboard/dashboard.css'
export default function dashboard(){
    return(
    <div className='bg-[#0cc0df] w-full min-h-screen h-full'>
    <div id='head'>
    <meta
      name="viewport"
      content="device-width,
    initial-scale=1.0"
    />
    <link rel="shortcut icon" href="mainlogo.png" type="image/x-icon" />
    <title>Healbook: Your Health Data Vault</title>
    </div>
    <div>
    <div id="header" className="w-full bg-white min-h-[6rem] shadow flex justify-between items-center px-4">
        <a href="/" className="w-1/6 ml-2 sm:ml-4">
        <img src="logomainwhite.png" id="logo" alt="logo"/>
        </a>
        <a href="profile" className="inline-flex mr-2 sm:mr-4"><img src="10061438.png" id="pfp" alt="profile" className="w-10"/></a>
    </div>
    <form className='space-x-2 absolute top-40 left-1/4'>
    <input id='searchdocordiag' placeholder='Enter Doctor name or Diagnosis' className='w-72 h-12 shadow rounded-2xl p-2'></input>
    <button type="submit" className='font-bold text-black bg-white w-20 h-8 shadow rounded-2xl hover:text-white hover:bg-black transition-colors'>submit</button>
    </form>
    <button id='Sort' className='font-bold text-white bg-black w-20 h-8 shadow rounded-2xl hover:text-black hover:bg-white transition-colors absolute top-40 right-1/4 mt-2'>Sort</button>
    <button id='Sort' className='font-bold text-white bg-black w-60 h-12 shadow rounded-2xl hover:text-black hover:bg-white transition-colors absolute top-96 right-1/4 mt-60'> + Create Session</button>
    <div className='w-1/2 min-h-96 bg-white relative left-1/4 top-32'>
        
    </div>
    </div>
    </div>
    )
}
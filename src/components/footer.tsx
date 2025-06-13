import { useNavigate } from "react-router-dom"

function Footer(){
    const navigate = useNavigate()

    return(
        <main className=" text-white"> 
        {/* blend */}
        <div className="bg-[#020303e9] h-[20px]"></div>
        <footer className=" text-center bg-linear-to-b from-[#020303c1] via-[#020303d9] to-[#020303e9] text-white h-[350px] pt-8 flex justify-around">
        <div
        onClick={()=>navigate('/terms')}
            className="w-80 h-80 bg-cover hidden lg:block rounded-xl cursor-pointer"
            style={{
                backgroundImage: "url('https://raw.githubusercontent.com/GIGIsOtherStuff/mainWebMedia/main/AppImages/myProjectsImgs/bloggleLogo.png')"}}>
                </div>
                <div  className="w-80 h-80 pt-8 text-[13px]/[50px] sm:text-[15px] ">
                <ul className="">
                    <li className="underline">Contact us</li>
                    <li>blogglenews@fake.com</li>
                    <li>bloggle.support@fake.com</li>
                    <li>bloggle.com</li>
                </ul>
                </div>
                <div  className="w-80 h-80 pt-8 text-[15px]/[50px]">
                <ul>
        <li className="underline" >Socials</li>
        <a href='https://www.linkedin.com/in/dobre-robert-03653b331/' target='_blank'>
        <li className="hover:underline text-blue-300 ">LinkedIn</li>
        </a>
        <a href='https://github.com/GIGI-CodeAce' target='_blank'>
        <li className="hover:underline  hover:text-gray-500 text-black">Github </li>
        </a>
        <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=gigicodeace@gmail.com&su=Inquiry&body=Hello," 
            target="_blank" rel="noopener noreferrer"
            className="hover:underline cursor-pointer"
                >Gmail</a>
            </ul>
            </div>
        </footer>
    <h1 className="bg-[#020303e9] text-white text-sm">v1.4.2</h1>
        </main>
    )
}


export default Footer
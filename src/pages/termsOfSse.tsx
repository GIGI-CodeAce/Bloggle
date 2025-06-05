import { useNavigate } from "react-router-dom"

function TermsOfUsePage(){
    const navigate = useNavigate()
    const ruleTitleStyle = 'pl-5 font-bold sm:text-3xl text-xl my-3'
    const buttonStyle = 'bg-black hover:bg-gray-800 font-bold transition-all m-1 cursor-pointer hover:rounded-xl py-2 text-white px-3 rounded-lg mb-7 active:text-green-400'

    return(
            <main className="mt-5 max-w-2xl mx-auto text-xl">
            <h1 className="sm:text-5xl text-3xl text-center font-bold">Terms of Service</h1>

            <p className="sm:px-20 my-4 px-10 text-center">Welcome to Bloggle! By using our service, you agree to the following terms regarding the content you post:</p>

            <div className="pl-5 mt-7">
                            <h2 className={ruleTitleStyle}>1. User Content Responsibility</h2>
            <p className="p-2">You are solely responsible for the content you create and share on Bloggle. When posting, you agree not to submit any content that is:</p>
            <ul className="p-2">
                <li>Offensive, hateful, discriminatory, or harassing based on race, gender, religion, nationality, sexual orientation, disability, or any other protected characteristic.</li>
                <li>Violent, threatening, or promoting harm to yourself or others.</li>
                <li>Illegal, infringing on others’ rights, or violating any laws or regulations.</li>
                <li>Spammy, deceptive, or misleading in nature.</li>
                <li>Contains viruses, malware, or any harmful code.</li>
            </ul>
            <h2 className={ruleTitleStyle}>2. Accuracy of Information</h2>
            <p className="p-2">
                You agree not to post content that intentionally or unintentionally spreads misleading, false, or deceptive information,
                 including but not limited to fake news, rumors, or unverified claims that could cause harm or confusion to others.
            </p>

            <h2 className={ruleTitleStyle}>3. No Harmful or Unintended Content</h2>
            <p className="p-2">You agree that your posts will not include unintended or harmful content, such as:</p>
            <ul className="p-2">
                <li>Private or sensitive information about yourself or others.</li>
                <li>Content that may incite panic, misinformation, or harm public safety.</li>
            </ul>

            <h2 className={ruleTitleStyle}>4. Moderation and Enforcement</h2>
            <p className="p-2">Bloggle reserves the right to review, moderate, and remove any content that violates these terms without prior notice.</p>

            <h2 className={ruleTitleStyle}>5. Liability</h2>
            <p className="p-2">Bloggle is not responsible for user-generated content. However,
             we strive to provide a safe and positive environment and rely on you to help maintain this standard.</p>
             <div className="text-center">
                <h1 className="mt-11 text-[16px]">I understand and return to</h1>
                <button onClick={()=> navigate('/')} className={buttonStyle}>
                  HomePage</button>
                  <button className={buttonStyle} onClick={()=> navigate('/create')}>CreatePage</button></div>
            </div>
            </main>
    )
}

export default TermsOfUsePage
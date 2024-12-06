
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Category from '../components/Category';
import Footer from '../components/Footer';
import UserContext from "../context/userContext";
import '../styles/PoliciesPageBuyer.scss';

function PoliciesPageBuyer() {
    const { userType, setUserType } = useContext(UserContext);
    const { userInfo, setUserInfo } = useContext(UserContext);
    useEffect(() => {
        const stored_userType = localStorage.getItem("userType");
        if (stored_userType) {
          setUserType(stored_userType);
        }
      }, [setUserType]);
    
      console.log("id: ", localStorage.getItem("id"));
                    console.log("type: ", localStorage.getItem("userType"));
    return (
        <div className="main-container">

                <Header />

            <div className="home-container">
                <Category />

                
            </div> 
        
            <div className="content-container">
                <div className="title">Policies</div>
                <div className="subtitle">Prohibited items</div>
                <div className="content">
                    T-2Hands strictly prohibits the listing or sale of any items included in the list of prohibited items. If a Seller lists a prohibited item, it will be considered a violation of our Terms of Service regardless of whether the Seller’s actions were intentional. T-2Hands reserves the right to remove any listings it deems to be in violation or inappropriate at its sole discretion, and may also cancel any related transactions, including terminating or suspending accounts.<br/>
                    You are not allowed to use T-2Hands in connection with any products, services, transactions, or activities that:<br/>
                </div>
                <div className="content-list">
                    •&ensp;Violate any government laws or regulations, promote, or facilitate such actions by third parties;<br/>
                    •&ensp;Engage in fraud, deceit, dishonesty, or extortion;<br/>
                    •&ensp;Threaten or damage T-2Hands's reputation;<br/>
                    •&ensp;Violate the terms of any bank, card, or cryptocurrency network;<br/>
                    •&ensp;Cause or create significant risks of chargebacks, fines, damages, or other liabilities.
                </div>
                <div className="content">
                    The list of prohibited items may be updated at T-2Hands's discretion. Examples within certain categories may also be expanded to enhance communication and user experience.<br/> 
                    T-2Hands must not be used to sell any of the following products or services:
                </div>  
                <div className="content-list">
                    1. Anything Illegal.<br/>
                    2. Drugs, including but not limited to:
                    <div className="content-list">
                        •&ensp;Illegal drugs or narcotics;<br/>
                        •&ensp;Prescription medications or devices, pharmaceuticals, or medicines dispensed without a prescription or other legal compliance;<br/>
                        •&ensp;Products, tools, or services intended for creating or consuming drugs;<br/>
                        •&ensp;Drug-growing components (e.g., cannabis seeds).
                    </div>
                    3. Food, Beverages, and Homemade Consumables, including:
                    <div className="content-list">
                        •&ensp;Items claiming extraordinary health benefits like "anti-aging" or "cancer protection";<br/>
                        •&ensp;Listings making false health claims or misusing medical terms (e.g., "virus," "epidemic");<br/>
                        •&ensp;Items containing cannabidiol (CBD).
                    </div>
                    4. Inflated-Priced Items, intended to profit from disasters or tragedies (e.g., "Coronavirus outbreak," "Vietnam Central floods").<br/>
                    5. Stolen Goods:
                    <div className="content-list">
                        •&ensp;Note: If a purchased item is reported as stolen, the victim or another party may request its return, and it may be confiscated as per regulations.
                    </div>
                    6. Counterfeit Goods or items infringing third-party intellectual property rights:
                    <div className="content-list">
                        •&ensp;Listings of non-branded, counterfeit, imitation, or replicated goods;<br/>
                        •&ensp;Items violating copyright, including crafts or goods featuring copyrighted characters, brand logos, etc.;<br/>
                        •&ensp;Note: Branded products must include serial numbers or receipts when listed.
                    </div>
                    7. Weapons, including:
                    <div className="content-list">
                        •&ensp;Firearms and firearm parts;<br/>
                        •&ensp;Firearms and firearm parts;<br/>
                        •&ensp;Knives, such as switchblades, butterfly knives, disguised knives, or those undetectable by metal detectors;<br/>
                        •&ensp;Explosives or military ordnance;<br/>
                        •&ensp;Self-defense weapons.
                    </div>
                    8. Alcohol<br/>
                    9. Tobacco Products:
                    <div className="content-list">
                        •&ensp;Cigarettes;<br/>
                        •&ensp;Electronic cigarettes, e-hookahs, or other nicotine-related vaping devices;<br/>
                        •&ensp;Non-nicotine vaping liquids.
                    </div>
                    10. Identity Theft Tools, such as account login details or access codes.<br/>
                    11. Items Not Owned by You:
                    <div className="content-list">
                        •&ensp;Products sold via dropshipping;<br/>
                        •&ensp;Advertisements or listings for wanted items;<br/>
                        •&ensp;Items not in your possession that are on order.
                    </div>
                    12. Gift Cards<br/>
                    13. Hazardous Items, such as flammable or combustible liquids:
                    <div className="content-list">
                        •&ensp;Note: Flammable items or those requiring special handling must be transported personally.
                    </div>
                    14. Products to Circumvent Copyright Protection, such as "mod chips" to decrypt gaming devices for unauthorized gameplay.<br/>
                    15. Age-Restricted Products or items requiring legal approval, seller/buyer registration, or licensing to sell.<br/>
                    16. Gambling, including lotteries and unclear transactions.<br/>
                    17. Financial Products and Services, such as:
                    <div className="content-list">
                        •&ensp;Bonds, securities, warranties, and insurance;<br/>
                        •&ensp;All forms of circulating currency except collectibles;<br/>
                        •&ensp;Precious metals, including bars or ingots;<br/>
                        •&ensp;Buying and selling gift cards or prepaid cards.
                    </div>
                    18. Living Animals or animal parts (e.g., ivory or shark fins).<br/>
                    19. Products Containing Computer Viruses, Malware, or Spyware.<br/>
                    20. Digital Goods, such as:
                    <div className="content-list">
                        •&ensp;E-books, PDFs, user-generated content (UGC), or online gaming items;<br/>
                        •&ensp;Exception: Digital gaming items listed through Oreka.
                    </div>
                    21. Human Beings, human body parts, organs, cells, blood, bodily fluids, and contaminated human items such as used underwear.<br/>
                    22. Obscene Products:
                    <div className="content-list">
                        •&ensp;Pornographic items, such as sex toys and fetishes.
                    </div>
                    23. Violent Products:
                    <div className="content-list">
                        •&ensp;Items, listings, photos, or content that promote or glorify hatred, violence, racism, or discrimination (as determined by us).
                    </div>
                </div>
                <div className="subtitle">Communication policy</div>
                <div className="content">
                    This policy describes how T-2Hands communicates with you electronically. We may revise this policy at any time by posting a revised version on our website. The revised version will take effect at the time we post it.<br/><br/>
                    Hardware and Software Requirements<br/>
                    To access and retain electronic communications, you will need the following hardware and software:
                    <div className="content-list">
                        •&ensp;A computer or mobile device with an Internet connection;<br/>
                        •&ensp;A current web browser with 128-bit encryption (e.g., Internet Explorer version 6.0 or higher, Firefox version 2.0 or higher, Chrome version 3.0 or higher, or Safari version 3.0 or higher) with cookies enabled;<br/>
                        •&ensp;Adobe Acrobat Reader version 8.0 or higher to open documents in .pdf format;<br/>
                        •&ensp;A valid email address (the email address you have on file with T-2Hands); and sufficient storage space to save past emails or a printer installed to print them.
                    </div>
                    <br/>
                    We will notify you if there are any significant changes to the hardware or software required to receive electronic communications from T-2Hands. By agreeing, you confirm that you have access to the necessary equipment and can receive, open, and print or download copies of any notifications for your records. You may print or save a copy of this notice for your records, as it may be modified at a later date.
                </div>
                <div className="subtitle">Safety guidelines</div>
                <div className="content">
                    We are committed to providing a safe, secure, and enjoyable marketplace for buyers and sellers. If a transaction encounters issues, someone attempts to scam others, or you notice any prohibited products, please message us at therecordnight202@gmail.com, and we will be happy to assist.<br/>
                    Online Safety:
                    <div className="content-list">
                        •&ensp;Do not share your personal contact information, such as phone numbers or email addresses, with anyone. We cannot assist with interactions outside the T-2Hands app or website.<br/>
                        •&ensp;Communicate with your buyer or seller through our in-app/web messaging feature to ensure a record of the conversation.<br/>
                        •&ensp;Use credit cards instead of debit cards for online purchases. Credit cards generally provide better security features and purchase protection, and your credit provider is more likely to offer refunds for fraudulent transactions.<br/>
                        •&ensp;Never share your T-2Hands account or password with anyone, including third-party websites. We will never ask for your password.<br/>
                        •&ensp;Do not click on links sent via email to log in to your T-2Hands account. The safest way to log in to your account is to go directly to T-2Hands and log in there.<br/>
                        •&ensp;Access our official website or app directly.<br/>
                        •&ensp;If you allow your children to use your account, closely monitor their purchases and interactions on T-2Hands.<br/>
                        •&ensp;Before making an online purchase, carefully read the listing and view the photos. Check reviews left about the seller. Ask the seller any questions before making a payment.<br/>
                        •&ensp;Report any problematic or prohibited items.
                    </div>
                    Financial Safety:
                    <div className="content-list">
                        •&ensp;Never share your personal financial (payment) information or contact details with other users, especially if they request it outside our platform.<br/>
                        •&ensp;To protect yourself from scams, ensure all transactions are conducted through T-2Hands platforms. We do not support or safeguard transactions where payments are made outside our website.<br/>
                        •&ensp;Avoid sending money to individuals you do not know, in situations that seem "too good to be true," or to resolve an "urgent" situation involving friends or family. This may include requests to review an item you haven’t received.<br/>
                        •&ensp;Regularly check your financial statements for any suspicious activities. Contact T-2Hands immediately if you notice any unauthorized charges.<br/>
                        •&ensp;Thoroughly inspect the item upon delivery. Buyers have 3 days from the delivery date to request a return. After 3 days or once the buyer has rated the transaction, all sales are final.<br/>
                        •&ensp;Inspect your item carefully before rating the seller, especially for expensive or electronic items.
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default PoliciesPageBuyer;
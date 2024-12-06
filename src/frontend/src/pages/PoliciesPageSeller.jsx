
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Category from '../components/Category';
import Footer from '../components/Footer';
import UserContext from "../context/userContext";
import '../styles/PoliciesPageSeller.scss';

function PoliciesPageSeller() {
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
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default PoliciesPageSeller;
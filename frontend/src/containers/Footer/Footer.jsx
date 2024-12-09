import { FaHeart } from 'react-icons/fa';

const Footer = () => {
   return (
      <>
         <footer className="bg-custom-blue p-2">
            <div className="container py-4 flex flex-col lg:flex-row justify-center lg:justify-between items-center">

               <div className="font-logo text-custom-lightBlue text-2xl sm:text-3xl">Plan My Trip</div>
               <div className="flex flex-col">
                  <p className="text-center lg:text-right text-white pt-2 lg:pt-0 text-sm lg:text-base">Legal Notice | Privacy Policy | Cookies Policy</p>
                  <p className="text-center lg:text-right text-white mt-1 text-sm lg:text-base">© 2024 - Plan My Trip | All rights reserved • Made with <FaHeart className="inline-block text-custom-lightBlue" /> by Tamara Vandebroeck</p>
               </div>
            </div>
         </footer>
      </>
   );
};

export default Footer;
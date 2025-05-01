import { useSiteConfig } from '../contexts/SiteConfigContext';

const Footer = () => {
  const { config } = useSiteConfig();

  return (
    <footer className="bg-primary-dark pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="md:flex md:justify-around border-b border-gray-50-800/95 pb-10">
          {/* Main Office */}
          <div className="md:w-1/3">
            <h3 className="text-lg font-bold text-white mb-4 uppercase">Main Office</h3>
            <div className="text-gray-400 mb-5">
              <div className="w-full flex m-2 items-start">
                <div className="flex items-center">
                  <i className="ri-map-pin-fill text-xl pr-2"></i>
                </div>
                <div className="ml-1">
                  <span className="text-base ml-2">{config.address}</span>
                </div>
              </div>
            </div>
            <div className="text-gray-400 mb-5">
              <a href={`tel:${config.contactPhone}`} className="flex items-center m-2">
                <i className="ri-phone-fill text-2xl pr-2"></i>
                <p className="ml-2 text-base">{config.contactPhone}</p>
              </a>
            </div>
            <div className="text-gray-400">
              <a href={`mailto:${config.contactEmail}`} className="flex items-center m-2">
                <i className="ri-mail-send-fill text-2xl pr-2"></i>
                <p className="ml-2 text-base">{config.contactEmail}</p>
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div className="md:w-1/3 mt-8 md:mt-0">
            <h3 className="text-lg font-bold text-white mb-4 uppercase">Useful Links</h3>
            <ul className="list-none">
              <li className="mb-2">
                <a className="text-gray-400 hover:text-white" href="/about">About Us</a>
              </li>
              {/* <li className="mb-2">
                <a className="text-gray-400 hover:text-white" href="/programs">Our Programs</a>
              </li> */}
              <li className="mb-2">
                <a className="text-gray-400 hover:text-white" href="/volunteer">Get Involved</a>
              </li>
              <li className="mb-2">
                <a className="text-gray-400 hover:text-white" href="https://paystack.com/pay/ichad-donation">Donate</a>
              </li>
              <li className="mb-2">
                <a className="text-gray-400 hover:text-white" href={`mailto:${config.contactEmail}`}>Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Our Hubs */}
          <div className="md:w-1/3 mt-8 md:mt-0">
            <h3 className="text-lg font-bold text-white mb-4 uppercase">Our Hubs</h3>
            <ul className="list-none">
              <li className="text-gray-400 mb-2">ICHAD in OAU - Obafemi Awolowo University</li>
              <li className="text-gray-400 mb-2">ICHAD in Unilag - University of Lagos</li>
              <li className="text-gray-400 mb-2">ICHAD in Yabatech - Yaba College of Technology</li>
              <li className="text-gray-400 mb-2">ICHAD Youth Community (IYC)</li>
            </ul>

            {/* Social Media Links */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-white mb-4 uppercase">Follow Us</h3>
              <div className="flex gap-4">
                {config.facebook && (
                  <a href={`https://www.facebook.com/${config.facebook}`} className="text-gray-400 hover:text-white">
                    <i className="ri-facebook-box-fill text-3xl"></i>
                  </a>
                )}
                {config.tiktok && (
                  <a href={`https://www.tiktok.com/${config.tiktok}`} className="text-gray-400 hover:text-white">
                    <i className="ri-tiktok-fill text-3xl"></i>
                  </a>
                )}
                {config.instagram && (
                  <a href={`https://www.instagram.com/${config.instagram}`} className="text-gray-400 hover:text-white">
                    <i className="ri-instagram-fill text-3xl"></i>
                  </a>
                )}
                {config.linkedin && (
                  <a href={`https://www.linkedin.com/company/${config.linkedin}`} className="text-gray-400 hover:text-white">
                    <i className="ri-linkedin-box-fill text-3xl"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">
            <span className="font-bold text-white">{config.siteName}</span> - Empowering Youth for a Drug-Free Future
          </p>
          <p className="text-gray-400">
            © {new Date().getFullYear()} {config.siteName}. All Rights Reserved. <br />
            Designed by <a href="https://techifice.com" className="text-white hover:text-gray-300">Techifice</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
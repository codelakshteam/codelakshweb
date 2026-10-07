import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" className="logo">
              <Image className="logo-img-dark" src="/logo-white.png" alt="CodeLaksh logo" width={36} height={29} />
              <Image className="logo-img-light" src="/logo.png" alt="" width={36} height={31} />
              <span>CodeLaksh</span>
            </a>
            <p>
              Premier AI Solutions & Software Development Company in India. Building tomorrow's
              technology today.
            </p>
          </div>
          <div className="footer-links">
            <h4>Services</h4>
            <a href="/#services">AI Chatbots</a>
            <a href="/#services">Web Development</a>
            <a href="/#services">App Development</a>
            <a href="/#services">Machine Learning</a>
            <a href="/erp">CodeLaksh ERP</a>
            <a href="/#kidodom">Kidodom</a>
          </div>
          <div className="footer-links">
            <h4>Company</h4>
            <a href="/#about">About Us</a>
            <a href="/#portfolio">Portfolio</a>
            <a href="/#contact">Contact</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
          <div className="footer-links">
            <h4>Contact</h4>
            <p>
              <i className="fas fa-map-marker-alt" aria-hidden="true"></i> Sangram Nagar, Aurangabad
            </p>
            <p>
              <i className="fas fa-phone" aria-hidden="true"></i> +91-9834684866
            </p>
            <p>
              <i className="fas fa-envelope" aria-hidden="true"></i> codelaksh@gmail.com
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CodeLaksh. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

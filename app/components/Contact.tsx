import { emailUrl, whatsappUrl } from "../portfolio-config";

export function Contact() {
  return (
    <section className="copy-contact" id="contact">
      <div className="shell copy-contact-inner">
        <h2 data-reveal="up">Contact</h2>
        <div className="copy-contact-actions" data-reveal="up" data-reveal-delay="1">
          <a className="copy-contact-button copy-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
            <span><img src="/icons/whatsapp.png" alt="" width="25" height="25" /></span>
            <strong>+54 11 5931-4083</strong>
            <small>Open WhatsApp ↗</small>
          </a>
          <a className="copy-contact-button copy-email" href={emailUrl}>
            <span><img src="/icons/email.png" alt="" width="25" height="25" /></span>
            <strong>sotemilagros@gmail.com</strong>
            <small>Write an email ↗</small>
          </a>
        </div>
      </div>
    </section>
  );
}

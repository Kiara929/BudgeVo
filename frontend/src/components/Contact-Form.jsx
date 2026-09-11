import '../css/Contact-Form.css';

function ContactForm() {
    return (
        <>
        <form className="contact-form" action="" method="POST">
            <h2>Send us a message</h2>
            <div className="form-group">
                <input type="text" name="name" placeholder="Your Name" required />
                <input type="email" name="email" placeholder="Email" required />
            </div>
            <input type="text" name="subject" placeholder="Subject" required />
            <textarea name="message" placeholder="Message" required></textarea>
            <button type="submit">Send Message</button>
        </form>
        </>
    );
}

export default ContactForm;
import ContactUsForm from "./ContactForm"
import Footer from "./Footer"

const ContactUs = () => {
    // const contactMethods = [
    //     {
    //         icon: 'ti-mobile',
    //         title: 'Call Us',
    //         detail: '+91 7337572543',
    //     },
    //     {
    //         icon: 'ti-location-pin',
    //         title: 'Visit Us',
    //         detail: ' Office #407, 4th Floor, Jain Sadguru Image Ayyappa Society, Madhapur, Hyderabad, Telangana 500081'
    //   },
    //     {
    //         icon: 'ti-email',
    //         title: 'Mail Us',
    //         detail: 'hr@designcareermetrics.com',
    //     },
    //     {
    //         icon: 'ti-headphone-alt',
    //         title: 'Live Chat',
    //         detail: 'Chat with Us 24/7',
    //     },
    // ];
    return <>
        <div className="main pt-100">

            {/* <!--header section start--> */}
            <section class="hero-section ptb-100 gradient-overlay"
                style={{ background: "url('img/header-bg-5.jpg') no-repeat center center / cover" }}>
                <div class="hero-bottom-shape-two" style={{ background: "url('img/hero-bottom-shape.svg') no-repeat bottom center" }}></div>
                <div class="container mt-5">
                    <div class="row justify-content-center">
                        <div class="col-md-8 col-lg-7">
                            <div class="page-header-content text-white text-center pt-sm-5 pt-md-5 pt-lg-0">
                                <h1 class="text-white mb-0">Contact Us</h1>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--header section end--> */}

            {/* <!--contact us promo start--> */}
            {/* <section className="contact-us-promo pt-100">
                <div className="container">
                    <div className="row">
                        {contactMethods.map((method, index) => (
                            <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
                                <div className="card single-promo-card single-promo-hover text-center shadow-sm" style={{height:'285px'}}>
                                    <div className="card-body py-5">
                                        <div className="pb-2">
                                            <span className={`${method.icon} icon-sm color-secondary`}></span>
                                        </div>
                                        <div>
                                            <h5 className="mb-0">{method.title}</h5>
                                            <p className="text-muted mb-0">{method.detail}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}
            {/* <!--contact us promo end--> */}

            {/* <!--contact us section start--> */}
            <section class="contact-us-section ptb-100">
                <div class="container">
                    <div class="row justify-content-around">
                        <div class="col-md-6">
                            <div class="contact-us-form gray-light-bg rounded p-5">
                                <h4>Ready to get started?</h4>
                                <ContactUsForm />
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="contact-us-content">
                                <h2>Looking for a excellent Business idea?</h2>
                                <p class="lead">Seamlessly deliver pandemic e-services and next-generation initiatives.</p>

                                <button class="btn outline-btn align-items-center">Get Directions <span class="ti-arrow-right pl-2"></span></button>

                                <hr class="my-5" />

                                <h5>Our Headquarters</h5>
                                <address>

                                    Office #407, 4th Floor, Jain Sadguru Image's Capital Park,  <br />Ayyappa Society, Madhapur, Hyderabad, Telangana 500081.
                                </address>
                                <br />
                                <span>Phone: +91 7337572543</span> <br />
                                <span>Email: <a href="mailto:hr@designcareermetrics.com" class="link-color">hr@designcareermetrics.com</a></span>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--contact us section end--> */}

            {/* <!--google map block start--> */}
             <div style={{ width: '100%' }}>

  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2660901615855!2d78.38363917414267!3d17.44697380108786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb910838be5b35%3A0xfa8c53166a450046!2sDesign%20Career%20Metrics%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1758168750472!5m2!1sen!2sin"
    width="100%"
    height="450"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div> 

            {/* <!--google map block end--> */}


        </div>
        


    </>
}
export default ContactUs
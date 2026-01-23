import Footer from "./Footer"

function AppDownloadButtons() {
  return (
    <div style={{ padding: '20px', background: 'linear-gradient(135deg, #2c3e50, #1a1a1a)', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ color: 'white', marginBottom: '30px', textAlign: 'center', fontWeight: '600' }}>Download Our App Now</h2>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {/* Google Play Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'black',
          borderRadius: '10px',
          padding: '12px 20px',
          width: '280px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            marginRight: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>
            
                <img src="/img/playstore-svgrepo-com.svg" alt="" height="35px" />
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>GET IT ON</div>
            <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Google Play</div>
          </div>
        </div>

        {/* App Store Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'black',
          borderRadius: '10px',
          padding: '12px 20px',
          width: '280px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            marginRight: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>
            <svg viewBox="0 0 24 24" width="40" height="40">
              <path fill="#FFFFFF" d="M17.05 12.04C17.03 9.53 19.18 8.05 19.25 8C17.95 6.06 15.87 5.85 15.1 5.83C13.55 5.66 12.06 6.9 11.24 6.9C10.41 6.9 9.17 5.84 7.82 5.86C6.08 5.89 4.53 6.88 3.74 8.47C1.98 11.75 3.34 16.64 5.06 19.14C5.87 20.37 6.83 21.75 8.04 21.7C9.23 21.66 9.69 20.95 11.16 20.95C12.62 20.95 13.05 21.7 14.3 21.68C15.55 21.66 16.4 20.43 17.2 19.19C18.13 17.82 18.54 16.48 18.56 16.41C18.52 16.39 17.07 15.71 17.05 12.04Z"/>
              <path fill="#FFFFFF" d="M14.82 4.16C15.44 3.36 15.87 2.25 15.72 1.14C14.76 1.18 13.61 1.75 12.95 2.55C12.38 3.24 11.85 4.38 12.02 5.45C13.08 5.53 14.14 4.93 14.82 4.16Z"/>
            </svg>
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>DOWNLOAD ON THE</div>
            <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>App Store</div>
          </div>
        </div>
      </div>
      
      <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '40px', textAlign: 'center', maxWidth: '500px' }}>
        Get access to exclusive content, personalized learning paths, and career advancement tools with our mobile application.
      </p>
    </div>
  );
}

// How to use the component:
// Simply include <AppDownloadButtons /> in your React component tree
const GetApp=()=>{
    return<>
    <div class="main pt-100">

    <section class="hero-section ptb-100 gradient-overlay"
             style={{background: "url('img/header-bg-5.jpg')no-repeat center center / cover"}}>
        <div class="hero-bottom-shape-two" style={{background: "url('img/hero-bottom-shape.svg')no-repeat bottom center"}}></div>
        <div class="container mt-5">
            <div class="row align-items-center justify-content-center">
                <div class="col-md-9 col-lg-7">
                    <div class="page-header-content text-white text-center pt-sm-5 pt-md-5 pt-lg-0">
                        <h1 class="text-white mb-0">Download DCM App</h1>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section id="download" class="video-promo py-5">
        <div class="container">
            <div class="row align-items-center justify-content-between">
                
                <div class="col-md-7">
                    <div class="download-content">
                        <h2>Download App Manage Your Business More Faster</h2>
                        <p>Objectively deliver professional value with diverse web-readiness.
                            Collaboratively transition wireless customer service without goal-oriented catalysts for
                            change. Collaboratively.</p>
                        <p>Progressively disseminate sustainable "outside the box" thinking before end-to-end ideas.
                            Dramatically disintermediate resource maximizing action. Holisticly foster extensible users
                            through clicks-and-mortar total linkage. Energistically customize functional scenarios
                            vis-a-vis focused metrics.</p>

                        <ul class="list-inline">
                            <li class="list-inline-item">
                                <div class="text-center single-counter p-4">
                                    <span class="ti-medall-alt icon-md color-secondary"></span>
                                    <h3 class="mb-0">20</h3>
                                    <p>Happy Client</p>
                                </div>
                            </li>
                            <li class="list-inline-item">
                                <div class="text-center single-counter p-4">
                                    <span class="ti-headphone-alt icon-md color-secondary"></span>
                                    <h3 class="mb-0">20</h3>
                                    <p>Live Support</p>
                                </div>
                            </li>
                            <li class="list-inline-item">
                                <div class="text-center single-counter p-4">
                                    <span class="ti-cup icon-md color-secondary"></span>
                                    <h3 class="mb-0">5</h3>
                                    <p>Win Award</p>
                                </div>
                            </li>
                        </ul>

                        
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="download-img mt-lg-0 mt-md-0 mt-sm-5">
                        <img src="/img/downloaddesign.png" alt="download" class="img-fluid"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <AppDownloadButtons/>



</div>

    </>
}
export default GetApp
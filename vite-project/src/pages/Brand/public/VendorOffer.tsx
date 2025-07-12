import '../../../assets/css/pages/vendor/VendorOffer.css'
import {Link} from "react-router-dom";
import {useEffect} from "react";

import img1 from '../../../assets/img/VendorOffer/img1.png'
import img2 from '../../../assets/img/VendorOffer/img2.png'
import img3 from '../../../assets/img/VendorOffer/img3.png'

const VendorOffer = () => {

    useEffect(() => {

    })

    return (
        <div className="vendor-container">
            <div className="vendor-content">
                <h2>WHY IS LOLI SHOPPING?</h2>
                <div className="vendor-banner-zone">
                    <div className={'vendor-banner-card showUpEffect'}
                         style={{animationFillMode: 'forwards', animationDelay: '0s'}}>
                        <img style={{width: '40%', borderRadius: '50%'}} src={img1} alt={'thumbnail'}/>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}>
                            <p style={{
                                fontSize: '20px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: '#025f53',
                                margin:'5px 0'
                            }}>NO PAYING ANY TAX FROM VENDOR</p>
                            <p style={{margin:'5px 0'}}>(for vendor in country)</p>
                        </div>
                    </div>
                    <div className="vendor-banner-card showUpEffect"
                         style={{animationFillMode: 'forwards', animationDelay: '0.5s'}}>
                        <img style={{width: '40%', borderRadius: '50%'}} src={img2} alt={'thumbnail'}/>
                        <p style={{
                            fontSize: '20px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: '#c12307'
                        }}>FULL SUPPORT FOR NEW VENDOR</p>
                    </div>
                    <div className="vendor-banner-card showUpEffect"
                         style={{animationFillMode: 'forwards', animationDelay: '1s'}}>
                        <img style={{width: '40%', borderRadius: '50%'}} src={img3} alt={'thumbnail'}/>
                        <p style={{
                            fontSize: '20px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: 'var(--bg-color'
                        }}>MORE CAMPAIGN PROMOTION INCREASE x20 REVENUE </p>
                    </div>
                </div>
                <div className="vendor-signup-zone">
                    <Link to={'/register-new-vendor'}>
                        <img src={''} alt={'thumbnail'}/>
                    </Link>
                </div>
                <div className="vendor-brands-linked-zone">
                    <div className={'brands-linked-list'}></div>
                    <div className={'brands-linked-list'}></div>
                    <div className={'brands-linked-list'}></div>
                </div>
            </div>
        </div>
    )
}
export default VendorOffer;
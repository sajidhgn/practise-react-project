import React from 'react';

const Footer =()=>{

    const crdate = new Date().getFullYear();
    
    return(
        <React.Fragment>
       
        <footer className="sticky-footer bg-white">
        <div className="container my-auto">
            <div className="copyright text-center my-auto">
                <span> &copy; {crdate} All Rights Reserved.</span>
            </div>
        </div>
    </footer>
    </React.Fragment>
    )


}

export default Footer;
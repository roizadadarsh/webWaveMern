import React from 'react'
import { useAuth } from '../store/auth'

const Services = () => {
  const {servicesData} = useAuth();
  return (
    <section className='section-services'>
      <div className="container1">
        <h1 className="main-heading1">Services</h1>
      </div>
      
      <div className="container grid1 grid-three-cols">
  {
    Array.isArray(servicesData) && servicesData.length > 0 ? (
      servicesData.map((element, index) => {
        const { provider, price, service, description } = element;
        return (
          <div className="card1" key={index}>
            <div className="card1-img">
              <img src="/images/design.png" alt="our services page" width={200} />
            </div>
            <div className="card1-details">
              <div className="grid grid-two-cols">
                <p>{provider}</p>
                <p>{price}</p>
              </div>
              <h2>{service}</h2>
              <p>{description}</p>
            </div>
          </div>
        );
      })
    ) : (
      <p>No services data available</p>
    )
  }
</div>
    </section>
  )
}

export default Services

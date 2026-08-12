import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const TestimonialsSection = () => {
  return (
    <section className='bg-slate-50 py-16 px-5 sm:px-8 lg:px-16'>
      <div className='max-w-5xl mx-auto text-center'>
        <span className='inline-block text-xs font-semibold tracking-wide text-blue-600 bg-blue-100/60 px-3 py-1 rounded-full mb-3'>
          TESTIMONIALS
        </span>
        <h2 className='text-3xl sm:text-4xl font-bold text-slate-900 mb-4'>
          What Our Learners Say
        </h2>
        <p className='text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed mb-12'>
          Hear from our learners as they share their journeys of transformation, success and how
          our platform has made a difference in their lives.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left'>
          {dummyTestimonial.map((testimonial, index) => (
            <div
              key={index}
              className='group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col'
            >
              {/* top accent line */}
              <div className='h-1 bg-gradient-to-r from-blue-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300' />

              <div className='p-6 flex flex-col flex-1'>
                {/* quote mark */}
                <span className='text-4xl font-serif text-blue-100 leading-none mb-1'>
                  “
                </span>

                <p className='text-sm text-slate-600 leading-relaxed flex-1 mb-5'>
                  {testimonial.feedback}
                </p>

                <div className='flex items-center gap-1 mb-4'>
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                      alt="star"
                      className='w-4 h-4'
                    />
                  ))}
                  <span className='text-xs text-slate-400 ml-1'>
                    {testimonial.rating.toFixed(1)}
                  </span>
                </div>

                <div className='flex items-center gap-3 pt-4 border-t border-slate-100'>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className='w-11 h-11 rounded-full object-cover ring-2 ring-blue-50'
                  />
                  <div>
                    <h3 className='text-sm font-semibold text-slate-900'>
                      {testimonial.name}
                    </h3>
                    <p className='text-xs text-slate-500'>{testimonial.role}</p>
                  </div>
                  <a href="#" className='text-blue-500 underline px-5'>Read more</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
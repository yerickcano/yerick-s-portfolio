import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('contact');
  
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">{t('title')}</h1>
        <p className="text-xl text-secondary max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-6">{t('contactInfo')}</h2>
          
          <div className="space-y-4">
            {/* Email */}
            <a 
              href="mailto:yerickcanogarcia@gmail.com"
              className="flex items-start p-4 glass-effect border border-theme rounded-lg hover:bg-primary hover:border-primary-hover transition-all duration-200 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mr-4 group-hover:bg-white group-hover:text-primary transition-all duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-primary group-hover:text-white transition-colors duration-200">{t('contactMethods.email.title')}</h3>
                <p className="text-secondary group-hover:text-white/90 transition-colors duration-200">yerickcanogarcia@gmail.com</p>
              </div>
              <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
            
            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/yerickcano"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start p-4 glass-effect border border-theme rounded-lg hover:bg-blue-600 hover:border-blue-700 transition-all duration-200 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mr-4 group-hover:bg-white group-hover:text-blue-600 transition-all duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-primary group-hover:text-white transition-colors duration-200">{t('contactMethods.linkedin.title')}</h3>
                <p className="text-secondary group-hover:text-white/90 transition-colors duration-200">{t('contactMethods.linkedin.description')}</p>
              </div>
              <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
            
            {/* GitHub */}
            <a 
              href="https://github.com/yerickcano"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start p-4 glass-effect border border-theme rounded-lg hover:bg-gray-800 hover:border-gray-700 transition-all duration-200 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-gray-800 text-white rounded-lg flex items-center justify-center mr-4 group-hover:bg-white group-hover:text-gray-800 transition-all duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-primary group-hover:text-white transition-colors duration-200">{t('contactMethods.github.title')}</h3>
                <p className="text-secondary group-hover:text-white/90 transition-colors duration-200">{t('contactMethods.github.description')}</p>
              </div>
              <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          </div>
        </div>
        {/* Availability & CV Section */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-6">{t('availabilitySection')}</h2>
          
          <div className="glass-effect border border-theme p-6 rounded-lg mb-6">
            <p className="text-secondary mb-4">
              {t('availability')}
            </p>
            <p className="text-secondary mb-6">
              {t('responseTime')}
            </p>
            
            {/* CV Download Button */}
            <a
              href="/cv/Yerick_Cano_CV.pdf"
              download="Yerick_Cano_CV.pdf"
              className="inline-flex items-center justify-center w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-hover transition-colors group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t('downloadCV')}
            </a>
          </div>
        </div>

        
      </div>
    </div>
  );
}
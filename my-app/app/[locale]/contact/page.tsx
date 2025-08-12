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
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-6">{t('sendMessage')}</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
                {t('form.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-theme rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-surface text-primary"
                placeholder={t('form.namePlaceholder')}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                {t('form.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-theme rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-surface text-primary"
                placeholder={t('form.emailPlaceholder')}
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-2">
                {t('form.subject')}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 border border-theme rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-surface text-primary"
                placeholder={t('form.subjectPlaceholder')}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">
                {t('form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-2 border border-theme rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-surface text-primary"
                placeholder={t('form.messagePlaceholder')}
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-hover transition-colors"
            >
              {t('form.sendButton')}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-6">{t('contactInfo')}</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-surface border border-theme rounded-lg flex items-center justify-center mr-4">
                <span className="text-xl">📧</span>
              </div>
              <div>
                <h3 className="font-medium text-primary">{t('social')}</h3>
                <p className="text-secondary">your@email.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-surface border border-theme rounded-lg flex items-center justify-center mr-4">
                <span className="text-xl">💼</span>
              </div>
              <div>
                <h3 className="font-medium text-primary">LinkedIn</h3>
                <a href="https://linkedin.com" className="text-primary hover:text-primary-hover transition-colors">
                  {t('social')}
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-surface border border-theme rounded-lg flex items-center justify-center mr-4">
                <span className="text-xl">🐙</span>
              </div>
              <div>
                <h3 className="font-medium text-primary">GitHub</h3>
                <a href="https://github.com" className="text-primary hover:text-primary-hover transition-colors">
                  {t('social')}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-surface border border-theme rounded-lg">
            <p className="text-secondary text-sm mb-2">
              {t('availability')}
            </p>
            <p className="text-secondary text-sm">
              {t('responseTime')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
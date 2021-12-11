import { appWithTranslation } from 'next-i18next'
import '../public/app.css'

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />

export default appWithTranslation(MyApp)
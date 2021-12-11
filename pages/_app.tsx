import { appWithTranslation } from 'next-i18next'
import '../public/app.scss'

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />

export default appWithTranslation(MyApp)
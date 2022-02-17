import '../styles/globals.css'
// import '../styles/normalize.css'
import Layout from '../components/layout/Layout'
function MyApp({ Component, pageProps }) {

  return (
    <Layout>
  <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp

import Head from 'next/head'
import Script from 'next/script'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Header, Footer} from "../components"

export default function App({ Component, pageProps }: AppProps) {
  
  return (
  <>
  <Head>
    <meta name="description" content="Generated by create next app" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/wriality.png" />
    <link href="https://fonts.googleapis.com/css?family=Playfair&#43;Display:700,900&amp;display=swap" rel="stylesheet"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossOrigin="anonymous"/>
  </Head>
  <Script id='google-tag-manager' strategy='afterInteractive'>
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NS2LHMH9');
      `} 
  </Script>
  <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossOrigin="anonymous"></Script>
  <header className='text-capitalize'>
    <Header />
  </header>
  <body>

    <Component {...pageProps} /> 
  </body>
  <noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NS2LHMH9" height="0" width="0" className="d-none invisible"></iframe>
</noscript>
  <footer className="py-3 my-4 container-xxl mb-0 pb-0">
    <Footer />
  </footer>
  </>
  )
}

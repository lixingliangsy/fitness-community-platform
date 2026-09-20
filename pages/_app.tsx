import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import ChatWidget from '../components/ChatWidget'
import { SUPPORT } from '../lib/support.config'

export default function App({ Component, pageProps }: AppProps) {
  return       <><Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FitCircle" />
        <meta property="og:description" content="AI-generated challenges, discussion prompts, and newsletters that keep your fitness community active, connected, and growing." />
        <meta property="og:url" content="https://fitness-community-platform.lxsaihub.com/" />
        <meta property="og:image" content="https://fitness-community-platform.lxsaihub.com/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FitCircle" />
        <meta name="twitter:description" content="AI-generated challenges, discussion prompts, and newsletters that keep your fitness community active, connected, and growing." />
        <meta name="twitter:image" content="https://fitness-community-platform.lxsaihub.com/og.png" />
                                        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"SoftwareApplication","name":"FitCircle","url":"https://fitness-community-platform.lxsaihub.com/","description":"AI-generated challenges, discussion prompts, and newsletters that keep your fitness community active, connected, and growing.","applicationCategory":"BusinessApplication","operatingSystem":"Web","offers":{"@type":"Offer","priceCurrency":"USD","price":"0","availability":"https://schema.org/OnlineOnly"}}' }} />
      </Head>
      <Component {...pageProps} />
      <ChatWidget productName={SUPPORT.productName} brandColor={SUPPORT.brandColor} sessionKeyPrefix={SUPPORT.productSlug} /></>
}

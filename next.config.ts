import createNextIntlPlugin from 'next-intl/plugin';

// Allow Node.js to make HTTPS requests when behind a corporate proxy/firewall
// that uses a private CA (SSL inspection). Safe — dev only.
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const withNextIntl = createNextIntlPlugin();

export default withNextIntl({});

# Cloudflare worker - Deploy fonts

Cloudflare worker that deploys fonts based on a URL/domain whitelist.

## Adding fonts

Put the woff2 font file(s) in the `fonts` directory and run the following command to upload them to the KV storage locally and remotely.

``` bash
npx wrangler kv key put --namespace-id=63ec8fa695834d428455630334a579c2 "font-name.woff2" --path=./fonts/font-name.woff2
npx wrangler kv key put --namespace-id=63ec8fa695834d428455630334a579c2 "font-name.woff2" --path=./fonts/font-name.woff2 --remote
```

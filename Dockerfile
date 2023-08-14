# Install dependencies only when needed
FROM 412729474065.dkr.ecr.us-east-1.amazonaws.com/developer-engineering/nodejs:16 AS deps

ARG EXAMPLE_GITLAB_PACKAGE_TOKEN
ENV NPM_TOKEN=$EXAMPLE_GITLAB_PACKAGE_TOKEN
ENV CI_JOB_TOKEN=$EXAMPLE_GITLAB_PACKAGE_TOKEN

RUN apt install tzdata openssl ca-certificates git
ENV TZ America/Sao_Paulo
ENV NPM_CONFIG_UNSAFE_PERM=true

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
COPY next.config.js next.config.js
COPY next-env.d.ts next-env.d.ts
COPY react-app-env.d.ts react-app-env.d.ts
COPY tsconfig.json tsconfig.json
COPY .npmrc .npmrc
COPY .git .git

COPY configs/sentry.client.config.js sentry.client.config.js
COPY configs/sentry.server.config.js sentry.server.config.js
COPY configs/server.js server.js
COPY configs/ssl.js ssl.js

RUN mkdir public
COPY public public

RUN mkdir src
COPY ./src ./src

COPY yarn.lock yarn.lock
COPY .npmrc .npmrc

RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM example.dkr.ecr.us-east-1.amazonaws.com/developer-engineering/nodejs:16 AS builder

ARG SENTRY_URL
ENV SENTRY_URL=$SENTRY_URL

ARG SENTRY_LOG_LEVEL
ENV SENTRY_LOG_LEVEL=$SENTRY_LOG_LEVEL

ARG SENTRY_ORG
ENV SENTRY_ORG=$SENTRY_ORG

ARG SENTRY_PROJECT
ENV SENTRY_PROJECT=$SENTRY_PROJECT

ARG SENTRY_AUTH_TOKEN
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN

ARG AWS_ACCESS_KEY_ID
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID

ARG AWS_SECRET_ACCESS_KEY
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY

ARG NEXT_PUBLIC_FIREBASE_API_KEY
ENV NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY

ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN

ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID

ARG NEXT_PUBLIC_FIREBASE_APP_ID
ENV NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID

ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET

ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID

ARG NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

ARG NEXT_PUBLIC_FIREBASE_ANALYTICS_ENABLED
ENV NEXT_PUBLIC_FIREBASE_ANALYTICS_ENABLED=$NEXT_PUBLIC_FIREBASE_ANALYTICS_ENABLED

ARG NEXT_PUBLIC_FACEBOOK_PIXEL_ID
ENV NEXT_PUBLIC_FACEBOOK_PIXEL_ID=$NEXT_PUBLIC_FACEBOOK_PIXEL_ID

ARG NEXT_PUBLIC_GOOGLE_TAG_ID
ENV NEXT_PUBLIC_GOOGLE_TAG_ID=$NEXT_PUBLIC_GOOGLE_TAG_ID

ARG NEXT_PUBLIC_APP_ENV
ENV NEXT_PUBLIC_APP_ENV=$NEXT_PUBLIC_APP_ENV

ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY

ARG NEXT_PUBLIC_ADOPT_ID
ENV NEXT_PUBLIC_ADOPT_ID=$NEXT_PUBLIC_ADOPT_ID

ARG NEXT_PUBLIC_FACEBOOK_DOMAIN_ID
ENV NEXT_PUBLIC_FACEBOOK_DOMAIN_ID=$NEXT_PUBLIC_FACEBOOK_DOMAIN_ID

ARG NEXT_PUBLIC_GTM_ID
ENV NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID

COPY --from=deps /app/node_modules ./node_modules
RUN yarn build


# Production image, copy all the files and run next
FROM node:16-alpine AS runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN mkdir -p /app && chown -R nextjs:nodejs /app

USER nextjs
WORKDIR /app

ARG ENV
ENV NODE_ENV=$ENV

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/. ./

EXPOSE 3000
ENV PORT 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node_modules/.bin/next", "start"]

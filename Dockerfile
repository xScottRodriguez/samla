FROM node:21-alpine3.19 AS deps

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node package.json ./

RUN pnpm install --frozen-lockfile

FROM node:21-alpine3.19 AS build

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY --chown=node:node --from=deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=deps /usr/src/app/package.json ./package.json
COPY --chown=node:node --from=deps /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY . .

RUN pnpm build

RUN pnpm prune --prod

# USER node

FROM node:21-alpine3.19 AS prod


WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/MOCK_DATA.json ./MOCK_DATA.json

ENV NODE_ENV=production



EXPOSE 3000

CMD ["node", "dist/main.js"]
FROM node:24-alpine

WORKDIR /usr/src/app

COPY package.json ./

# enable pnpm through corepack and install dependencies
RUN corepack enable \
	&& corepack prepare pnpm@8 --activate \
	&& pnpm install

COPY . .

EXPOSE 3000
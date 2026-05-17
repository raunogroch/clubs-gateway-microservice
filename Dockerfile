FROM node:24-alpine

WORKDIR /usr/src/app

# Enable pnpm through corepack
RUN corepack enable && corepack prepare pnpm@9 --activate

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with frozen lockfile for reproducibility
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]
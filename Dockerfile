FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile --ignore-scripts

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build

FROM build AS ddd
COPY --from=prod-deps /app/packages/libs/ddd/node_modules/ /app/packages/libs/ddd/node_modules
COPY --from=build /app/packages/libs/ddd/dist /app/packages/libs/ddd/dist

FROM ddd as uploader
COPY --from=prod-deps /app/packages/uploader/node_modules/ /app/packages/uploader/node_modules
COPY --from=build /app/packages/uploader/dist /app/packages/uploader/dist
WORKDIR /app/packages/uploader
EXPOSE 3000
CMD [ "pnpm", "start" ]

FROM ddd as processor
COPY --from=prod-deps /app/packages/processor/node_modules/ /app/packages/processor/node_modules
COPY --from=build /app/packages/processor/dist /app/packages/processor/dist
WORKDIR /app/packages/processor
EXPOSE 3001
CMD [ "pnpm", "start" ]

FROM build AS frontend
COPY --from=prod-deps /app/packages/frontend/node_modules/ /app/packages/frontend/node_modules
COPY --from=build /app/packages/frontend/dist /app/packages/frontend/dist
WORKDIR /app/packages/frontend/dist
EXPOSE 80
CMD [ "ng", "serve", "--host", "0.0.0.0" ]

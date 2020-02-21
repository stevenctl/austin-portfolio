#!/usr/bin/env bash

# build
IMAGE_VERSION=1.0.1-production
TAG="austin-portfolio-api:${IMAGE_VERSION}"
docker build -t $TAG .

# release
REPOSITORY="austins-portfolio-265706"
REGISTRY="us.gcr.io"
REMOTE_TAG="$REGISTRY/$REPOSITORY/$TAG"
docker tag $TAG $REMOTE_TAG
docker push $REMOTE_TAG
